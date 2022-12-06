<script setup>
  import { useRouter } from 'vue-router';
  import { useUserStore } from '@stores/userStore';
  import { useField, useForm } from 'vee-validate';
  import { object, string } from 'yup';
  import eInput from '@elements/e-input/e-input.vue';
  import eButton from '@elements/e-button/e-button.vue';
  import apiClient from "@/apiClient";

  const userStore = useUserStore();
  const router = useRouter();

  const validationSchema = object().shape({
    email:
      string()
      .required('views.login.form.email.error.required')
      .email('views.login.form.email.error.required'),
    password:
      string()
      .required('views.login.form.password.error.required')
      .min(6),
  });

  const { handleSubmit, errors } = useForm({ validationSchema });

  const onSubmit = handleSubmit(async (values) => {
    await apiClient.loginUser(values).then((response) => {
      if (response.status === 200 && response.data) {
        userStore.user = response.data;
        userStore.token = response.data.api_key;
        
        localStorage.setItem('user', JSON.stringify(response.data));
        localStorage.setItem('authToken', response.data.api_key);

        router.push('/');
      }
    }).catch(err => {
      // TODO handle server error
      // https://vee-validate.logaretm.com/v4/guide/composition-api/handling-forms#setting-errors-manually
      // console.log('Server errors: ', err);
    });
  });

  const { value: email } = useField('email')
  const { value: password } = useField('password')
</script>

<template>
  <div class="box">
    <h1 class="title">{{ $t('views.login.title') }}</h1>
    <form @submit="onSubmit" novalidate>
      <e-input v-model="email" :errorMessage="errors.email" id="email" type="email" autocomplete="email" label="views.login.form.email.label" icon-left="fa-solid fa-envelope" />
      <e-input v-model="password" :errorMessage="errors.password" id="password" type="password" label="views.login.form.password.label" icon-left="fa-solid fa-key" />
      <e-button type="submit">{{ $t('views.login.title') }}</e-button>
    </form>
  </div>
</template>
