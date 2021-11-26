<template>
  <v-layout class="page polis bg-grey">
    <v-container>
      <h1 class="title_">
        Проверка полиса
      </h1>
      <v-row>
        <v-col sm="6" cols="12">
          <div class="polis__block">
            <div class="polis__block-title">
              Обязательное страхование для автовладельцев
            </div>
            <form>
              <label for="">
                Полис №
              </label>
              <v-select
                v-model="select"
                :items="items"
              />

              <v-text-field type="number" />

              <div class="polis__btn">
                <v-btn color="success" rounded>
                  Проверка полиса
                </v-btn>
              </div>
            </form>
          </div>
        </v-col>

        <v-col sm="6" cols="12">
          <div class="polis__block">
            <div class="polis__block-title">
              Страхование путешествующих за рубеж
            </div>
            <form>
              <label for="">
                Полис № GOT / GIT
              </label>
              <v-text-field type="number" />
              <div class="polis__btn">
                <v-btn color="success" rounded>
                  Проверка полиса
                </v-btn>
              </div>
            </form>
          </div>
        </v-col>

        <v-col sm="6" cols="12">
          <div class="polis__block">
            <div class="polis__block-title">
              Страхование автомобиля (КАСКО)
            </div>
            <form>
              <label for="">
                Полис № GOK
              </label>
              <v-text-field type="number" />
              <div class="polis__btn">
                <v-btn color="success" rounded>
                  Проверка полиса
                </v-btn>
              </div>
            </form>
          </div>
        </v-col>

        <v-col sm="6" cols="12">
          <div class="polis__block">
            <div class="polis__block-title">
              Страхование недвижимого имущества
            </div>
            <form>
              <label for="">
                Полис № GOP
              </label>
              <v-text-field type="number" />
              <div class="polis__btn">
                <v-btn color="success" rounded>
                  Проверка полиса
                </v-btn>
              </div>
            </form>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </v-layout>
</template>

<script>
export default {
  data () {
    return {
      select: 'GI',
      items: [
        'GI',
        'GIL',
        'GIU'
      ]
    }
  },
  head () {
    return {
      title: 'Проверка полиса'
    }
  }
}
</script>
