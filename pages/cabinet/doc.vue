<template>
  <v-layout column>
    <h1 class="headline">{{ title }}</h1>

    <hr />

    <v-form @submit.prevent="submit">
      <v-row>
        <v-col sm="6" cols="12" v-for="(item, i) of document" :key="i">
          <v-file-input
            v-model="choosed[item.label]"
            :label="item.label"
            :placeholder="item.placeholder"
            accept="image/png, image/jpeg"
            filled
            hide-details
            prepend-icon="mdi-camera"
            show-size
          />
        </v-col>
      </v-row>
      <div class="text-center my-5">
        <v-btn rounded color="success" type="submit">Отправить документы</v-btn>
      </div>
    </v-form>
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

    let cabinet = await $axios.$get(`pages/cabinet-doc?lang=${lang}`);
    return { ...cabinet };
  },
  data() {
    return {
      choosed: {},
    };
  },
  methods: {
    submit() {
      let formData = new FormData();
      for (let item in this.choosed) {
        formData.append(`file[${item}]`, this.choosed[item]);
      }
      const token = this.$store.getters["user"].access_token;
      let url = "/files/index";
      this.$axios
        .post(url, formData, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        })
        .then((i) => {
          console.log(i);
        });
    },
  },
};
</script>
