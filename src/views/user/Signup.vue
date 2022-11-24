<template>
  <div>
    <h1>
      {{ $t('menu.signup') }}
    </h1>
    <div v-if="responseErrors.length > 0">
      <div v-for="(error, index) in responseErrors" :key="index" class="alert alert-danger">
        <span v-if="error.message === 'email_not_unique'">
          {{ $t('error.email_not_unique') }}
        </span>
        <span v-else>
          {{ error.message }}
        </span>
      </div>
    </div>
    <form @submit.prevent="register" novalidate>
      <e-input
        id="name"
        :label-text="$t('form.username')"
        :v-obj="$v.name"
        autocomplete="username"
        data-test-id="signup_form_input_username"
        label-data-test-id="signup_form_label_username"
      />

      <e-input
        id="email"
        :label-text="$t('form.email')"
        :v-obj="$v.email"
        autocomplete="email"
        data-test-id="signup_form_input_email"
        label-data-test-id="signup_form_label_email"
        type="email"
      />

      <e-input
        id="password"
        :label-text="$t('form.password')"
        :v-obj="$v.password"
        autocomplete="new-password"
        data-test-id="signup_form_input_password"
        label-data-test-id="signup_form_label_password"
        type="password"
      />

      <e-input
        id="password-confirm"
        :label-text="$t('form.passwordConfirm')"
        :v-obj="$v.password_confirmation"
        autocomplete="off"
        data-test-id="signup_form_input_password_confirmation"
        label-data-test-id="signup_form_label_password_confirmation"
        type="password"
      />

      <button class="btn btn-success" type="submit">
        {{ $t('menu.signup') }}
      </button>
    </form>
  </div>
</template>

<script>
import { email, helpers, maxLength, minLength, required } from 'vuelidate/lib/validators';
import eInput from '@/components/Elements/e-input/e-input.vue';

export default {
  data() {
    return {
      name: '',
      email: '',
      password: '',
      password_confirmation: '',
      is_admin: null,
      responseErrors: []
    };
  },
  components: {
    eInput
  },
  methods: {
    register() {
      this.$v.$touch();

      if (this.$v.$invalid) {
        return;
      }

      const data = {
        name: this.name,
        email: this.email,
        password: this.password,
        is_admin: this.is_admin
      };

      this.$store
        .dispatch('auth', {
          url: '/user/signup',
          data
        })
        .then(() => this.$router.push('/'))
        .catch((err) => {
          if (err.response.status === 422) {
            this.responseErrors = err.response.data;
          }
        });
    }
  },
  validations: {
    name: {
      required: helpers.withParams({ message: 'error.required' }, required)
    },
    email: {
      required: helpers.withParams({ message: 'error.required' }, required),
      email: helpers.withParams({ message: 'error.email_invalid' }, email)
    },
    password: {
      required: helpers.withParams({ message: 'error.required' }, required),
      minLength: helpers.withParams({ message: { path: 'error.tooShort', args: { min: 6 } } }, minLength(6)),
      maxLength: helpers.withParams({ message: { path: 'error.tooLong', args: { max: 100 } } }, maxLength(100))
    },
    password_confirmation: {
      required: helpers.withParams({ message: 'error.required' }, required),
      minLength: helpers.withParams({ message: { path: 'error.tooShort', args: { min: 6 } } }, minLength(6)),
      maxLength: helpers.withParams({ message: { path: 'error.tooLong', args: { max: 100 } } }, maxLength(100))
    }
  },
  created() {
    // Reset validation
    this.$v.$reset();
  }
};
</script>
