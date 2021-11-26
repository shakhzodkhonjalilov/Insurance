<template>
  <v-layout class="about page bg-grey" v-if="api">
    <v-container>
      <h1 class="title_">{{ api.title }}</h1>
      <section class="about__section">
        <v-row justify="center">
          <v-col md="10" cols="11">
            <div v-html="api.info"></div>
          </v-col>
        </v-row>
      </section>

      <Advantages class="mb-5" :advan="api.advantages" />

      <section class="about__section">
        <v-row justify="center">
          <v-col md="10" cols="11">
            <div v-html="api.info2"></div>
          </v-col>
        </v-row>
      </section>

      <Clients class="white" />

      <div class="title_ mt-4">{{ api.license.title }}</div>

      <section class="about__section">
        <v-row justify="center">
          <v-col md="8">
            <div class="about__license">
              <a v-for="(item, i) in api.license.list" :key="i" :href="item" target="_blink">
                <img :src="item.url" alt />
              </a>
            </div>
          </v-col>
        </v-row>
      </section>
    </v-container>
  </v-layout>
</template>

<script>
import Advantages from "../components/Advantages";
import Clients from "../components/Clients";

export default {
  components: { Advantages, Clients },
  data() {
    return {
      api: null,
    };
  },
  methods: {
    async fetchAbout() {
      let lang = "ru";
      this.$store.getters.locales.map((i) => {
        if (this.$route.path.includes(i)) {
          lang = i;
        }
      });
      const res = await this.$axios.get(`pages/view?lang=${lang}&url=about`);
      const about = await res.data;
      this.api = {
        ...about.description,
        ...about.extraFields,
      };
    },
  },
  created() {
    this.fetchAbout();
  },
  head() {
    return {
      title: "О страховой компании Ishonch.",
      meta: [
        {
          hid: "description",
          name: "description",
          content:
            "О компании ООО Ishonch - компания с многолетним опытом предоставление услуг в сфере страхования, включая автострахование, страхование путешествий и различными видами страховки.",
        },
        {
          name: "keywords",
          content:
            "IShONCh Информация о компании, IShoNCh история компании, IShONCh данные компании, Информация о компании IShONCh, история компании IShONCh,осаго, осаго онлайн, страховка авто",
        },
      ],
    };
  },
};
</script>
