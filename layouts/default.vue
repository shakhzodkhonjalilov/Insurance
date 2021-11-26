<template>
  <v-app dark>
    <Navbar />
    <v-main>
      <nuxt />

      <v-dialog v-model="telegram" max-width="500px">
        <a class="telegram__modal" href="https://t.me/msk_Ishonch_bot" target="_blank">
          <img src="/img/telegram-grow.jpg" alt />
          <p
            class="mb-0"
          >Дорогие клиенты ,стало возможно оформить страховой полис онлайн через телегам бот ,а также можете узнать подробную информацию о наших филиалах</p>
        </a>
      </v-dialog>
    </v-main>
    <Request />
    <Footer />
  </v-app>
</template>

<script>
import Navbar from "~/components/Navbar";
import Footer from "~/components/Footer";
import Request from "~/components/Request";

export default {
  components: { Navbar, Footer, Request },
  serverPrefetch() {
    return this.fetchItem();
  },
  data() {
    return {
      telegram: true,
    };
  },
  mounted() {
    this.user();
    setTimeout(() => {
      this.telegram = false;
    }, 3000);
  },
  methods: {
    async fetchItem() {
      let lang = "ru";
      this.$store.getters.locales.map((i) => {
        if (this.$route.path.includes(i)) {
          lang = i;
        }
      });

      const navbar = await this.$axios.$get(`pages/navbar?lang=${lang}`);
      this.$store.dispatch("navbar", navbar);
    },
    user() {
      const user = JSON.parse(localStorage.getItem("user"));
      if (user) {
        const time = Date.now() - user.date;
        if (time > 86400000) {
          localStorage.removeItem("user");
        } else {
          this.$store.commit("setToken", user);
        }
      }
    },
  },
};
</script>
