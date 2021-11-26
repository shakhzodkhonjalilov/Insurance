<template>
  <v-layout
    class="travel__calc page"
    column
  >
    <h1 class="title_">
      {{ title }}
    </h1>

    <Step />

    <section>
      <v-container>
        <v-row justify="center">
          <v-col md="6" sm="7" cols="12">
            <v-form class="travel__calc-form travel-block" @submit.prevent="submit">
              <div>
                <strong>Выберите страну назначения/посещения</strong>
                <v-autocomplete
                  v-model="choosed.country"
                  :items="countries"
                  chips
                  placeholder="Страна"
                  multiple
                  deletable-chips
                  hide-selected
                  validate-on-blur
                  @change="changeCountry"
                />
              </div>

              <div v-if="choosed.country.length > 0">
                <div>Выберите программу страхования *</div>
                <v-radio-group v-model="choosed.program">
                  <v-label v-for="(item, i) in program" :key="i">
                    <v-radio
                      :value="item.title"
                    />
                    <span class="title">
                      {{ item.title }}
                    </span>
                    <p>
                      Медицинские услуги:
                      <strong>{{ item.medical }}</strong>
                    </p>
                    <p>
                      Медико-транспортные и иные услуги:
                      <strong>{{ item.transport }}</strong>
                    </p>
                    <p>
                      Страхование от несчастного случая (смерть):
                      <strong>{{ item.accident }}</strong>
                    </p>
                    <p>
                      Итого:
                      <strong>{{ item.result }}</strong>
                    </p>
                  </v-label>
                </v-radio-group>
              </div>

              <div class="travel__calc-date">
                <v-menu
                  v-model="startDate"
                  :close-on-content-click="false"
                  :nudge-right="40"
                  transition="scale-transition"
                  offset-y
                  min-width="290px"
                >
                  <template v-slot:activator="{ on }">
                    <v-text-field
                      v-model="startIns"
                      class="travel__calc-date-block"
                      label="Начало путешествия"
                      readonly
                      v-on="on"
                    />
                  </template>
                  <v-date-picker
                    v-model="startIns"
                    :min="date"
                    :max="endIns"
                    @input="startDate = false"
                  />
                </v-menu>

                <v-menu
                  :close-on-content-click="true"
                  :nudge-right="40"
                  transition="scale-transition"
                  offset-y
                  min-width="290px"
                >
                  <template v-slot:activator="{ on }">
                    <v-text-field
                      v-model="endIns"
                      class="travel__calc-date-block"
                      label="Конец путешествия"
                      readonly
                      v-on="on"
                    />
                  </template>
                  <v-date-picker
                    v-model="endIns"
                    :min="startIns || date"
                  />
                </v-menu>

                <v-text-field
                  v-model="intervalDate"
                  class="travel__calc-date-interval"
                  outlined
                  disabled
                />
              </div>

              <div>
                <div class="title">
                  Укажите цель поездки
                </div>
                <v-radio-group v-model="choosed.target">
                  <v-label v-for="(item, i) in target" :key="i">
                    <v-radio
                      :value="item"
                    />
                    {{ item }}
                  </v-label>
                </v-radio-group>
              </div>

              <div class="travel__calc-count">
                <div class="title">
                  Количество путешественников
                </div>
                <v-radio-group v-model="choosed.count">
                  <v-label
                    v-for="(item, i) in count"
                    :key="i"
                  >
                    <v-radio
                      :value="item"
                    />
                    {{ item }}
                  </v-label>
                </v-radio-group>
              </div>

              <div>
                <div class="travel__calc-count">
                  <div class="title">
                    Укажите дату рождения путешественника(ов)
                  </div>
                </div>

                <div class="travel__calc-birth">
                  <div>
                    <v-menu
                      ref="menu3"
                      v-model="menu3"
                      :close-on-content-click="false"
                      transition="scale-transition"
                      offset-y
                      min-width="290px"
                    >
                      <template v-slot:activator="{ on }">
                        <v-text-field
                          v-model="date"
                          label="Birthday date"
                          readonly
                          v-on="on"
                        />
                      </template>
                      <v-date-picker
                        ref="picker"
                        v-model="date"
                        :max="new Date().toISOString().substr(0, 10)"
                        min="1950-01-01"
                        @change="save"
                      />
                    </v-menu>
                  </div>
                </div>
              </div>

              <div class="terms">
                <v-checkbox v-model="terms">
                  <template v-slot:label>
                    <div>
                      Согласен с условиями
                      <a href="#">
                        Публичной оферты
                      </a>
                    </div>
                  </template>
                </v-checkbox>
              </div>

              <div>
                <v-btn color="primary" block type="submit">
                  Оформить полис онлайн
                </v-btn>
              </div>
            </v-form>
          </v-col>

          <v-col md="4" sm="5" cols="12">
            <div class="price">
              <div class="price-title">
                {{ price.title }}
              </div>
              <div class="price-sum">
                {{ price.sum }} {{ sum }}
              </div>
              <div class="price-dollar">
                {{ price.dollar }} $
              </div>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </section>
  </v-layout>
