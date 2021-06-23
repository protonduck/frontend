<template>
  <div>
    <h1 data-testid="login_header">
      {{ $t('menu.login') }}
    </h1>
    <form @submit.prevent="login">
      <div class="form-group">
        <label
          for="email"
          data-testid="login_form_label_email"
        >
          {{ $t('form.email') }}
        </label>
        <input
          id="email"
          required
          v-model="email"
          type="email"
          :placeholder="$t('form.email')"
          class="form-control"
          data-testid="login_form_input_email"
        />
      </div>
      <div class="form-group">
        <label
          for="password"
          data-testid="login_form_label_password"
        >
          {{ $t('form.password') }}
        </label>
        <input
          id="password"
          required v-model="password"
          type="password"
          :placeholder="$t('form.password')"
          class="form-control"
          data-testid="login_form_input_password"
        />
      </div>
      <button
        class="btn btn-success"
        type="submit"
        data-testid="login_form_button_login"
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
      email: "",
      password: "",
    }
  },
  methods: {
    login: function () {
      let email = this.email
      let password = this.password
      this.$store.dispatch('login', {email, password})
          .then(() => this.$router.push('/'))
          .catch(err => console.log(err))
    },
  },
}
</script>
