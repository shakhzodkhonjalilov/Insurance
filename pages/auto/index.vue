<template>
  <v-layout class="page auto bg-grey">
    <v-container>
      <h1 class="title_ mb-6">{{ title }}</h1>
      <div class="sub-title_">{{ info }}</div>

      <section>
        <v-row justify="center">
          <v-col
            v-for="(item, idx) in product"
            :key="idx"
            md="4"
            sm="6"
            cols="12"
          >
            <a href="/" @click.prevent="goToLink(item.link)" class="auto__type">
              <img :src="item.img" alt />
              <div class="auto__list-title btn btn-red">{{ item.title }}</div>
            </a>
          </v-col>
        </v-row>
      </section>

      <section class="section text-center">
        <div v-html="info2"></div>
      </section>

      <section class="text-center">
        <v-row class="white">
          <v-col v-for="item in desc" :key="item.title" sm="6" cols="12">
            <div class="title">{{ item.title }}</div>
            <p>{{ item.text }}</p>
          </v-col>
        </v-row>
      </section>

      <section class="mt-8 auto__block">
        <h3 class="title_">{{ buy.title }}</h3>
        <div class="sub-title_">{{ buy.subtitle }}</div>

        <v-row>
          <v-col
            v-for="(item, i) in buy.list"
            :key="item.title"
            md="4"
            :sm="i == 0 ? 12 : 6"
            cols="12"
          >
            <div class="auto__block-title">
              <img :src="'/img/icons/' + item.img" alt />
              <div class="title">{{ item.title }}</div>
            </div>
            <div class="text-center">{{ item.text }}</div>
          </v-col>
        </v-row>
      </section>

      <Faq :faq="faq" />
    </v-container>
  </v-layout>
</template>

<script>
import Faq from "~/components/Faq";

export default {
  components: { Faq },
  async asyncData({ store, $axios, route }) {
    let lang = "ru";
    store.getters["locales"].map((i) => {
      if (route.path.includes(i)) {
        lang = i;
      }
    });

    let auto = await $axios.$get(`pages/view?lang=${lang}&url=auto`);
    return {
      ...auto.description,
      ...auto.extraFields,
    };
  },
  methods: {
    goToLink(link) {
      link.includes("http")
        ? (location.href = link)
        : this.$router.push(this.localePath(link));
    },
  },
  head() {
    return {
      title: "Автострахование в Ishonch.",
      meta: [
        {
          hid: "description",
          name: "description",
          content:
            "Автострахование с Ishonch - это быстро, выгодно и удобно. Воспользуйтесь одной или несколькими программами страхование авто и застрахуйте транспортное средство от возможных рисков.",
        },
        {
          name: "keywords",
          content:
            "Автострахование, Автострахование в ташкенте, обязательная страховка транспорта, страховка онлайн",
        },
      ],
    };
  },
};
</script>
