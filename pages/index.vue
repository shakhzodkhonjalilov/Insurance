<template>
  <v-layout column justify-center align-center>
    <section class="home__top">
      <v-container>
        <v-row>
          <v-col sm="6" class="ml-auto">
            <div class="home__top-content">
              <h2>{{ title }}</h2>
              <h3 class="sub_title_ mb-5">{{ info }}</h3>
              <a href="#" class="btn btn-red" @click.stop="dialog = true">{{ titles.buttonTitle }}</a>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </section>

    <section class="home__calc">
      <v-container>
        <v-row no-gutters class="home__calc-row">
          <v-col v-for="(item, index) in calc" :key="index" md="3" sm="6" cols="12">
            <nuxt-link :to="localePath(item.link)" class="home__calc-block mr-md-1">
              <img :src="`/img/${ item.icon }`" alt />
              <div>
                <h3>{{ item.title }}</h3>
              </div>
            </nuxt-link>
          </v-col>
        </v-row>
      </v-container>
    </section>

    <Advantages :advan="advantages" />

    <section class="home__about">
      <v-container>
        <h2 class="title_">{{ title2 }}</h2>
        <v-row>
          <v-col md="6" cols="12">
            <div v-html="info2"></div>
          </v-col>
          <v-col md="6" cols="12">
            <div class="headline mb-5 text-center">{{ titles.serviceTitle }}</div>
            <v-expansion-panels accordion class="faq">
              <v-expansion-panel v-for="(item, i) in services" :key="i">
                <v-expansion-panel-header>
                  <span
                    class="faq-title"
                  >{{ item.title == 'Автостраховаине' ? 'Автострахование' : item.title }}</span>
                </v-expansion-panel-header>
                <v-expansion-panel-content>{{ item.description }}</v-expansion-panel-content>
              </v-expansion-panel>
            </v-expansion-panels>
          </v-col>
        </v-row>
      </v-container>
    </section>

    <Clients :title="titles.partnerTitle" />

    <div>
      <v-dialog v-model="dialog" max-width="400px">
        <v-form class="form modal__form" @submit.prevent="submit">
          <div class="modal__form-header">
            <strong>Онлайн заявка</strong>
            <v-btn icon @click="dialog = false">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </div>
          <hr />
          <v-text-field
            v-model="name"
            label="Ваше Имя"
            :error-messages="nameErrors"
            required
            @input="$v.name.$touch()"
            @blur="$v.name.$touch()"
          />
          <v-text-field
            v-model="number"
            label="Номер телефона"
            :error-messages="numberErrors"
            required
            @input="$v.number.$touch()"
            @blur="$v.number.$touch()"
          />
          <div class="text-center">
            <v-btn rounded color="success" type="submit">Отправить</v-btn>
          </div>
        </v-form>
      </v-dialog>

      <v-dialog v-model="success" max-width="500px">
        <div style="background: #fff">
          <v-alert
            dense
            text
            type="success"
            class="mb-0"
          >Спасибо за заявку в скором времени оператор свзяжется с вами</v-alert>
        </div>
      </v-dialog>
    </div>
  </v-layout>
</template>

<script>
import { validationMixin } from "vuelidate";
import { required } from "vuelidate/lib/validators";

import Advantages from "~/components/Advantages";
import Clients from "~/components/Clients";

export default {
  components: { Advantages, Clients },
  mixins: [validationMixin],
  validations: {
    number: { required },
    name: { required },
  },
  async asyncData({ store, $axios, route }) {
    let lang = "ru";
    store.getters.locales.map((i) => {
      if (route.path.includes(i)) {
        lang = i;
      }
    });

    const home = await $axios.$get(`pages/view?lang=${lang}&url=home`);
    return {
      ...home.description,
      ...home.extraFields,
    };
  },
  data() {
    return {
      dialog: false,
      success: false,
      name: "",
      number: "",
    };
  },
  computed: {
    numberErrors() {
      const errors = [];
      if (!this.$v.number.$dirty) {
        return errors;
      }
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
  },
  methods: {
    submit() {
      if (this.$v.$invalid) {
        this.$v.$touch();
        return false;
      }
      const data = {
        name: this.name,
        phone: this.number,
      };
      this.$axios.post("requests/insert", data).then((res) => {
        this.success = true;
        this.name = "";
        this.number = "";
        setTimeout(() => {
          this.success = false;
        }, 3000);
      });
      this.dialog = false;
    },
  },
  head() {
    return {
      title:
        "Главная страница: компания «ISHONCH»; Предоставляет услуги страхования - Крупнейшей страховой компании в Узбекистане",
      meta: [
        {
          hid: "description",
          name: "description",
          content:
            "Страхование в Ташкенте и Узбекистане. Компания «ISHONCH» Главная страница - Страховая компания Ishonch предоставляет услуги по различным видам страхования в том числе автострахование и страхование путешествий. Страхование по выгодным тарифам и быстрое онлайн оформление. Тел: +998 90 318 27 28",
        },
        {
          name: "keywords",
          content:
            "со, страхование, страховая, со в ташкенте, страховка, со в узбекистане, страховая компания, страхование в узбекистане, страховая в узбекистане",
        },
        {
          name: "robots",
          content: "index, follow",
        },
      ],
    };
  },
};
</script>
