<template>
  <div>
    <h1 data-testid="login_header">
      {{ $t('menu.login') }}
    </h1>
    <div v-if="responseErrors.length > 0">
      <div v-for="(error, index) in responseErrors" :key="index" class="alert alert-danger">
        <span v-if="error.message === 'incorrect_login_password'">
          {{ $t('error.incorrect_login_password') }}
        </span>
        <span v-else>
          {{ error.message }}
        </span>
      </div>
    </div>
    <form @submit.prevent="login" novalidate>

      <PDInput
        id="email"
        type="email"
        :vObj="$v.email"
        data-test-id="login_form_input_email"
        autocomplete="email"
        :label-text="$t('form.email')"
        label-data-test-id="login_form_label_email"
        container-class="col-sm-3"
      >
        <template #error>
          <template v-for="(validator, validatorName, index) in $v.email.$params">
            <div
              v-if="!$v.email[validatorName]"
              :key="index"
              v-t="validator && validator.message ? validator.message : validator"
              class="invalid-feedback"
            />
          </template>
        </template>
      </PDInput>

      <PDInput
        id="password"
        type="password"
        :vObj="$v.password"
        data-test-id="login_form_input_password"
        autocomplete="current-password"
        :label-text="$t('form.password')"
        label-data-test-id="login_form_label_password"
        container-class="col-sm-3"
      >
        <template #error>
          <template v-for="(validator, validatorName, index) in $v.password.$params">
            <div
              v-if="!$v.password[validatorName]"
              :key="index"
              v-t="validator && validator.message ? validator.message : validator"
              class="invalid-feedback"
            />
          </template>
        </template>
      </PDInput>

      <button
        class="btn btn-success"
        data-testid="login_form_button_login"
        type="submit"
      >
        {{ $t('menu.login') }}
      </button>
    </form>
  </div>
</template>

<script>
import {
  required,
  email,
  helpers,
} from 'vuelidate/lib/validators';

export default {
  data() {
    return {
      email: '',
      password: '',
      responseErrors: [],
    };
  },
  methods: {
    login() {
      this.$v.$touch();

      if (this.$v.$invalid) {
        return;
      }

      this.$store.dispatch('login', {
        email: this.email,
        password: this.password,
      })
        .then(() => {
          this.$router.push('/');
        })
        .catch((err) => {
          if (err.response.status === 422) {
            this.responseErrors = err.response.data;
          }
        });
    },
  },
  validations: {
    email: {
      required: helpers.withParams({ message: 'error.required' }, required),
      email: helpers.withParams({ message: 'error.email_invalid' }, email),
    },
    password: {
      required: helpers.withParams({ message: 'error.required' }, required),
    },
  },
  created() {
    // Reset validation
    this.$v.$reset();
  },
};
</script>
