<template>
  <v-layout class="kasko page" column>
    <h1 class="title_">{{ title }}</h1>

    <Step :cur="1" />

    <section>
      <v-container>
        <v-row justify="center">
          <v-col md="6" sm="7" cols="12">
            <v-form class="kasko-block" @submit.prevent="submit">
              <v-select
                v-model="choosed.brand"
                :items="brands"
                item-text="description[name]"
                return-object
                :label="brand"
                @change="changeBrand"
              />

              <v-select
                v-if="choosed.brand"
                v-model="choosed.model"
                :items="models"
                :label="model"
                return-object
                item-text="title"
                @change="changeModel"
              />

              <v-select v-if="choosed.model" v-model="choosed.date" :items="years" :label="date" />

              <v-text-field
                v-if="choosed.date"
                v-model="choosed.sum"
                type="tel"
                v-mask="mask"
                :label="sum"
                @input="setSum"
                required
                :error-messages="sumErrors"
                @blur="$v.choosed.sum.$touch()"
              />

              <div class="terms" v-if="choosed.date">
                <v-checkbox
                  v-model="terms.val"
                  :error-messages="checkboxErrors"
                  required
                  @change="$v.terms.val.$touch()"
                  @blur="$v.terms.val.$touch()"
                >
                  <template v-slot:label>
                    <div v-html="terms.text"></div>
                  </template>
                </v-checkbox>

                <v-btn color="primary" block type="submit">{{ checkout }}</v-btn>
              </div>
            </v-form>
          </v-col>

          <v-col md="4" sm="5" cols="12">
            <div class="kasko-block">
              <img :src="car" alt />

              <div v-if="choosed.date" class="kasko-slider">
                <v-slider readonly inverse-label hide-details dense v-model="slider" />
                <div class="d-flex justify-space-between overline">
                  <span>мин {{ sumView(price.min) }}</span>
                  <span>макс {{ sumView(price.max) }}</span>
                </div>
              </div>

              <div class="kasko__calc__info">
                <div class="text-center">
                  <strong>{{ insurance.cost }}</strong>
                  {{ sumView(price.max) }} сум
                </div>
                <div class="text-center">
                  <strong>{{ insurance.sum }}</strong>
                  {{ choosed.sum }} сум
                </div>
              </div>

              <div class="kasko__calc-sum">
                <strong>{{ insurance.title }}</strong>
                <strong>{{ polis }}</strong>
              </div>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </section>
  </v-layout>
</template>

<script>
import { validationMixin } from "vuelidate";
import { required } from "vuelidate/lib/validators";
import { mask } from "vue-the-mask";
import { mapGetters } from "vuex";

import Step from "~/components/Step";

