<template>
  <div>
    <h1 data-testid="signup_header">
      {{ $t('menu.signup') }}
    </h1>
    <form @submit.prevent="register">
      <div class="form-group">
        <label
          for="name"
          data-testid="signup_form_label_username"
        >
          {{ $t('form.username') }}
        </label>
        <input
          id="name"
          type="text"
          class="form-control"
          v-model="name"
          required
          autofocus
          data-testid="signup_form_input_username"
        />
      </div>
      <div class="form-group">
        <label
          for="email"
          data-testid="signup_form_label_email"
        >
          {{ $t('form.email') }}
        </label>
        <input
          id="email"
          type="email"
          class="form-control"
          v-model="email"
          required
          data-testid="signup_form_input_email"
        />
      </div>
      <div class="form-group">
        <label
          for="password"
          data-testid="signup_form_label_password"
        >
          {{ $t('form.password') }}
        </label>
        <input
          id="password"
          type="password"
          class="form-control"
          v-model="password"
          required
          data-testid="signup_form_input_password"
        />
      </div>
      <div class="form-group">
        <label
          for="password-confirm"
          data-testid="signup_form_label_password_confirmation"
        >
          {{ $t('form.passwordConfirm') }}
        </label>
        <input
          id="password-confirm"
          type="password"
          class="form-control"
          v-model="password_confirmation"
          required
          data-testid="signup_form_input_password_confirmation"
        />
      </div>
      <button
        type="submit"
        class="btn btn-success"
        data-testid="signup_form_button_signup"
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
      name: "",
      email: "",
      password: "",
      password_confirmation: "",
      is_admin: null,
    }
  },
  methods: {
    register: function () {
      let data = {
        name: this.name,
        email: this.email,
        password: this.password,
        is_admin: this.is_admin,
      }
      this.$store.dispatch('register', data)
        .then(() => this.$router.push('/'))
        .catch(err => console.log(err))
    },
  },
}
</script>
