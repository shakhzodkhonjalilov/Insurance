<template>
  <v-layout class="travel__calc page" column>
    <h1 class="title_">{{ title }}</h1>

    <Step :cur="1" />

    <section class="travelUz">
      <v-container>
        <v-row justify="center">
          <v-col md="6" sm="7" cols="12">
            <form class="travel__uz travel-block" @submit.prevent="submit">
              <div>
                <strong>{{ country.label }}</strong>
                <v-text-field :value="country.val" disabled filled />
              </div>

              <div>
                <strong>{{ status.label }}</strong>
                <v-radio-group v-model="choosed.status" @change="stat">
                  <v-radio
                    v-for="item in status.list"
                    :key="item.title"
                    :label="item.title"
                    :value="item.val"
                  />
                </v-radio-group>
              </div>

              <div v-if="choosed.status" class="travel__uz-program">
                <strong>{{ prog.label }}</strong>
                <v-radio-group v-model="choosed.programm">
                  <v-label v-for="item in programm" :key="item.title">
                    <v-radio :value="item.title" />
                    <span>{{ item.title }}</span>
                    <div>{{ item.desc }}</div>
                  </v-label>
                </v-radio-group>
              </div>

              <div v-if="choosed.programm" class="travel__uz-date">
                <v-menu
                  :close-on-content-click="true"
                  :nudge-right="40"
                  transition="scale-transition"
                  offset-y
                  min-width="290px"
                >
                  <template v-slot:activator="{ on }">
                    <v-text-field
                      v-model="choosed.startIns"
                      class="travel__calc-date-block"
                      :label="period.start"
                      readonly
                      v-on="on"
                    />
                  </template>
                  <v-date-picker v-model="choosed.startIns" :min="date" :max="choosed.endIns" />
                </v-menu>

                <v-menu
                  :close-on-content-click="true"
                  :nudge-right="40"
                  transition="scale-transition"
                  offset-y
                  min-width="290px"
                >
                  <template v-slot:activator="{ on }">
                    <v-text-field
                      v-model="choosed.endIns"
                      class="travel__calc-date-block"
                      :label="period.end"
                      readonly
                      v-on="on"
                    />
                  </template>
                  <v-date-picker v-model="choosed.endIns" :min="choosed.startIns || date" />
                </v-menu>

                <v-text-field
                  v-model="choosed.intervalDate"
                  class="travel__calc-date-interval"
                  outlined
                  disabled
                />
              </div>

              <div class="terms" v-if="choosed.intervalDate && choosed.programm">
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
            </form>
          </v-col>

          <v-col md="4" sm="5" cols="12">
            <div class="price">
              <div class="price-title">{{ price.title }}</div>
              <div class="price-sum">{{ price.sum }} {{ sum }}</div>
              <div class="price-dollar">{{ price.dollar }} $</div>
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
import Step from "~/components/Step";

export default {
  components: { Step },
  mixins: [validationMixin],
  validations: {
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
    store.getters.locales.map((i) => {
      if (route.path.includes(i)) {
        lang = i;
      }
    });

    const travelUz = await $axios.$get(`pages/travel-uz?lang=${lang}`);
    return { ...travelUz };
  },
  data() {
    return {
      date: new Date().toISOString().substr(0, 10),
      programm: null,
      choosed: {
        startIns: null,
        endIns: null,
        status: null,
        programm: null,
        intervalDate: 0,
      },
      errorCalc: null,
    };
  },
  computed: {
    sum() {
      let lang = "ru";
      this.$store.getters.locales.map((i) => {
        if (this.$route.path.includes(i)) {
          lang = i;
        }
      });
      switch (lang) {
        case "ru":
          return "сум";
          break;
        case "uz":
          return "so'm";
          break;
        case "en":
          return "sum";
          break;
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
  },
  watch: {
    choosed: {
      handler(newVal) {
        if (newVal.startIns && newVal.endIns) {
          this.sumInterval();
        }

        let res = 0;
        if (newVal.programm == "STANDART" && newVal.status == "res") {
          res = newVal.intervalDate * 3000;
        } else if (newVal.programm == "CLASSIC" && newVal.status == "foreign") {
          res = newVal.intervalDate * 4000;
        } else if (newVal.programm == "PREMIUM" && newVal.status == "foreign") {
          res = newVal.intervalDate * 10000;
        }
        this.price.sum = res;
        this.price.dollar = (res / 9700).toFixed(2);
      },
      deep: true,
    },
  },
  mounted() {
    this.price.sum = "0.00";
    this.price.dollar = "0.00";
  },
  methods: {
    stat() {
      if (this.choosed.status === "res") {
        this.programm = this.prog.list[0];
      } else {
        this.programm = this.prog.list[1];
      }
      this.choosed.programm = null;
    },
    sumInterval() {
      const start = new Date(this.choosed.startIns).getTime();
      const end = new Date(this.choosed.endIns).getTime();
      this.choosed.intervalDate = (end - start) / (1000 * 3600 * 24);
    },
    submit() {
      if (this.$v.$invalid) {
        this.$v.$touch();
        return false;
      }
      const data = { ...this.choosed };
      data.polis = this.price.sum;
      this.$store.commit("setDocument", data);

      const user = this.$store.getters.user;
      const locale = this.$i18n.locale !== "ru" ? this.$i18n.locale + "/" : "";
      if (!user) {
        const calc2 = {
          name: "calc2",
          link: `/${locale}travel/calc2/doc`,
        };
        this.$store.commit("calc", calc2);
        this.$router.push(`/${locale}auth/login`);
      } else {
        this.$router.push(`/${locale}travel/calc2/doc`);
      }
    },
  },
  head() {
    return {
      title: this.headerTitle,
    };
  },
};
</script>
