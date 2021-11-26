<template>
  <v-layout class="page bg-grey">
    <v-container>
      <h1 class="title_">Новости</h1>
      <v-row>
        <v-col md="6">
          <div class="news__block news__block-first">
            <div class="news__img">
              <img src="/img/news_1.jpg" alt />
            </div>
            <div
              class="news__block-title"
            >Рейтинговое агентство «Ahbor-Reyting» присвоило ООО МСК «IShONCh» рейтинг платежеспособности по национальной шкале до уровня «uzA+» (ОЧЕНЬ ВЫСОКИЙ) с прогнозом «Стабильный» по итогам 2019 года.</div>
            <p>
              РА «Ahbor-Reyting» предполагает, что ООО МСК «IShONCh» с помощью грамотно разработанной стратегии продажи стразовых услуг и в дальнейшем будет поддерживать высокие темпы роста объема предоставляемых страховых услуг.
              По мнению «Ahbor-Reyting», ООО МСК «IShONCh», с учетом действующего состава ее акционеров и имеющейся безусловной государственной поддержке и в дальнейшем будет иметь высокий уровень поддержки своих участников в любой необходимый момент времени.
              Мы благодарим Рейтинговое агентство «Ahbor-Reyting» за оказанное высокое доверие и объективную оценку нашей компании.
            </p>
          </div>
        </v-col>
        <!-- <v-col>
          <div class="news__block">
            <span>10 Март 2020</span>
            <div
              class="news__block-title"
            >Страховщикам разрешат идентифицировать клиентов через банки (РФ)</div>
          </div>
          <div class="news__block">
            <span>10 Март 2020</span>
            <div
              class="news__block-title"
            >Страховщикам разрешат идентифицировать клиентов через банки (РФ)</div>
          </div>
        </v-col>-->
      </v-row>
      <!-- <v-row>
        <v-col md="4">
          <div class="news__block">
            <span>10 Март 2020</span>
            <div
              class="news__block-title"
            >Страховщикам разрешат идентифицировать клиентов через банки (РФ)</div>
          </div>
        </v-col>
        <v-col md="4">
          <div class="news__block">
            <span>10 Март 2020</span>
            <div
              class="news__block-title"
            >Страховщикам разрешат идентифицировать клиентов через банки (РФ)</div>
          </div>
        </v-col>
        <v-col md="4">
          <div class="news__block">
            <span>10 Март 2020</span>
            <div
              class="news__block-title"
            >Страховщикам разрешат идентифицировать клиентов через банки (РФ)</div>
          </div>
        </v-col>
        <v-col md="4">
          <div class="news__block">
            <span>10 Март 2020</span>
            <div
              class="news__block-title"
            >Страховщикам разрешат идентифицировать клиентов через банки (РФ)</div>
          </div>
        </v-col>
        <v-col md="4">
          <div class="news__block">
            <span>10 Март 2020</span>
            <div
              class="news__block-title"
            >Страховщикам разрешат идентифицировать клиентов через банки (РФ)</div>
          </div>
        </v-col>
        <v-col md="4">
          <div class="news__block">
            <span>10 Март 2020</span>
            <div
              class="news__block-title"
            >Страховщикам разрешат идентифицировать клиентов через банки (РФ)</div>
          </div>
        </v-col>
      </v-row>
      <div class="text-center">
        <v-pagination v-model="page" :length="4" circle />
      </div>-->
    </v-container>
  </v-layout>
</template>

<script>
export default {
  data() {
    return {
      page: 1,
    };
  },
  head() {
    return {
      title: "Новости компании",
    };
  },
};
</script>
