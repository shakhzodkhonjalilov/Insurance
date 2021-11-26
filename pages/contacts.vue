<template>
  <section class="page bg-grey">
    <v-container>
      <h1 class="title_">Контакты</h1>

      <div class="map d-flex justify-center">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1260.0215460009415!2d69.23737108956448!3d41.31205760484796!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38ae8ba72319fe35%3A0x13c479f0c40c00e7!2z0JDRgdGB0L7RhtC40LDRhtC40Y8g0LHQsNC90LrQvtCyINCj0LfQsdC10LrQuNGB0YLQsNC90LA!5e0!3m2!1sru!2s!4v1584530838400!5m2!1sru!2s"
          width="100%"
          height="450"
          frameborder="0"
          style="border:0;"
          allowfullscreen
          aria-hidden="false"
          tabindex="0"
        />
      </div>

      <v-row justify="center" class="mt-5">
        <v-col sm="4" cols="12" order="2" order-sm="1">
          <div class="headline text-center mb-4">Свяжитесь с нами</div>
          <v-form @submit.prevent="submit">
            <v-text-field
              v-model="name"
              :error-messages="nameErrors"
              label="Ваше Имя"
              required
              solo
              rounded
              @input="$v.name.$touch()"
              @blur="$v.name.$touch()"
            />
            <v-text-field
              v-model="email"
              :error-messages="emailErrors"
              label="Ваше Email"
              type="email"
              required
              solo
              rounded
              @blur="$v.email.$touch()"
            />
            <v-textarea
              v-model="message"
              :error-messages="messageErrors"
              label="Сообщение"
              required
              auto-grow
              solo
              rounded
              @input="$v.message.$touch()"
              @blur="$v.message.$touch()"
            />

            <v-btn type="submit" block rounded color="success">Отправить</v-btn>
          </v-form>
        </v-col>
        <v-col sm="5" cols="12" order="1" order-sm="2">
          <div class="contact__info">
            <div class="headline text-center mb-4">Адреса ООО МСК «IShONCh»</div>

            <ul>
              <li v-for="(item, i) in address" :key="i">{{ item }}</li>
            </ul>
          </div>
        </v-col>
      </v-row>

      <v-dialog v-model="success" max-width="500px">
        <div style="background: #fff">
          <v-alert
            dense
            text
            type="success"
            class="mb-0"
          >Спасибо за заявку в скором времени оператор свзяжется с вами</v-alert>
        </div>
      </v-dialog>
    </v-container>
  </section>
</template>

<script>
import { validationMixin } from "vuelidate";
import { required, email } from "vuelidate/lib/validators";
export default {
  mixins: [validationMixin],
  validations: {
    name: { required },
    email: { required, email },
    message: { required },
  },
  data() {
    return {
      name: null,
      email: null,
      message: null,
      success: false,
      address: [
        "Республика Узбекистан, город Ташкент, улица Коратош, дом 1.",
        "Телефон: (+998 71) 238-69-55",
        "Факс: (+998 71) 238-69-75",
        "E-mail: info@ishonch-msk.uz",
      ],
    };
  },

  computed: {
    nameErrors() {
      const errors = [];
      if (!this.$v.name.$dirty) {
        return errors;
      }
      !this.$v.name.required && errors.push("");
      return errors;
    },
    emailErrors() {
      const errors = [];
      if (!this.$v.email.$dirty) {
        return errors;
      }
      !this.$v.email.email && errors.push("");
      !this.$v.email.required && errors.push("");
      return errors;
    },
    messageErrors() {
      const errors = [];
      if (!this.$v.message.$dirty) {
        return errors;
      }
      !this.$v.message.required && errors.push("");
      return errors;
    },
  },
  methods: {
    submit() {
      if (this.$v.$invalid) {
        this.$v.$touch();
        return false;
      }
      const data = {
        name: this.name,
        email: this.email,
        message: this.message,
      };
      this.$axios.post("requests/insert", data).then((res) => {
        this.success = true;
        this.name = "";
        this.email = "";
        this.message = "";
        setTimeout(() => {
          this.success = false;
        }, 3000);
      });
    },
  },
  head() {
    return {
      title:
        "Контакты компании «Узбекинвест»: адрес, телефон, e-mail, местоположение и другие контактные данные на сайте msk-ishonch.uz",
      meta: [
        {
          hid: "description",
          name: "description",
          content:
            "Контакты страховой компании «ISHONCH». На данной странице представлен подробный перечень контактов компании «ISHONCH» включая адрес, местоположение, телефонные номера, адрес электронной почты, время работы, форма обратной связи и другая контактная информация.",
        },
        {
          name: "keywords",
          content:
            "Msk-ishonch.uz контакты, Msk-ishonch.Uz контактная информация, Msk-ishonch.Uz телефон, Msk-ishonch.Uz адрес, Msk-ishonch.Uz местоположение, Msk-ishonch.Uz улица, Msk-ishonch.Uz дом, Msk-ishonch.Uz район, Msk-ishonch.Uz город, IShONCh контакты, IShONCh контактная информация",
        },
      ],
    };
  },
};
</script>
