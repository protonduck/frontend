<template>
  <div>
    <h1 data-testid="login_header">
      {{ $t('menu.login') }}
    </h1>
    <div v-if="responseErrors.length > 0">
      <div v-for="(error, index) in responseErrors" :key="index" class="alert alert-danger">
        <span v-if="error.message === 'email_invalid'">{{ $t('error.email_invalid') }}</span>
        <span v-if="error.message === 'incorrect_login_password'">
          {{ $t('error.incorrect_login_password') }}
        </span>
      </div>
    </div>
    <form @submit.prevent="login" novalidate>
      <div class="form-group">
        <label
          data-testid="login_form_label_email"
          for="email"
        >
          {{ $t('form.email') }}
        </label>
        <div class="col-sm-3">
          <input
            id="email"
            v-model.trim="$v.email.$model"
            class="form-control"
            data-testid="login_form_input_email"
            type="email"
            :class="validationCssClass($v.email)"
            autocomplete="email"
          />
          <template v-for="(validator, validatorName, index) in $v.email.$params">
            <div
              v-if="!$v.email[validatorName]"
              :key="index"
              v-t="validator && validator.message ? validator.message : validator"
              class="invalid-feedback"
            />
          </template>
        </div>
      </div>
      <div class="form-group">
        <label
          data-testid="login_form_label_password"
          for="password"
        >
          {{ $t('form.password') }}
        </label>
        <div class="col-sm-3">
          <input
            id="password"
            v-model.trim="$v.password.$model"
            class="form-control"
            data-testid="login_form_input_password"
            type="password"
            :class="validationCssClass($v.password)"
            autocomplete="current-password"
          />
          <template v-for="(validator, validatorName, index) in $v.password.$params">
            <div
              v-if="!$v.password[validatorName]"
              :key="index"
              v-t="validator && validator.message ? validator.message : validator"
              class="invalid-feedback"
            />
          </template>
        </div>
      </div>
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
    validationCssClass(validation) {
      return {
        'is-valid': !validation.$error && validation.$dirty,
        'is-invalid': validation.$error,
      };
    },
  },
  validations: {
    email: {
      required: helpers.withParams({ message: 'error.required' }, required),
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
