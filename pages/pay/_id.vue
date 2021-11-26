<template>
  <v-layout class="page">
    <v-container>
      <v-alert
        outlined
        type="success"
        text
        class="text-center"
      >
        Оплата проведена успешна<br>
        В скором времени диспечер вам перезвонит
      </v-alert>
    </v-container>
  </v-layout>
</template>

<script>
  export default {
    // middleware: ['payment'],
    data() {
      return {
        address: ''
      }
    },
    mounted () {
      // const conf = {
      //   header: {
      //     "X-Auth": "59b62f764e4319d92565bd98",
      //     "Authorization": "Basic TG9naW46UGFzcw==59b62f764e4319d92565bd98"
      //   }
      // }
      // this.$axios.post('https://checkout.paycom.uz/api', {
      //   "method" : "CheckTransaction",
      //   "params" : {
      //     "id" : this.$route.params.id
      //   }
      // }).then(res => {
      //   console.log(res);
      // })
    }
  }

</script>
