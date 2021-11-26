<template>
  <v-footer class="footer">
    <v-container>
      <v-row>
        <v-col sm="5" cols="12">
          <nuxt-link to="/" class="footer__logo">
            <img src="/img/logo.png" alt />
          </nuxt-link>
          <v-row>
            <v-col md="6" cols="6">
              <div class="footer__cont">
                <strong>
                  <img src="/img/icons/location.svg" alt style="width: 24px" />
                  {{ footer.address.title }}:
                </strong>
                <p class="mb-0">{{ footer.address.text }}</p>
              </div>
            </v-col>
            <v-col md="6" cols="6">
              <div class="footer__cont">
                <strong>
                  <v-icon>mdi-phone</v-icon>
                  {{ footer.number.title }}:
                </strong>
                <a
                  v-for="(item, i) in footer.number.list"
                  :key="i"
                  :href="'tel:' + item.link"
                  class="footer__cont-number"
                >{{ item.text }}</a>
              </div>
            </v-col>
            <v-col cols="12">
              <div class="footer__cont">
                <strong>
                  <v-icon>mdi-email</v-icon>
                  {{ footer.email.title }}
                </strong>
                <a :href="'mailto:'+ footer.email.text">{{ footer.email.text }}</a>
              </div>
            </v-col>
          </v-row>
        </v-col>
        <v-col>
          <ul class="footer__list">
            <li v-for="item in footer.infolink" :key="item.title">
              <nuxt-link :to="localePath(item.link)">{{ item.title }}</nuxt-link>
            </li>
          </ul>
        </v-col>
        <v-col>
          <ul class="footer__list footer__social">
            <li v-for="item in socials" :key="item.title">
              <a :href="item.link" target="_blank">
                <img :src="item.icon" alt />
                {{ item.title }}
              </a>
            </li>
          </ul>
        </v-col>
      </v-row>
    </v-container>
    <div class="footer__copy">{{ footer.copyl }}</div>
  </v-footer>
</template>

<script>
export default {
  data() {
    return {
      socials: [
        {
          link: "https://t.me/msk_Ishonch_bot",
          icon: "/img/social/telegram.svg",
          title: "Telegram",
        },
        {
          link: "https://www.facebook.com/Msk_Ishonch-105117594499768/",
          icon: "/img/social/facebook.svg",
          title: "Facebook",
        },
        {
          link: "https://www.instagram.com/msk_ishonch/",
          icon: "/img/social/instagram.svg",
          title: "Instagram",
        },
      ],
    };
  },
  computed: {
    footer() {
      return this.$store.getters["footer"];
    },
  },
};
</script>
