import colors from "vuetify/es5/util/colors";

export default {
  mode: "universal",
  head: {
    htmlAttrs: {
      lang: "ru"
    },
    titleTemplate: "%s - " + process.env.npm_package_name,
    title: process.env.npm_package_name || "",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      {
        hid: "description",
        name: "description",
        content:
          "Компания ISHONCH одна из крупнейших узбекских страховых компаний. Предоставляет все виды страхования по низкой стоимости онлайн в Ташкенте и Узбекистане."
      },
      { name: "yandex-verification", content: "bceb3a82ea527bae" },
      {
        name: "google-site-verification",
        content: "y0j--hBd4tJ3FnsE9l6ywqknrXh1Z8O3zMQjpX_toxg"
      }
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }]
  },
  loading: { color: "#d02138" },
  css: ["assets/main.scss"],
  plugins: [
    { src: "plugins/carousel.js", ssr: false },
    { src: "plugins/ga.js", mode: "client" }
  ],
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    // '@nuxtjs/eslint-module',
    "@nuxtjs/vuetify"
  ],
  modules: [
    "@nuxtjs/axios",
    "@nuxtjs/proxy",
    "@nuxtjs/pwa",
    "nuxt-i18n",
    [
      "@nuxtjs/yandex-metrika",
      {
        id: "62684767",
        webvisor: true,
        clickmap: true,
        trackLinks: true,
        accurateTrackBounce: true,
        trackHash: true
      }
    ]
  ],
  axios: {
    baseURL: "https://api.msk-ishonch.uz"
    // proxy: true
  },
  proxy: {
    "doc/": "https://api.msk-ishonch.uz"
  },

  i18n: {
    locales: ["ru", "uz", "en"],
    defaultLocale: "ru"
  },

  server: {
    port: 8000 // default: 3000
    // host: '45.11.24.163' // default: localhost
  },

  vuetify: {
    customVariables: ["~/assets/variables.scss"],
    theme: {
      dark: false,
      themes: {
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3
        }
      }
    }
  },
  build: {
    extractCSS: true,
    optimization: {
      splitChunks: {
        cacheGroups: {
          styles: {
            name: "styles",
            test: /\.(css|vue)$/,
            chunks: "all",
            enforce: true
          }
        }
      }
    }
  }
};
