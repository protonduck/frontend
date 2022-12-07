<script setup>
import { ref } from 'vue';
import { useBoardStore } from '@stores/boardStore';
import { useField, useForm } from 'vee-validate';
import { object, string } from 'yup';
import apiClient from '@/apiClient';
import mModal from '@modules/m-modal/m-modal.vue';
import eButton from '@elements/e-button/e-button.vue';
import eInput from '@elements/e-input/e-input.vue';

const boardStore = useBoardStore();

const validationSchema = object().shape({
  name: string().required('addBoard.form.name.error.required'),
});

const { handleSubmit, errors, setFieldError } = useForm({ validationSchema });

const addBoard = handleSubmit(async (values, { resetForm }) => {
  await apiClient
    .addBoard(values)
    .then((response) => {
      boardStore.addBoard(response.data);
    })
    .catch((err) => {
      if (err.response.data) {
        err.response.data.forEach((error) => {
          setFieldError(error.field, 'serverErrors.' + error.message);
        });
      }
    });

  resetForm();

  showModal.value = false;
});

const { value: name } = useField('name');

let showModal = ref(false);
</script>

<template>
  <a :title="$t('addBoard.form.button.add')" @click="showModal = true">
    <span class="icon">
      <font-awesome-icon icon="fa-solid fa-plus" />
    </span>
  </a>

  <m-modal v-model="showModal" @cancel="showModal = false">
    <template v-slot:title>
      {{ $t('addBoard.title') }}
    </template>
    <template v-slot:content>
      <form @submit.prevent="addBoard()" novalidate>
        <e-input v-model="name" :errorMessage="errors.name" id="name" label="addBoard.form.name.label" />
        <e-button type="submit">
          {{ $t('addBoard.form.button.save') }}
        </e-button>
      </form>
    </template>
  </m-modal>
</template>
