<template>
  <v-layout justify-center>
    <v-form class="form cabinet__settings" @submit.prevent="submit">
      <v-text-field
        v-model="name"
        label="ФИО"
        required
        :error-messages="nameErrors"
        @input="$v.name.$touch()"
        @blur="$v.name.$touch()"
      />

      <v-text-field
        v-model="password"
        :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
        :type="show1 ? 'text' : 'password'"
        label="Старый Пароль"
        required
        :error-messages="passwordErrors"
        @click:append="show1 = !show1"
        @input="$v.password.$touch()"
        @blur="$v.password.$touch()"
      />

      <v-text-field
        v-model="newPassword"
        :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
        :type="show1 ? 'text' : 'password'"
        label="Новый Пароль"
        required
        :error-messages="newPasswordErrors"
        @click:append="show1 = !show1"
        @input="$v.newPassword.$touch()"
        @blur="$v.newPassword.$touch()"
      />

      <div class="text-center my-5">
        <v-btn rounded color="success" type="submit">
          Сохранить изменения
        </v-btn>
      </div>
    </v-form>
  </v-layout>
</template>

<script>
import { validationMixin } from 'vuelidate'
import { required } from 'vuelidate/lib/validators'

export default {
  mixins: [validationMixin],
  validations: {
    name: { required },
    password: { required },
    newPassword: { required }
  },
  layout: 'cabinet',
  data: () => ({
    password: '',
    newPassword: '',
    show1: false
  }),

  computed: {
    name () {
      return this.$store.getters['user'].name
    },
    nameErrors () {
      const errors = []
      if (!this.$v.name.$dirty) {
        return errors
      }
      !this.$v.name.required && errors.push('')
      return errors
    },
    passwordErrors () {
      const errors = []
      if (!this.$v.password.$dirty) {
        return errors
      }
      !this.$v.password.required && errors.push('')
      return errors
    },
    newPasswordErrors () {
      const errors = []
      if (!this.$v.newPassword.$dirty) {
        return errors
      }
      !this.$v.newPassword.required && errors.push('')
      return errors
    }
  },

  methods: {
    submit () {
      if (this.$v.$invalid) {
        this.$v.$touch()
        return false
      }
      let user = {
        name: this.name,
        password: this.password
      }
      console.log(user);
    }
  },
}
</script>
