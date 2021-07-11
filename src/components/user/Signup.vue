<template>
  <div>
    <h1 data-testid="signup_header">
      {{ $t('menu.signup') }}
    </h1>
    <form @submit.prevent="register">
      <div class="form-group">
        <label
          data-testid="signup_form_label_username"
          for="name"
        >
          {{ $t('form.username') }}
        </label>
        <input
          id="name"
          v-model="name"
          autofocus
          class="form-control"
          data-testid="signup_form_input_username"
          required
          type="text"
        />
      </div>
      <div class="form-group">
        <label
          data-testid="signup_form_label_email"
          for="email"
        >
          {{ $t('form.email') }}
        </label>
        <input
          id="email"
          v-model="email"
          class="form-control"
          data-testid="signup_form_input_email"
          required
          type="email"
        />
      </div>
      <div class="form-group">
        <label
          data-testid="signup_form_label_password"
          for="password"
        >
          {{ $t('form.password') }}
        </label>
        <input
          id="password"
          v-model="password"
          class="form-control"
          data-testid="signup_form_input_password"
          required
          type="password"
        />
      </div>
      <div class="form-group">
        <label
          data-testid="signup_form_label_password_confirmation"
          for="password-confirm"
        >
          {{ $t('form.passwordConfirm') }}
        </label>
        <input
          id="password-confirm"
          v-model="password_confirmation"
          class="form-control"
          data-testid="signup_form_input_password_confirmation"
          required
          type="password"
        />
      </div>
      <button
        class="btn btn-success"
        data-testid="signup_form_button_signup"
        type="submit"
      >
        {{ $t('menu.signup') }}
      </button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: '',
      email: '',
      password: '',
      password_confirmation: '',
      is_admin: null,
    };
  },
  methods: {
    register() {
      const data = {
        name: this.name,
        email: this.email,
        password: this.password,
        is_admin: this.is_admin,
      };
      this.$store.dispatch('register', data)
        .then(() => this.$router.push('/'))
        .catch((err) => console.log(err));
    },
  },
};
</script>
