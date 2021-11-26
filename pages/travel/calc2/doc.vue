<template>
  <section class="page travel__calc">
    <h1 class="title_">{{ title }}</h1>

    <Step :cur="2" />

    <v-container>
      <v-form class="form document" @submit.prevent="submit">
        <v-row>
          <v-col cols="12" sm="6">
            <v-menu
              ref="menu"
              v-model="menu"
              :close-on-content-click="false"
              transition="scale-transition"
              min-width="290px"
            >
              <template v-slot:activator="{ on }">
                <v-text-field
                  v-model="date"
                  :label="dateLabel"
                  readonly
                  :error-messages="dateErrors"
                  dense
                  required
                  v-on="on"
                  @input="$v.date.$touch()"
                  @blur="$v.date.$touch()"
                />
              </template>
              <v-date-picker
                ref="picker"
                v-model="date"
                locale="ru"
                :max="new Date().toISOString().substr(0, 10)"
                min="1950-01-01"
                @change="save"
              />
            </v-menu>
          </v-col>

          <v-col cols="12" sm="6">
            <v-autocomplete
              v-model="country"
              :items="countries"
              :label="countryLabel"
              dense
              required
              :error-messages="countryErrors"
              @input="$v.country.$touch()"
              @blur="$v.country.$touch()"
            />
          </v-col>

          <v-col cols="12" sm="12">
            <v-text-field
              v-model="address"
              :error-messages="addressErrors"
              :label="addressLabel"
              required
              dense
              @input="$v.address.$touch()"
              @blur="$v.address.$touch()"
            />
          </v-col>

          <v-btn block color="primary" type="submit">{{ checkout }}</v-btn>
        </v-row>
      </v-form>
    </v-container>
  </section>
</template>

<script>
import { validationMixin } from "vuelidate";
import { required } from "vuelidate/lib/validators";

import Step from "~/components/Step";
import countries from "~/api/countries";

export default {
  components: { Step },
  middleware: ["document"],
  mixins: [validationMixin],
  validations: {
    address: { required },
    date: { required },
    country: { required },
  },
  async asyncData({ store, $axios, route }) {
    let lang = "ru";
    store.getters.locales.map((i) => {
      if (route.path.includes(i)) {
        lang = i;
      }
    });

    const travelUz = await $axios.$get(`pages/doc?lang=${lang}&type=calc`);
    return { ...travelUz };
  },
  data: () => ({
    countries: countries,
    country: null,
    address: null,
    date: null,
    menu: false,
  }),
  computed: {
    config() {
      const token = this.$store.getters.user.access_token;
      return {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
    },
    val() {
      return this.$store.getters.document;
    },
    addressErrors() {
      const errors = [];
      if (!this.$v.address.$dirty) {
        return errors;
      }
      !this.$v.address.required && errors.push("");
      return errors;
    },
    dateErrors() {
      const errors = [];
      if (!this.$v.date.$dirty) {
        return errors;
      }
      !this.$v.date.required && errors.push("");
      return errors;
    },
    countryErrors() {
      const errors = [];
      if (!this.$v.country.$dirty) {
        return errors;
      }
      !this.$v.country.required && errors.push("");
      return errors;
    },
  },
  watch: {
    menu(val) {
      val && setTimeout(() => (this.$refs.picker.activePicker = "YEAR"));
    },
  },
  methods: {
    save(date) {
      this.$refs.menu.save(date);
    },

    async submit() {
      if (this.$v.$invalid) {
        this.$v.$touch();
        return false;
      }
      // const user = this.$store.getters.user
      const data = {
        information: {
          country: this.country,
          address: this.address,
          dateBirth: this.date,
        },
        desc: { ...this.val },
      };
      await this.$axios({
        method: "POST",
        url: "doc/insert?type=travelUz",
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
