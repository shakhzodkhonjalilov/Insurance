<template>
  <v-layout class="page bg-grey">
    <v-container>
      <h1 class="title_">{{ title }}</h1>
      <v-expansion-panels v-model="panel" multiple accordion class="faq">
        <v-expansion-panel v-for="(item, i) in questions" :key="i">
          <v-expansion-panel-header>
            <span class="faq-title">{{ item.description.question }}</span>
          </v-expansion-panel-header>
          <v-expansion-panel-content>{{ item.description.answer }}</v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
    </v-container>
  </v-layout>
</template>

<script>
export default {
  async asyncData({ store, $axios, route }) {
    let lang = "ru";
    store.getters.locales.map((i) => {
      if (route.path.includes(i)) {
        lang = i;
      }
    });
    const faq = await $axios.$get(`questions?lang=${lang}`);
    return {
      ...faq,
    };
  },
  data() {
    return {
      panel: [0],
    };
  },
  head() {
    return {
      title:
        "Часто задаваемые вопросы по страхованию на сайте msk-ishonch.uz: подробные ответы на вопросы клиентов компании «ISHONCH»;",
      meta: [
        {
          hid: "description",
          name: "description",
          content:
            "FAQ - Получите ответы на самые интересующие вас вопросы о компании Ishonch на странице вопрос - ответ. Самые важные и актуальные ответы на ваши вопросы вы сможете узнать тут.",
        },
        {
          name: "keywords",
          content:
            "msk-ishonch.uz Вопросы и ответы, msk-ishonch.uz часто задаваемые вопросы, Msk-ishonch.Uz ответы на вопросы, Msk-ishonch.Uz часто задаваемые вопросы и ответы, IShONCh faq, страховые компании,автострахование",
        },
      ],
    };
  },
};
</script>
