<script setup>
import { ref } from 'vue';
import { storeToRefs } from 'pinia';
import { useRouter } from 'vue-router';
import { useUserStore } from '@stores/userStore';
import { useField, useForm } from 'vee-validate';
import { object as yupObject, string as yupString, ref as yupRef } from 'yup';
import eInput from '@elements/e-input/e-input.vue';
import eButton from '@elements/e-button/e-button.vue';
import env from '@helpers/env';

const userStore = useUserStore();
const { errors: apiErrors } = storeToRefs(useUserStore());
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
  await userStore.registerUser(values);

  if (apiErrors.value.length !== 0) {
    apiErrors.value.forEach((error) => {
      setFieldError(error.field, 'serverErrors.' + error.message);
    });
  } else {
    router.push({ name: 'home' });
  }
});

const { value: name } = useField('name');
const { value: email } = useField('email');
const { value: password } = useField('password');
const { value: passwordConfirm } = useField('passwordConfirm');

const disableRegister = ref(env.getItem('VITE_DISABLE_REGISTER') === 'false');
</script>

<template>
  <div class="section">
    <h1 class="title has-text-centered">{{ $t('register.title') }}</h1>
    <div class="columns is-centered">
      <div class="column is-4">
        <form v-if="disableRegister" novalidate @submit="onSubmit">
          <e-input
            id="name"
            v-model="name"
            :error-message="errors.name"
            autocomplete="username"
            label="register.form.name.label"
            icon-left="fa-solid fa-user"
          />
          <e-input
            id="email"
            v-model="email"
            :error-message="errors.email"
            type="email"
            autocomplete="email"
            label="register.form.email.label"
            icon-left="fa-solid fa-envelope"
          />
          <e-input
            id="password"
            v-model="password"
            :error-message="errors.password"
            type="password"
            label="register.form.password.label"
            icon-left="fa-solid fa-key"
          />
          <e-input
            id="passwordConfirm"
            v-model="passwordConfirm"
            :error-message="errors.passwordConfirm"
            type="password"
            label="register.form.passwordConfirm.label"
            icon-left="fa-solid fa-key"
          />
          <div class="field is-grouped is-grouped-centered pt-3">
            <e-button type="submit">
              {{ $t('register.form.button') }}
            </e-button>
            <e-button type="button" layout="text" @click="router.push({ name: 'home' })">
              {{ $t('login.form.button') }}
            </e-button>
          </div>
        </form>
        <div v-else>
          {{ $t('register.disallow') }}
        </div>
      </div>
    </div>
  </div>
</template>
