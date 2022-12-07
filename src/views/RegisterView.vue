<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useUserStore } from '@stores/userStore';
import { useField, useForm } from 'vee-validate';
import { object as yupObject, string as yupString, ref as yupRef } from 'yup';
import eInput from '@elements/e-input/e-input.vue';
import eButton from '@elements/e-button/e-button.vue';
import apiClient from '@/apiClient';
import storage from '@plugins/storage';
import env from '@plugins/helper/env';

const userStore = useUserStore();
const router = useRouter();

const validationSchema = yupObject().shape({
  name: yupString().required('register.form.name.error.required'),
  email: yupString().required('register.form.email.error.required').email('register.form.email.error.required'),
  password: yupString().required('register.form.password.error.required').min(6),
  passwordConfirm: yupString()
    .required('register.form.password.error.required')
    .oneOf([yupRef('password')], 'register.form.passwordConfirm.error.notMatch'),
});

const { handleSubmit, errors, setFieldError } = useForm({ validationSchema });

const onSubmit = handleSubmit(async (values) => {
  await apiClient
    .registerUser(values)
    .then((response) => {
      userStore.user = response.data;
      userStore.token = response.data.api_key;

      storage.setItem('user', response.data, true);
      storage.setItem('authToken', response.data.api_key);

      router.push('/');
    })
    .catch((err) => {
      if (err.response.data) {
        err.response.data.forEach((error) => {
          if (['email_invalid', 'email_not_unique'].includes(error.message)) {
            setFieldError(error.field, 'serverErrors.' + error.message);
          }
        });
      }
    });
});

const { value: name } = useField('name');
const { value: email } = useField('email');
const { value: password } = useField('password');
const { value: passwordConfirm } = useField('passwordConfirm');

const disableRegister = ref(env.getItem('VITE_DISABLE_REGISTER') === 'false');
</script>

<template>
  <div class="box">
    <h1 class="title">{{ $t('register.title') }}</h1>
    <form v-if="disableRegister" @submit="onSubmit" novalidate>
      <e-input
        v-model="name"
        :errorMessage="errors.name"
        id="name"
        autocomplete="username"
        label="register.form.name.label"
        icon-left="fa-solid fa-user"
      />
      <e-input
        v-model="email"
        :errorMessage="errors.email"
        id="email"
        type="email"
        autocomplete="email"
        label="register.form.email.label"
        icon-left="fa-solid fa-envelope"
      />
      <e-input
        v-model="password"
        :errorMessage="errors.password"
        id="password"
        type="password"
        label="register.form.password.label"
        icon-left="fa-solid fa-key"
      />
      <e-input
        v-model="passwordConfirm"
        :errorMessage="errors.passwordConfirm"
        id="passwordConfirm"
        type="password"
        label="register.form.passwordConfirm.label"
        icon-left="fa-solid fa-key"
      />
      <div class="field is-grouped">
        <e-button type="submit">
          {{ $t('register.form.button') }}
        </e-button>
        <e-button type="button" layout="text" @click="router.push('/login')">
          {{ $t('login.form.button') }}
        </e-button>
      </div>
    </form>
    <div v-else>{{ $t('register.disallow') }}</div>
  </div>
</template>
