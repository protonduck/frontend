<template>
  <div>
    <h1 data-testid="login_header">
      {{ $t('menu.login') }}
    </h1>
    <form @submit.prevent="login">
      <div class="form-group">
        <label
          data-testid="login_form_label_email"
          for="email"
        >
          {{ $t('form.email') }}
        </label>
        <input
          id="email"
          v-model="email"
          :placeholder="$t('form.email')"
          class="form-control"
          data-testid="login_form_input_email"
          required
          type="email"
        />
      </div>
      <div class="form-group">
        <label
          data-testid="login_form_label_password"
          for="password"
        >
          {{ $t('form.password') }}
        </label>
        <input
          id="password"
          v-model="password" :placeholder="$t('form.password')"
          class="form-control"
          data-testid="login_form_input_password"
          required
          type="password"
        />
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
export default {
  data() {
    return {
      email: '',
      password: '',
    };
  },
  methods: {
    login() {
      const { email } = this;
      const { password } = this;
      this.$store.dispatch('login', { email, password })
        .then(() => this.$router.push('/'))
        .catch((err) => console.log(err));
    },
  },
};
</script>
