<script setup>
import { storeToRefs } from 'pinia';
import { useRouter } from 'vue-router';
import { useUserStore } from '@stores/userStore';
import { useField, useForm } from 'vee-validate';
import { object, string } from 'yup';
import eInput from '@elements/e-input/e-input.vue';
import eButton from '@elements/e-button/e-button.vue';

const userStore = useUserStore();
const router = useRouter();

const { errors: apiErrors } = storeToRefs(useUserStore());

const validationSchema = object().shape({
  email: string().required('login.form.email.error.required').email('login.form.email.error.required'),
  password: string().required('login.form.password.error.required').min(6),
});

const { handleSubmit, errors, setFieldError } = useForm({ validationSchema });

const onSubmit = handleSubmit(async (values) => {
  await userStore.loginUser(values);

  if (apiErrors.value.length !== 0) {
    apiErrors.value.forEach((error) => {
      setFieldError(error.field, 'serverErrors.' + error.message);
    });
  } else {
    router.push({ name: 'home' });
  }
});

const { value: email } = useField('email');
const { value: password } = useField('password');
</script>

<template>
  <div class="section">
    <h1 class="title has-text-centered">{{ $t('login.title') }}</h1>
    <div class="columns is-centered">
      <div class="column is-4">
        <form novalidate @submit="onSubmit">
          <e-input
            id="email"
            v-model="email"
            :error-message="errors.email"
            type="email"
            autocomplete="email"
            label="login.form.email.label"
            icon-left="fa-solid fa-envelope"
          />
          <e-input
            id="password"
            v-model="password"
            :error-message="errors.password"
            type="password"
            label="login.form.password.label"
            icon-left="fa-solid fa-key"
          />
          <div class="field is-grouped is-grouped-centered pt-3">
            <e-button type="submit">
              {{ $t('login.form.button') }}
            </e-button>
            <e-button type="button" layout="text" @click="router.push({ name: 'register' })">
              {{ $t('register.form.button') }}
            </e-button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