</template>

<script>
import Step from '~/components/Step'
import Countries from '~/api/countries'

export default {
  components: { Step },
  data () {
    return {
      title: 'Калькулятор для расчета стоимости полиса',
      countries: Countries,
      program: [
        {
          title: 'COMFORT',
          medical: 'до 10 000 евро',
          transport: 'до 9 000 евро',
          accident: '1000 евро',
          result: '20 000 евро'
        },
        {
          title: 'GRAND 1',
          medical: 'до 25 000 евро',
          transport: 'до 23 500 евро',
          accident: '1 500 евро',
          result: '50 000 евро'
        },
        {
          title: 'GRAND 2',
          medical: 'до 30 000 евро',
          transport: 'до 28 000 евро',
          accident: '2000 евро',
          result: '60 000 евро'
        },
        {
          title: 'PRESTIGE',
          medical: 'до 40 000 евро',
          transport: 'до 47 000 евро',
          accident: '3000 евро',
          result: '90 000 евро'
        }
      ],
      startIns: null,
      endIns: null,
      date: new Date().toISOString().substr(0, 10),
      dateBirth: null,
      startDate: false,
      intervalDate: 0,
      menu3: false,
      choosed: {
        country: [],
        program: null,
        target: null,
        count: null
      },
      target: [
        'Путешествие',
        'Работа',
        'Активный отдых(Спорт)'
      ],
      count: [
        'Путешествую один',
        'Cемейное путешествие',
        'до 6 человек включительно'
      ],
      price: {
        sum: '0.00',
        dollar: '0.00',
        sumVal: '1680000',
        dollarVal: '175.8'
      },
      terms: false
    }
  },
  watch: {
    menu3 (val) {
      val && setTimeout(() => (this.$refs.picker.activePicker = 'YEAR'))
    },
    endIns () {
      if (this.startIns) {
        this.sumInterval()
      }
    },
    startIns () {
      if (this.endIns) {
        this.sumInterval()
      }
    }
  },
  methods: {
    save (date) {
      this.$refs.menu3.save(date)
    },
    sumInterval () {
      const start = new Date(this.startIns).getTime()
      const end = new Date(this.endIns).getTime()
      this.intervalDate = (end - start) / (1000 * 3600 * 24)
    },
    changeCountry () {
      document.querySelector('.v-autocomplete__content').style.display = 'none'
    },
    submit () {
      if (!this.terms) {
        return false
      }
      const user = this.$store.getters.user
      const data = { ...this.choosed }
      this.$store.dispatch('confirm/calc', { calc: 'travel', user, data })
    }
  },

  head () {
    return {
      title: 'Калькулятор для расчета стоимости полиса'
    }
  }
}
</script>
