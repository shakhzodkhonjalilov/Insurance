<template>
  <v-layout class="page bg-grey login">
    <v-container>
      <h1 class="title_">{{ title }}</h1>
      <div class="cabinet__alert text-center" v-if="calc">{{ calc }}</div>
      <v-row justify="center">
        <v-col sm="8" md="6" lg="4">
          <v-alert v-if="errorLogin" dense type="error">{{ errorLogin }}</v-alert>
          <v-form @submit.prevent="submit" class="form">
            <label>
              <strong>{{ numberLabel }}</strong>
              <div class="register__number">
                <v-text-field value="+998" disabled class="register__number-code" />
                <v-text-field
                  v-model="number"
                  :error-messages="numberErrors"
                  placeholder="9X XXX XX XX"
                  type="tel"
                  v-mask="'XX XXX XX XX'"
                  required
                  @keyup="setNumber"
                  @input="$v.number.$touch()"
                  @blur="$v.number.$touch()"
                />
              </div>
            </label>

            <v-text-field
              v-model="password"
              :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
              :type="show1 ? 'text' : 'password'"
              :error-messages="passwordErrors"
              :label="passwordLabel"
              required
              @click:append="show1 = !show1"
              @input="$v.password.$touch()"
              @blur="$v.password.$touch()"
            />

            <div class="text-center mb-5">
              <v-btn rounded color="success" type="submit">{{ btns.login }}</v-btn>
            </div>
            <div class="text-center">
              <nuxt-link :to="localePath('/auth/register')">{{ btns.reg }}</nuxt-link>
            </div>
          </v-form>
        </v-col>
      </v-row>
    </v-container>
  </v-layout>
</template>

<script>
import { validationMixin } from "vuelidate";
import { required } from "vuelidate/lib/validators";
import { mask } from "vue-the-mask";

export default {
  mixins: [validationMixin],
  directives: { mask },
  validations: {
    number: { required },
    password: { required },
  },

  async asyncData({ store, $axios, route }) {
    let lang = "ru";
    store.getters["locales"].map((i) => {
      if (route.path.includes(i)) {
        lang = i;
      }
    });
    let auth = await $axios.$get(`pages/auth?lang=${lang}`);
    return { ...auth };
  },

  data: () => ({
    number: null,
    password: null,
    errorLogin: null,
    show1: false,
  }),

  mounted() {
    let user = localStorage.getItem("user");
    if (user) {
      this.$router.push("/cabinet");
    }
  },

  computed: {
    calc() {
      let calc = this.$store.getters["calc"];
      if (calc) {
        return "Авторизуйтесь что бы продолжить оплату";
      }
    },
    numberErrors() {
      const errors = [];
      if (!this.$v.number.$dirty) {
        return errors;
      }
      !this.$v.number.required && errors.push("");
      return errors;
    },
    passwordErrors() {
      const errors = [];
      if (!this.$v.password.$dirty) {
        return errors;
      }
      !this.$v.password.required && errors.push("");
      return errors;
    },
  },

  methods: {
    setNumber() {
      this.number = this.number.replace(/[A-Za-z!@#$%^&*()]/g, "");
    },

    submit() {
      if (this.$v.$invalid) {
        this.$v.$touch();
        return false;
      }
      let number = "998" + this.number.split(" ").join("");
      let user = {
        username: number,
        password: this.password,
      };
      let calc = this.$store.getters["calc"];

      this.$store
        .dispatch("login", user)
        .then((res) => {
          res.date = Date.now();
          const user = JSON.stringify(res);
          localStorage.setItem("user", user);

          if (calc) {
            this.$router.push(calc.link);
            return false;
          }
          this.$router.push("/cabinet");
        })
        .catch((e) => {
          this.errorLogin = this.errorAuth;
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
