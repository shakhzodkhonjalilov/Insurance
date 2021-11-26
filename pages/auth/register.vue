<template>
  <v-layout class="page bg-grey register">
    <v-container>
      <h1 class="title_">{{ title }}</h1>
      <div class="cabinet__alert text-center" v-if="calc">{{ calc }}</div>
      <v-row justify="center">
        <v-col sm="8" md="6" lg="4">
          <v-alert v-if="errorLogin" dense type="error">{{ errorLogin }}</v-alert>
          <v-form class="form" @submit.prevent="submit">
            <v-text-field
              v-model="name"
              :error-messages="nameErrors"
              :label="nameLabel"
              required
              @input="$v.name.$touch()"
              @blur="$v.name.$touch()"
            />

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
              v-model.trim="$v.password.$model"
              :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
              :type="show1 ? 'text' : 'password'"
              :error-messages="passwordErrors"
              :label="passwordLabel"
              required
              @click:append="show1 = !show1"
              @input="$v.password.$touch()"
              @blur="$v.password.$touch()"
            />

            <v-text-field
              v-model.trim="$v.repeatPassword.$model"
              :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
              :type="show1 ? 'text' : 'password'"
              :error-messages="repeatPasswordErrors"
              :label="repeatPasswordLabel"
              required
              @click:append="show1 = !show1"
              @input="$v.repeatPassword.$touch()"
              @blur="$v.repeatPassword.$touch()"
            />

            <div class="terms">
              <v-checkbox
                v-model="terms.val"
                :error-messages="checkboxErrors"
                required
                @change="$v.terms.val.$touch()"
                @blur="$v.terms.val.$touch()"
              >
                <template v-slot:label>
                  <!-- <div v-html="terms.text"></div> -->
                  Я ознакомлен и принимаю
                </template>
              </v-checkbox>
            </div>

            <div class="text-center my-5">
              <v-btn rounded color="success" type="submit">{{ btns.reg }}</v-btn>
            </div>

            <div class="text-center">
              <nuxt-link :to="localePath('/auth/login')">{{ btns.login }}</nuxt-link>
            </div>
          </v-form>
        </v-col>
      </v-row>
    </v-container>
  </v-layout>
</template>

<script>
import { validationMixin } from "vuelidate";
import { required, sameAs, minLength } from "vuelidate/lib/validators";
import { mask } from "vue-the-mask";

export default {
  mixins: [validationMixin],
  directives: { mask },
  validations: {
    name: { required },
    password: {
      required,
      minLength: minLength(6),
    },
    repeatPassword: {
      sameAsPassword: sameAs("password"),
    },
    number: {
      required,
      minLength: minLength(12),
    },
    terms: {
      val: {
        checked(val) {
          return val;
        },
      },
    },
  },

  async asyncData({ store, $axios, route }) {
    let lang = "ru";
    store.getters["locales"].map((i) => {
      if (route.path.includes(i)) {
        lang = i;
      }
    });

    let auth = await $axios.$get(`pages/register?lang=${lang}`);
    return { ...auth };
  },

  data: () => ({
    number: "",
    password: "",
    repeatPassword: "",
    name: "",
    show1: false,
    checkbox: false,
    errorLogin: null,
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
        return "Зарегестрируйтесь что бы продолжить оплату";
      }
    },
    checkboxErrors() {
      const errors = [];
      if (!this.$v.terms.val.$dirty) {
        return errors;
      }
      !this.$v.terms.val.checked && errors.push("");
      return errors;
    },
    numberErrors() {
      const errors = [];
      if (!this.$v.number.$dirty) {
        return errors;
      }
      !this.$v.number.minLength && errors.push("");
      !this.$v.number.required && errors.push("");
      return errors;
    },
    nameErrors() {
      const errors = [];
      if (!this.$v.name.$dirty) {
        return errors;
      }
      !this.$v.name.required && errors.push("");
      return errors;
    },
    passwordErrors() {
      const errors = [];
      if (!this.$v.password.$dirty) {
        return errors;
      }
      !this.$v.password.minLength && errors.push("");
      !this.$v.password.required && errors.push("");
      return errors;
    },
    repeatPasswordErrors() {
      const errors = [];
      if (!this.$v.repeatPassword.$dirty) {
        return errors;
      }
      !this.$v.repeatPassword.sameAsPassword && errors.push("");
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
      let user = {
        username: "998" + this.number.split(" ").join(""),
        password: this.password,
        name: this.name,
      };
      let calc = this.$store.getters["calc"];

      this.$store
        .dispatch("register", user)
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
