<template>
  <header class="header">
    <v-container fluid>
      <div class="header__top">
        <nuxt-link :to="localePath('/')" class="navbar__logo">
          <img src="/img/logo.png" alt />
        </nuxt-link>

        <ul class="navbar__top navbar">
          <li v-for="item in header.topnavbar" :key="item.title">
            <nuxt-link
              :to="localePath(item.link + '/')"
              class="navbar__top-link"
              :exact="item.exactl"
            >{{ item.title }}</nuxt-link>
          </li>
        </ul>

        <v-spacer />

        <ul class="navbar navbar__lan">
          <li v-for="(item, i) in $root.$i18n.locales" :key="i">
            <nuxt-link :to="switchLocalePath(item)" @click.native="setLocale(item)">
              <v-btn :class="item === $i18n.locale ? 'active' : ''" icon rounded>{{ item }}</v-btn>
            </nuxt-link>
          </li>
        </ul>

        <nuxt-link :to="localePath(user.link)" class="header__sing">
          <v-icon>mdi-account</v-icon>
          {{ user.name }}
        </nuxt-link>
      </div>

      <nav>
        <div class="header__mobile-btn">
          <div class="menu-icon" @click="showMenu">
            <span class="menu-icon__line" />
            <span class="menu-icon__line" />
            <span class="menu-icon__line" />
          </div>
          {{ header.menu }}
        </div>

        <ul class="header__navbar navbar">
          <li v-for="(item, idx) in header.navbar" :key="item.title">
            <nuxt-link
              v-if="idx !== 2"
              :to="localePath(item.link)"
              class="header__navbar-link"
            >{{ item.title }}</nuxt-link>
          </li>
        </ul>

        <v-spacer />

        <a href="tel:998999044904" class="header__navbar-dtp">
          <v-icon class="white--text">mdi-phone</v-icon>Номер аваркома в случае ДТП
        </a>

        <a :href="'tel:' + header.number.link" class="header__navbar-link">
          <v-icon class="white--text">mdi-phone</v-icon>
          {{ header.number.text }}
        </a>
      </nav>
    </v-container>

    <div class="mobile__menu" :class="mobMenu ? 'active' : null">
      <div class="mobile__menu-close">
        <span>{{ header.menu }}</span>
        <button icon @click="mobMenu = false">
          <v-icon>mdi-close</v-icon>
        </button>
      </div>

      <hr />

      <ul>
        <li v-for="(item, index) in header.navbar" :key="item.title" @click="mobMenu = false">
          <nuxt-link v-if="index !== 2" :to="localePath(item.link)">{{ item.title }}</nuxt-link>
        </li>
      </ul>

      <hr />

      <ul>
        <li v-for="item in header.topnavbar" :key="item.title" @click="mobMenu = false">
          <nuxt-link :to="localePath(item.link)">{{ item.title }}</nuxt-link>
        </li>
      </ul>

      <hr />
      <a href="tel:998999044904" class="mobile__menu-call">
        <v-icon>mdi-phone</v-icon>Номер аваркома в случае ДТП
      </a>
      <hr />
      <a :href="'tel:' + header.number.link" class="mobile__menu-call">
        <v-icon>mdi-phone</v-icon>
        {{ header.number.text }}
      </a>
    </div>
  </header>
</template>

<script>
export default {
  methods: {
    showMenu() {
      this.mobMenu = true;
    },
    async setLocale(lang) {
      let navbar = await this.$axios.$get(`pages/navbar?lang=${lang}`);
      this.$store.dispatch("navbar", navbar);
    },
  },
  data() {
    return {
      mobMenu: false,
    };
  },
  computed: {
    header() {
      return this.$store.getters["header"];
    },
    user() {
      let user = this.$store.getters["user"];
      if (user) {
        let name = user.name.split(" ")[0];
        return {
          name: name,
          link: "/cabinet",
        };
      } else {
        return {
          name: this.header.login,
          link: "/auth/login",
        };
      }
    },
  },
};
</script>
