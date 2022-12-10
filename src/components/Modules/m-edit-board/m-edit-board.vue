<script setup>
import { ref } from 'vue';
import { useBoardStore } from '@stores/boardStore';
import { useField, useForm, Form } from 'vee-validate';
import { object, string } from 'yup';
import apiClient from '@/apiClient';
import mModal from '@modules/m-modal/m-modal.vue';
import mSpinner from '@modules/m-spinner/m-spinner.vue';
import eButton from '@elements/e-button/e-button.vue';
import eInput from '@elements/e-input/e-input.vue';

const boardStore = useBoardStore();

// let board = computed(() => boardStore.getBoardById(boardStore.getActiveBoardId));
// console.log(board);

console.log(boardStore.getBoardById(boardStore.getActiveBoardId)?.name);

const { handleSubmit, errors, setFieldError } = useForm({
  validationSchema: object().shape({
    name: string().required('editBoard.form.name.error.required'),
  }),
  initialValues: {
    name: boardStore.getBoardById(boardStore.getActiveBoardId)?.name,
  },
});

const editBoard = handleSubmit(async (values) => {
  await apiClient
    .editBoard({ ...values, id: activeBoardId.value })
    .then((response) => {
      boardStore.editBoard(response.data);
    })
    .catch((err) => {
      if (err.response.data) {
        err.response.data.forEach((error) => {
          setFieldError(error.field, 'serverErrors.' + error.message);
        });
      }
    });

  showModal.value = false;
});

const { value: name } = useField('name');

let showModal = ref(false);
</script>

<template>
  <m-spinner :is-loading="boardStore.isLoading" />

  <a :title="$t('editBoard.form.button.edit')" @click="showModal = true">
    <span class="icon">
      <font-awesome-icon icon="fa-solid fa-pen" />
    </span>
  </a>

  <m-modal v-model="showModal" @cancel="showModal = false">
    <template v-slot:title>
      {{ $t('editBoard.title') }}
    </template>
    <template v-slot:content>
      <form @submit.prevent="editBoard()" novalidate>
        <e-input v-model="name" :errorMessage="errors.name" id="name" label="editBoard.form.name.label" />
        <e-button type="submit">
          {{ $t('editBoard.form.button.save') }}
        </e-button>
      </form>
    </template>
  </m-modal>
</template>
