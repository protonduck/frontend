<script setup>
import { useRouter } from 'vue-router';
import { useUserStore } from '@stores/userStore';
import { useField, useForm } from 'vee-validate';
import { object, string } from 'yup';
import eInput from '@elements/e-input/e-input.vue';
import eButton from '@elements/e-button/e-button.vue';
import apiClient from '@/apiClient';
import storage from '@plugins/storage';

const userStore = useUserStore();
const router = useRouter();

const validationSchema = object().shape({
  email: string().required('login.form.email.error.required').email('login.form.email.error.required'),
  password: string().required('login.form.password.error.required').min(6),
});

const { handleSubmit, errors, setFieldError } = useForm({ validationSchema });

const onSubmit = handleSubmit(async (values) => {
  await apiClient
    .loginUser(values)
    .then((response) => {
      if (response.status === 200 && response.data) {
        userStore.user = response.data;
        userStore.token = response.data.api_key;

        storage.setItem('user', response.data, true);
        storage.setItem('authToken', response.data.api_key);

        router.push('/');
      }
    })
    .catch((err) => {
      if (err.response.data) {
        err.response.data.forEach((error) => {
          if (error.message === 'incorrect_login_password') {
            setFieldError(error.field, 'serverErrors.incorrect_login_password');
          }
        });
      }
    });
});

const { value: email } = useField('email');
const { value: password } = useField('password');
</script>

<template>
  <div class="box">
    <h1 class="title">{{ $t('login.title') }}</h1>
    <form @submit="onSubmit" novalidate>
      <e-input
        v-model="email"
        :errorMessage="errors.email"
        id="email"
        type="email"
        autocomplete="email"
        label="login.form.email.label"
        icon-left="fa-solid fa-envelope"
      />
      <e-input
        v-model="password"
        :errorMessage="errors.password"
        id="password"
        type="password"
        label="login.form.password.label"
        icon-left="fa-solid fa-key"
      />
      <div class="field is-grouped">
        <e-button type="submit">
          {{ $t('login.form.button') }}
        </e-button>
        <e-button type="button" layout="text" @click="router.push('/register')">
          {{ $t('register.form.button') }}
        </e-button>
      </div>
    </form>
  </div>
</template>
