<template>
  <section class="section">
    <div class="title_">
      {{ faq.title }}
    </div>

    <v-expansion-panels accordion multiple class="faq mb-4">
      <v-expansion-panel
        v-for="(item,i) in faq.list"
        :key="i"
      >
        <v-expansion-panel-header>
          <span class="faq-title">
            {{ item.title }}
          </span>
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          {{ item.desc }}
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>

    <div class="text-center">
      <nuxt-link v-for="(item, i) in faq.buy" :key="i" :to="localePath(item.link)" class="btn faq__btn mx-2 my-2">
        {{ item.text }}
      </nuxt-link>
    </div>
  </section>
</template>

<script>
export default {
  props: ['faq']
}
</script>
