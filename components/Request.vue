<template>
  <div>
    <div class="callback">
      <v-btn @click.stop="dialog = true" text>
        <v-icon class="white--text callback__icon">mdi-phone</v-icon>Обратный звонок
      </v-btn>
    </div>

    <v-dialog v-model="dialog" max-width="400px">
      <v-form @submit.prevent="submit" class="form modal__form">
        <div class="modal__form-header">
          <strong>Онлайн заявка</strong>
          <v-btn icon @click="dialog = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </div>
        <hr />
        <v-text-field
          v-model="name"
          label="Ваше Имя"
          :error-messages="nameErrors"
          required
          @input="$v.name.$touch()"
          @blur="$v.name.$touch()"
        />
        <v-text-field
          v-model="number"
          label="Номер телефона"
          :error-messages="numberErrors"
          required
          @input="$v.number.$touch()"
          @blur="$v.number.$touch()"
        />
        <div class="text-center">
          <v-btn rounded color="success" type="submit">Отправить</v-btn>
        </div>
      </v-form>
    </v-dialog>

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
  </div>
</template>

<script>
import { validationMixin } from "vuelidate";
import { required } from "vuelidate/lib/validators";

export default {
  mixins: [validationMixin],
  validations: {
    number: { required },
    name: { required },
  },
  data() {
    return {
      name: "",
      number: "",
      dialog: false,
      success: false,
    };
  },
  methods: {
    submit() {
      if (this.$v.$invalid) {
        this.$v.$touch();
        return false;
      }
      let data = {
        name: this.name,
        phone: this.number,
      };
      this.$axios.post(`requests/insert`, data).then((res) => {
        this.success = true;
        this.name = "";
        this.number = "";
        setTimeout(() => {
          this.success = false;
        }, 3000);
      });
      this.dialog = false;
    },
  },
  computed: {
    numberErrors() {
      const errors = [];
      if (!this.$v.number.$dirty) {
        return errors;
      }
      !this.$v.number.required && errors.push("");
      return errors;
    },
    nameErrors() {
      const errors = [];
      if (!this.$v.name.$dirty) {
        return errors;
      }
      !this.$v.name.required && errors.push("");
      return errors;
    },
  },
};
</script>
