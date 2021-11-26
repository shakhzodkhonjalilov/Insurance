<template>
  <v-layout class="osgo page" column>
    <h1 class="title_">{{ title }}</h1>

    <Step :cur="1" />

    <section>
      <v-container>
        <v-row justify="center">
          <v-col sm="7" md="6" cols="12">
            <v-form class="osgo-form" @submit.prevent="submit">
              <v-select
                v-model="choosed.type"
                :items="types.list"
                item-text="title"
                item-value="sum"
                :label="types.label"
                return-object
                outlined
              />

              <div v-if="choosed.type.sum">
                <div>{{ vehicle.label }}</div>
                <v-radio-group v-model="choosed.vehicle">
                  <v-radio
                    v-for="item in vehicle.list"
                    :key="item.sum"
                    :label="item.title"
                    :value="item"
                  />
                </v-radio-group>
              </div>

              <div v-if="choosed.vehicle.sum == '1'">
                <div>{{ region.label }}</div>
                <v-radio-group v-model="choosed.region">
                  <v-radio
                    v-for="item in region.list"
                    :key="item.title"
                    :label="item.title"
                    :value="item"
                  />
                </v-radio-group>
              </div>

              <div v-if="choosed.vehicle.sum">
                <div>{{ period.label }}</div>
                <v-radio-group v-model="choosed.period">
                  <v-radio
                    v-for="item in period.list"
                    :key="item.sum"
                    :label="item.title"
                    :value="item"
                  />
                </v-radio-group>
              </div>

              <div v-if="choosed.period.sum && choosed.region.sum">
                <div>{{ drivers.label }}</div>
                <v-radio-group v-model="choosed.drivers">
                  <v-radio
                    v-for="item in drivers.list"
                    :key="item.sum"
                    :label="item.title"
                    :value="item"
                  />
                </v-radio-group>
              </div>

              <div class="terms" v-if="choosed.drivers.sum">
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

          <v-col sm="5" md="4" cols="12">
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
    store.getters["locales"].map((i) => {
      if (route.path.includes(i)) {
        lang = i;
      }
    });

    let osgo = await $axios.$get(`pages/osgo?lang=${lang}`);
    return { ...osgo };
  },
  data() {
    return {
      choosed: {
        type: {
          sum: null,
        },
        vehicle: {
          sum: null,
        },
        region: {
          sum: null,
        },
        period: {
          sum: null,
        },
        drivers: {
          sum: null,
        },
      },
      errorCalc: null,
      top: 250,
    };
  },
  computed: {
    sum() {
      let lang = "ru";
      this.$store.getters["locales"].map((i) => {
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
        // window.scrollTo({
        //   top: this.top += 50,
        //   behavior: 'smooth'
        // })
        if (newVal.vehicle.sum === "1.0") {
          newVal.region = this.region.list[0];
        }
        this.calc();
      },
      deep: true,
    },
  },
  mounted() {
    this.price.sum = "0.00";
    this.price.dollar = "0.00";
  },
  methods: {
    calc() {
      const count = Object.values(this.choosed).reduce((acc, cur) => {
        return cur.sum * acc;
      }, 1);
      let res = parseInt(count * this.price.sumVal)
        .toString()
        .includes(9);
      if (res) {
        this.price.sum = parseInt(count * this.price.sumVal) + 1 + ".00";
      } else {
        this.price.sum = parseInt(count * this.price.sumVal) + ".00";
      }
      this.price.dollar = (count * this.price.dollarVal).toFixed(2);
    },
    submit() {
      if (this.$v.$invalid) {
        this.$v.$touch();
        return false;
      }

      let val = this.choosed;
      let data = {};
      for (let key in val) {
        data[key] = val[key].title;
      }
      data.polis = this.price.sum;
      this.$store.commit("setDocument", data);

      let user = this.$store.getters["user"];
      let locale = this.$i18n.locale !== "ru" ? this.$i18n.locale + "/" : "";
      if (!user) {
        let osgo = {
          name: "osgo",
          link: `/${locale}auto/osgo/doc`,
        };
        this.$store.commit("calc", osgo);
        this.$router.push(`/${locale}auth/login`);
      } else {
        this.$router.push(`/${locale}auto/osgo/doc`);
      }
    },
  },
  head() {
    return {
      title: this.headertitle,
    };
  },
};
</script>
