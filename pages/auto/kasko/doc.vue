<template>
  <section class="page kasko">
    <h1 class="title_">{{ title }}</h1>

    <Step :cur="2" />

    <v-container>
      <v-form class="form document" @submit.prevent="submit">
        <v-row>
          <v-col cols="12" sm="6">
            <v-text-field
              class="text_uppercase"
              v-model="number"
              :error-messages="numberErrors"
              :label="numberLabel"
              required
              @input="$v.number.$touch()"
              @blur="$v.number.$touch()"
            />
          </v-col>

          <v-col cols="12" sm="6">
            <v-menu
              v-model="menu"
              :close-on-content-click="false"
              :nudge-right="40"
              transition="scale-transition"
              offset-y
              min-width="290px"
            >
              <template v-slot:activator="{ on }">
                <v-text-field v-model="date" :label="dateLabel" readonly v-on="on" />
              </template>
              <v-date-picker v-model="date" @input="menu = false" />
            </v-menu>
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

export default {
  components: { Step },
  middleware: ["document"],
  mixins: [validationMixin],
  validations: {
    number: { required },
  },
  async asyncData({ store, $axios, route }) {
    let lang = "ru";
    store.getters["locales"].map((i) => {
      if (route.path.includes(i)) {
        lang = i;
      }
    });

    let travelUz = await $axios.$get(`pages/doc?lang=${lang}&type=kasko`);
    return { ...travelUz };
  },
  data() {
    return {
      number: null,
      date: new Date().toISOString().substr(0, 10),
      menu: false,
    };
  },
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
    numberErrors() {
      const errors = [];
      if (!this.$v.number.$dirty) {
        return errors;
      }
      !this.$v.number.required && errors.push("");
      return errors;
    },
  },
  methods: {
    async submit() {
      if (this.$v.$invalid) {
        this.$v.$touch();
        return false;
      }

      let user = this.$store.getters["user"];
      let data = {
        information: {
          carNumber: this.number,
          date: this.date,
        },
        desc: { ...this.val },
      };
      await this.$axios({
        method: "POST",
        url: `doc/insert?type=kasko`,
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