export default {
  components: { Step },
  directives: { mask },
  async asyncData({ store, $axios, route }) {
    let lang = "ru";
    store.getters["locales"].map((i) => {
      if (route.path.includes(i)) {
        lang = i;
      }
    });

    let kasko = await $axios.$get(`pages/kasko?lang=${lang}`);
    return { ...kasko };
  },
  data() {
    return {
      models: null,
      dates: null,
      price: {
        min: null,
        max: null,
      },
      car: "/img/chevrolet/default_car.png",
      choosed: {
        brand: null,
        model: null,
        date: null,
        sum: null,
      },
      years: [
        "2004",
        "2005",
        "2006",
        "2007",
        "2008",
        "2009",
        "2010",
        "2011",
        "2012",
        "2013",
        "2014",
        "2015",
        "2016",
        "2017",
        "2018",
        "2019",
        "2020",
      ].reverse(),
      errorCalc: null,
    };
  },
  mixins: [validationMixin],
  validations: {
    choosed: {
      sum: { required },
    },
    terms: {
      val: {
        checked(val) {
          return val;
        },
      },
    },
  },
  computed: {
    insurancePrice() {
      if (!this.price.max) {
        return "0.00";
      }
      return this.sumView(this.price.max);
    },
    sumErrors() {
      const errors = [];
      if (!this.$v.choosed.sum.$dirty) {
        return errors;
      }
      if (this.choosed.sum) {
        let sum = this.choosed.sum.split(" ").join("");
        if (sum > this.price.max) {
          errors.push(`Сумма не должне привышать ${this.price.max}`);
        } else if (sum < this.price.min) {
          errors.push(`Сумма не должне быть ниже ${this.price.min}`);
        }
      }
      !this.$v.choosed.sum.required && errors.push("");
      return errors;
    },
    slider() {
      if (!this.choosed.sum) {
        return 0;
      }
      let sum = this.price.max - this.price.min;
      let cur =
        this.price.max - this.choosed.sum.toString().split(" ").join("");
      let res = 100 - parseInt((cur / sum) * 100);
      if (res > 0 && res < 100) {
        return res;
      } else {
        return 0;
      }
    },
    mask() {
      if (!this.choosed.sum) {
        return false;
      }
      let len = this.choosed.sum.toString().length;
      switch (len) {
        case 5:
          return "X XXX";
          break;
        case 6:
          return "XX XXX";
          break;
        case 7:
          return "XXX XXX";
          break;
        case 9:
          return "X XXX XXX";
          break;
        case 10:
          return "XX XXX XXX";
          break;
        default:
          return "XXX XXX XXX";
          break;
      }
    },
    polis() {
      if (!this.choosed.sum) {
        return "0.00";
      }
      let sum = this.choosed.sum.split(" ").join("") * 0.01;
      return this.sumView(sum) + "сум";
    },
    checkboxErrors() {
      const errors = [];
      if (!this.$v.terms.val.$dirty) {
        return errors;
      }
      !this.$v.terms.val.checked && errors.push("");
      return errors;
    },
  },
  methods: {
    changeBrand() {
      this.choosed.model = this.choosed.date = this.choosed.sum = this.price.max = null;
      this.car = "/img/chevrolet/default_car.png";
      this.$axios
        .$get(`models?brand_id=${this.choosed.brand.id}`)
        .then((res) => {
          this.models = res;
        });
    },

    changeModel() {
      this.choosed.date = this.choosed.sum = null;
      this.$axios
        .$get(`models/view?id=${this.choosed.model.id}`)
        .then((res) => {
          this.car = res.img;
          this.price.min = res.min;
          this.price.max = res.max;
        });
    },

    sumView(sum) {
      if (!sum) {
        return "0.00";
      }
      let price = sum
        .toString()
        .split("")
        .reverse()
        .map((item, index) => {
          if (index % 3 == 0) {
            return (item += " ");
          }
          return item;
        });
      return price.reverse().join("");
    },

    setSum() {
      this.choosed.sum = this.choosed.sum.replace(/[A-Za-z!@#$%^&*()]/g, "");
    },

    submit() {
      if (this.$v.$invalid) {
        this.$v.$touch();
        return false;
      }
      let sum = this.choosed.sum.split(" ").join("");
      if (sum > this.price.max || sum < this.price.min) {
        return false;
      }

      let choosed = this.choosed;
      let data = {
        brand: choosed.brand.description.name,
        model: choosed.model.title,
        date: choosed.date,
        price: choosed.sum,
      };
      data.polis = choosed.sum.split(" ").join("") * 0.01;
      this.$store.commit("setDocument", data);
      let user = this.$store.getters["user"];
      let locale = this.$i18n.locale !== "ru" ? this.$i18n.locale + "/" : "";
      if (!user) {
        let kasko = {
          name: "kasko",
          link: `/${locale}auto/kasko/doc`,
        };
        this.$store.commit("calc", kasko);
        this.$router.push(`/${locale}auth/login`);
      } else {
        this.$router.push(`/${locale}auto/kasko/doc`);
      }
    },
  },
  head() {
    return {
      title: this.title,
    };
  },
};
</script>
