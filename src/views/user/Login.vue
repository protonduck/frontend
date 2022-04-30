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
      <e-input
        id="email"
        :label-text="$t('form.email')"
        :v-obj="$v.email"
        :errors="responseErrors"
        autocomplete="email"
        data-test-id="login_form_input_email"
        label-data-test-id="login_form_label_email"
        type="email"
      />

      <e-input
        id="password"
        :label-text="$t('form.password')"
        :v-obj="$v.password"
        :errors="responseErrors"
        autocomplete="current-password"
        data-test-id="login_form_input_password"
        label-data-test-id="login_form_label_password"
        type="password"
      />

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
import eInput from '@/components/Elements/e-input/e-input.vue';

export default {
  data() {
    return {
      email: '',
      password: '',
      responseErrors: [],
    };
  },
  components: {
    eInput,
  },
  methods: {
    login() {
      this.$v.$touch();

      if (this.$v.$invalid) {
        return;
      }

      this.$store.dispatch('auth', {
        url: '/user/login',
        data: {
          email: this.email,
          password: this.password,
        },
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
