<script setup>
  import { reactive } from 'vue';
  import { useUserStore } from '@stores/userStore';
  import { useRouter } from 'vue-router'
  import eInput from '@elements/e-input/e-input.vue';
  import eButton from '@elements/e-button/e-button.vue';
  import apiClient from "@/apiClient";

  const userStore = useUserStore();
  const router = useRouter();

  async function onSubmit() {
    let data = {
      email: email.value,
      password: password.value,
    };

    await apiClient.loginUser(data).then((response) => {
      if (response.status === 200 && response.data) {
        userStore.user = response.data;
        userStore.token = response.data.api_key;
        
        localStorage.setItem('user', JSON.stringify(response.data));
        localStorage.setItem('authToken', response.data.api_key);
      }
    }).catch(err => {
      // TODO remove in future
      // console.log(err);
    });

    router.push('/');
  }

  const form = reactive({
    email: '',
    password: '',
  });
</script>

<template>
  <div class="box">
    <h1 class="title">{{ $t('views.login.title') }}</h1>
    <form @submit.prevent="onSubmit">
      <e-input v-model="form.email" id="email" type="email" autocomplete="email" label="views.login.form.input.label" />
      
      <e-input v-model="form.password" id="password" type="password" label="views.login.form.password.label" />
      <e-button type="submit">{{ $t('views.login.title') }}</e-button>
    </form>
  </div>
</template>

<style lang="scss" scoped>
</style>
