<template>
  <v-app dark>
    <Navbar />
    <v-main>
      <section class="page bg-grey cabinet">
        <v-container>
          <v-row class="white" no-gutters>
            <v-col md="2" cols>
              <ul class="cabinet__list">
                <li v-for="item in menu" :key="item.title">
                  <nuxt-link :to="localePath(item.link)">{{ item.title }}</nuxt-link>
                </li>
                <li>
                  <nuxt-link to="/" @click.native="logout">Выйти</nuxt-link>
                </li>
              </ul>
            </v-col>
            <v-col md="10" cols>
              <nuxt class="cabinet__content" />
            </v-col>
          </v-row>
        </v-container>
      </section>
    </v-main>
    <Footer />
  </v-app>
</template>

<script>
import Navbar from "~/components/Navbar";
import Footer from "~/components/Footer";

export default {
  components: { Navbar, Footer },
  middleware: ["auth"],
  serverPrefetch() {
    return this.fetchItem();
  },
  data() {
    return {
      menu: [
        {
          title: "Информация",
          link: "/cabinet",
        },
        {
          title: "Страховки",
          link: "/cabinet/orders",
        },
        {
          title: "Документы",
          link: "/cabinet/doc",
        },
        {
          title: "Настройки",
          link: "/cabinet/settings",
        },
      ],
    };
  },
  methods: {
    logout() {
      localStorage.removeItem("user");
      this.$store.dispatch("logout");
    },
    async fetchItem() {
      let lang = "ru";
      this.$store.getters["locales"].map((i) => {
        if (this.$route.path.includes(i)) {
          lang = i;
        }
      });
      let navbar = await this.$axios.$get(`pages/navbar?lang=${lang}`);
      this.$store.dispatch("navbar", navbar);
    },
  },
  head() {
    return {
      title: "Личный кабинет",
    };
  },
};
</script>
