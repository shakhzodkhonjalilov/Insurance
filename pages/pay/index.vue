<template>
  <v-layout class="page">
    <v-container>
      <h1 class="text-center">Сумма {{ polis }}</h1>

      <div class="text-center mb-8">Выберите способ оплаты</div>
      <v-row>
        <v-col>
          <form
            method="POST"
            action="https://checkout.paycom.uz"
            class="d-flex justify-center"
          >
            <input
              type="hidden"
              name="merchant"
              value="5fd9a06f6f948a685be09e43"
            />
            <input type="hidden" name="amount" :value="price" />
            <input type="hidden" name="account[Shakhzod]" :value="order" />
            <input
              type="hidden"
              name="callback"
              value="https://msk-ishonch.uz/pay/:transaction"
            />
            <input type="hidden" name="callback_timeout" value="5000" />
            <button
              type="submit"
              style="
                cursor: pointer;
                border: 1px solid #ebebeb;
                border-radius: 6px;
                background: linear-gradient(to top, #f1f2f2, white);
                width: 200px;
                height: 42px;
                display: flex;
                align-items: center;
                justify-content: center;
              "
            >
              <img
                style="width: 160px; height: 20px"
                src="http://cdn.payme.uz/buttons/button_big_RU.svg"
              />
            </button>
          </form>
        </v-col>

        <v-col class="text-center">
          <v-btn outlined color="primary" @click="cash">Наличные</v-btn>
        </v-col>

        <v-col></v-col>
      </v-row>

      <v-dialog v-model="success" max-width="500px">
        <div style="background: #fff">
          <v-alert dense text type="success" class="mb-0 text-center">
            Спасибо за заявку!
            <br />Наш оператор свяжется с вами в ближайшие время
          </v-alert>
        </div>
      </v-dialog>
    </v-container>
  </v-layout>
</template>

<script>
export default {
  middleware: ["payment"],
  data() {
    return {
      success: false,
    };
  },
  computed: {
    price() {
      return this.$store.getters["payment"];
    },
    order() {
      return this.$store.getters["order_id"];
    },
    doc_id() {
      return this.$store.getters["doc_id"];
    },
    polis() {
      let sum = this.$store.getters["payment"] / 100;
      let price = sum
        .toString()
        .split("")
        .reverse()
        .map((item, index) => {
          if (index % 3 == 0) {
            return (item += " ");
          }
          return item;
        });
      return price.reverse().join("") + "сум";
    },
  },
  methods: {
    cash() {
      const token = this.$store.getters["user"].access_token;
      this.$axios({
        method: "POST",
        url: `doc/nal?id=${this.doc_id}`,
        headers: { Authorization: `Bearer ${token}` },
      }).then((res) => {
        this.success = true;
        setTimeout(() => {
          this.$router.push("/");
        }, 3000);
      });
    },
  },
};
</script>
