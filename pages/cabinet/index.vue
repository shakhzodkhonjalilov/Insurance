<template>
  <v-layout column v-if="cabinet">
    <section>
      <h1 class="headline">{{ cabinet.title }}</h1>

      <hr />

      <v-row>
        <v-col sm="6" cols>
          <div class="cabinet__user cabinet__user-info">
            <div class="cabinet__user-title">
              <v-icon>mdi-account</v-icon>
              {{ cabinet.info }}
            </div>

            <ul>
              <li>
                <strong>ФИО:</strong>
                {{ user.name }}
              </li>
              <li>
                <strong>Номер:</strong>
                {{ user.username }}
              </li>
            </ul>
          </div>
          <div class="cabinet__alert">{{ cabinet.alert }}</div>
        </v-col>
        <v-col sm="6" cols>
          <div class="cabinet__user cabinet__user-document">
            <div class="cabinet__user-title">
              <v-icon>mdi-account</v-icon>
              {{ cabinet.uploadDoc }}
            </div>

            <ul>
              <li v-for="item in document" :key="item.type">
                <strong>{{ item.type }}</strong>
              </li>
            </ul>
          </div>
          <div class="cabinet__alert cabinet__alert-warning">{{ cabinet.alertDoc }}</div>
        </v-col>
      </v-row>

      <v-row>
        <v-col sm="3" cols="6" v-for="(item, idx) in document" :key="idx">
          <h4 class="text-center">{{ item.type }}</h4>
          <img :src="'https://api.msk-ishonch.uz/uploads/' + item.name" alt />
        </v-col>
      </v-row>
    </section>
  </v-layout>
</template>

<script>
export default {
  layout: "cabinet",
  async asyncData({ store, $axios, route }) {
    let lang = "ru";
    store.getters["locales"].map((i) => {
      if (route.path.includes(i)) {
        lang = i;
      }
    });

    const token = store.getters["user"].access_token;
    let cabinet = await $axios.$get(`pages/cabinet?lang=${lang}`);
    let user = await $axios.$get(`doc/user-info`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    let document = await $axios.$get(`files/files`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return { cabinet, ...user, document };
  },
  data() {
    return {
      user: null,
      cabinet: null,
      document: null,
    };
  },
};
</script>
