<template>
  <section class="page osgo">
    <h1 class="title_">{{ title }}</h1>

    <Step :cur="2" />

    <v-container>
      <v-form class="form document" @submit.prevent="submit">
        <v-row>
          <v-col cols="12" sm="6">
            <v-text-field
              v-model="address"
              :error-messages="addressErrors"
              :label="addressLabel"
              required
              @input="$v.address.$touch()"
              @blur="$v.address.$touch()"
            />
          </v-col>

          <v-col cols="12" sm="6">
            <v-text-field
              class="text_uppercase"
              v-model="carNumber"
              :error-messages="carNumberErrors"
              :label="numberLabel"
              required
              @input="$v.carNumber.$touch()"
              @blur="$v.carNumber.$touch()"
            />
          </v-col>

          <v-col cols="12" sm="6">
            <label>
              <strong>{{ passportLabel }}</strong>
              <div class="document__passport">
                <v-text-field
                  v-model="passportSerial"
                  :error-messages="passportSerialErrors"
                  placeholder="XX"
                  v-mask="'XX'"
                  required
                  class="register__number-code"
                  @input="$v.passportSerial.$touch()"
                  @blur="$v.passportSerial.$touch()"
                />
                <v-text-field
                  v-model="passportNumber"
                  placeholder="1234567"
                  v-mask="'XXXXXXX'"
                  :error-messages="passportNumberErrors"
                  required
                  @input="$v.passportNumber.$touch()"
                  @blur="$v.passportNumber.$touch()"
                />
              </div>
            </label>
          </v-col>

          <v-col cols="12" sm="6">
            <label>
              <strong>{{ texPassport }}</strong>
              <div class="document__passport">
                <v-text-field
                  v-model="carPassportSerial"
                  :error-messages="carPassportSerialErrors"
                  placeholder="XXX"
                  v-mask="'XXX'"
                  required
                  class="register__number-code"
                  @input="$v.carPassportSerial.$touch()"
                  @blur="$v.carPassportSerial.$touch()"
                />
                <v-text-field
                  v-model="carPassportNumber"
                  placeholder="1234567"
                  v-mask="'XXXXXXX'"
                  :error-messages="carPassportNumberErrors"
                  required
                  @input="$v.carPassportNumber.$touch()"
                  @blur="$v.carPassportNumber.$touch()"
                />
              </div>
            </label>
          </v-col>

          <v-btn block type="submit" color="primary">{{ checkout }}</v-btn>
        </v-row>
      </v-form>
    </v-container>
  </section>
</template>

<script>
import { validationMixin } from "vuelidate";
import { required } from "vuelidate/lib/validators";
import { mask } from "vue-the-mask";

import Step from "~/components/Step";

export default {
  components: { Step },
  middleware: ["document"],
  mixins: [validationMixin],
  validations: {
    address: { required },
    passportSerial: { required },
    passportNumber: { required },
    carNumber: { required },
    carPassportSerial: { required },
    carPassportNumber: { required },
  },
  directives: {
    mask,
  },
  async asyncData({ store, $axios, route }) {
    let lang = "ru";
    store.getters["locales"].map((i) => {
      if (route.path.includes(i)) {
        lang = i;
      }
    });

    let osgo = await $axios.$get(`pages/doc?lang=${lang}&type=osgo`);
    return { ...osgo };
  },
  data: () => ({
    address: null,
    passportSerial: null,
    passportNumber: null,
    carNumber: null,
    carPassportSerial: null,
    carPassportNumber: null,
  }),
  computed: {
    config() {
      const token = this.$store.getters["user"].access_token;
      return {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
    },
    val() {
      return this.$store.getters["document"];
    },
    addressErrors() {
      const errors = [];
      if (!this.$v.address.$dirty) {
        return errors;
      }
      !this.$v.address.required && errors.push("");
      return errors;
    },
    passportSerialErrors() {
      const errors = [];
      if (!this.$v.passportSerial.$dirty) {
        return errors;
      }
      !this.$v.passportSerial.required && errors.push("");
      return errors;
    },
    passportNumberErrors() {
      const errors = [];
      if (!this.$v.passportNumber.$dirty) {
        return errors;
      }
      !this.$v.passportNumber.required && errors.push("");
      return errors;
    },
    carNumberErrors() {
      const errors = [];
      if (!this.$v.carNumber.$dirty) {
        return errors;
      }
      !this.$v.carNumber.required && errors.push("");
      return errors;
    },
    carPassportSerialErrors() {
      const errors = [];
      if (!this.$v.carPassportSerial.$dirty) {
        return errors;
      }
      !this.$v.carPassportSerial.required && errors.push("");
      return errors;
    },
    carPassportNumberErrors() {
      const errors = [];
      if (!this.$v.carPassportNumber.$dirty) {
        return errors;
      }
      !this.$v.carPassportNumber.required && errors.push("");
      return errors;
    },
  },
  methods: {
    async submit() {
      if (this.$v.$invalid) {
        this.$v.$touch();
        return false;
      }

      let data = {
        information: {
          address: this.address,
          carNumber: this.carNumber,
          passport: this.passportSerial + this.passportNumber,
          carPassport: this.carPassportSerial + this.carPassportNumber,
        },
        desc: { ...this.val },
      };
      await this.$axios({
        method: "POST",
        url: `doc/insert?type=osgo`,
        data,
        headers: { ...this.config.headers },
      }).then((res) => {
        if (res.data.sucess) {
          this.$store.commit("setPayment", res.data.amount);
          this.$store.commit("setOrder", res.data.order_id);
          this.$store.commit("setDocId", res.data.doc_id);
          this.$router.push("/pay");
        }
      });
    },
  },
  head() {
    return {
      title: this.title,
    };
  },
};
</script>
