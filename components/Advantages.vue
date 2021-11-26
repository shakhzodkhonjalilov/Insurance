<template>
  <section class="advantages">
    <v-container>
      <h2 class="title_">
        {{ advantages.title }}
      </h2>
      <v-row>
        <v-col v-for="item in advantages.list" :key="item.title">
          <div class="advantages-title">
            {{ item.title }}
            <span v-if="item.subtitle" class="title">
              {{ item.subtitle }}
            </span>
            <img :src="item.url" v-if="item.url">
          </div>
          <p>{{ item.text }}</p>
        </v-col>
      </v-row>
    </v-container>
  </section>
</template>

<script>
export default {
  props: ['advan'],
  data () {
    return {
      advantages: this.advan
    }
  }
}
</script>
