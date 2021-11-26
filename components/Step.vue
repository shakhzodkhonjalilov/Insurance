<template>
  <v-container>
    <ul class="steps">
      <li
        v-for="(item, i) in step"
        :key="i"
        class="steps__item"
        :class="cur >= item.num ? 'steps__item-active' : ''"
      >
        <div class="steps__indicator">
          {{ item.num }}
        </div>
        <div class="steps__text">
          {{ item.title }}
        </div>
      </li>
    </ul>
  </v-container>
</template>

<script>
export default {
  props: ['cur'],
  data () {
    return {
      step: [
        {
          title: 'Расчет стоимости',
          num: 1
        },
        {
          title: 'Оформление полиса',
          num: 2
        },
        {
          title: 'Оплата и получение полиса',
          num: 3
        }
      ]
    }
  }
}
</script>
