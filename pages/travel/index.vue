<template>
  <v-layout column class="bg-grey">
    <section class="travel page">
      <h1 class="title_">{{ title }}</h1>
      <div class="sub-title_">{{ info }}</div>

      <v-container>
        <v-row class="text-center">
          <v-col v-for="item in product" :key="item.title" sm="6" cols>
            <div class="title">{{ item.title }}</div>
            <nuxt-link :to="localePath(item.link)" class="btn btn-red">{{ item.text }}</nuxt-link>
          </v-col>
        </v-row>
      </v-container>
    </section>

    <v-container>
      <section class="section">
        <div class="title_">{{ turist.title }}</div>

        <v-row>
          <v-col v-for="(item, i) in turist.list" :key="i" sm="6" cols>
            <div class="text-center">
              <img :src="item.icon" alt class="travel-icon" />
            </div>
            <p>{{ item.text }}</p>
          </v-col>
        </v-row>
        <div class="text-center">{{ turist.info }}</div>
      </section>

      <section class="white py-4">
        <h2 class="title_ mt-3">{{ buy.title }}</h2>
        <div class="sub-title_">{{ buy.subtitle }}</div>
        <v-row justify="center">
          <v-col v-for="item in buy.type" :key="item.name" sm="4" cols>
            <div class="text-center travel__buy">
              <img src="/img/online.svg" alt />
              <div>{{ item.name }}</div>
            </div>
            <div class="text-center">
              <p class="subtitle-1">{{ item.text }}</p>
              <p>{{ item.info }}</p>
            </div>
          </v-col>
        </v-row>
      </section>

      <section class="section">
        <div class="title_">{{ services.title }}</div>
        <v-row>
          <v-col v-for="(item, i) in services.list" :key="i" sm="4" cols>
            <div class="travel__info">
              <img :src="item.icon" alt />
              <p>{{ item.text }}</p>
            </div>
          </v-col>
        </v-row>
      </section>

      <section>
        <div class="title_">{{ title2 }}</div>
        <div v-html="info2"></div>
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
    store.getters.locales.map((i) => {
      if (route.path.includes(i)) {
        lang = i;
      }
    });

    const travel = await $axios.$get(`pages/view?lang=${lang}&url=travel`);
    return {
      ...travel.description,
      ...travel.extraFields,
    };
  },
  head() {
    return {
      title: "Путешествия - Страхование путешествий по доступным ценам",
      meta: [
        {
          hid: "description",
          name: "description",
          content:
            "Путешествия - Выгодное страхование путешествий с Ishonch. Оформите страховку онлайн быстро и удобно на нашем сайте. Страхование путешествий по выгодным и доступным ценам.",
        },
        {
          name: "keywords",
          content:
            "Путешествия - Страхование путешествий, страхование путешествий за рубежом, страховка путешествий, страховка онлайн",
        },
      ],
    };
  },
};
</script>
