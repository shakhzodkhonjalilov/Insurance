<template>
  <section class="partner">
    <v-container>
      <div class="title_">
        {{ title }}
      </div>
      <client-only>
        <carousel v-bind="carouselOptions">
          <div v-for="(item, i) in clients" :key="i" class="partner_block">
            <img :src="item" alt="">
          </div>
        </carousel>
      </client-only>
    </v-container>
  </section>
</template>

<script>
export default {
  props: ['title'],
  data () {
    return {
      clients: [
        '/img/partner/davr.jpg',
        '/img/partner/htb.jpg',
        '/img/partner/infinbank.jpg',
        '/img/partner/ipateka.jpg',
        '/img/partner/khamkorbank.jpg',
        '/img/partner/qqb.jpg',
        '/img/partner/trastbank.jpg',
        '/img/partner/turkistonbank.jpg',
        '/img/partner/turonbank.jpg'
      ],
      carouselOptions: {
        autoplay: true,
        dots: false,
        loop: true,
        items: null,
        margin: 30,
        navText: ['<img src="/img/icons/back.svg">', '<img src="/img/icons/chevron.svg">']
      }
    }
  },
  mounted () {
    if (window.outerWidth > 1200) {
      this.carouselOptions.items = 5
    } else if (window.outerWidth > 767) {
      this.carouselOptions.items = 4
    } else {
      this.carouselOptions.items = 2
    }
  }
}
</script>
