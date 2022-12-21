<script setup>
import { ref } from 'vue';
import { storeToRefs } from 'pinia';
import { useField, useForm } from 'vee-validate';
import { object, string } from 'yup';
import { useBoardStore } from '@stores/boardStore';
import mModal from '@modules/m-modal/m-modal.vue';
import eButton from '@elements/e-button/e-button.vue';
import eInput from '@elements/e-input/e-input.vue';
import mSpinner from '@modules/m-spinner/m-spinner.vue';
import mNotification from '@modules/m-notification/m-notification.vue';
import mLinksList from '@modules/m-links-list/m-links-list.vue';

const boardStore = useBoardStore();
const { activeBoardId, activeCategoryId, errors: apiErrors } = storeToRefs(useBoardStore());

const validationSchema = object().shape({
  name: string().required('mCategoriesList.form.name.error.required'),
});

const { handleSubmit, errors, resetForm, setFieldError } = useForm({ validationSchema });

const { value: name } = useField('name');

let showModal = ref(false);
let isEdit = ref(false);

// add category

function onAddClick() {
  resetForm({
    values: { name: '' },
  });

  isEdit.value = false;
  showModal.value = true;
}

const addCategory = handleSubmit(async (values, { resetForm }) => {
  await boardStore.addCategory({ ...values, board_id: activeBoardId.value });

  if (apiErrors.value.length !== 0) {
    apiErrors.value.forEach((error) => {
      setFieldError(error.field, 'serverErrors.' + error.message);
    });
  } else {
    resetForm();

    showModal.value = false;
  }
});

// edit category

function onEditClick(category) {
  resetForm({
    values: {
      name: category.name,
    },
  });

  boardStore.activeCategoryId = category.id;
  isEdit.value = true;
  showModal.value = true;
}

const editCategory = handleSubmit(async (values) => {
  await boardStore.editCategory({
    ...values,
    id: activeCategoryId.value,
    board_id: activeBoardId.value,
  });

  if (apiErrors.value.length !== 0) {
    apiErrors.value.forEach((error) => {
      setFieldError(error.field, 'serverErrors.' + error.message);
    });
  } else {
    showModal.value = false;
  }
});

// remove category

async function removeCategory() {
  await boardStore.removeCategory({ id: activeCategoryId.value, board_id: activeBoardId.value });

  if (apiErrors.value.length !== 0) {
    apiErrors.value.forEach((error) => {
      setFieldError(error.field, 'serverErrors.' + error.message);
    });
  } else {
    showModal.value = false;
  }
}
</script>

<template>
  <div class="columns is-multiline">
    <m-spinner :is-loading="boardStore.isLoading" />
    <div v-for="category in boardStore.getBoardById(activeBoardId)?.categories" :key="category.id" class="column is-3">
      <div class="panel">
        <header class="panel-heading p-1">
          <div class="card-header-title is-justify-content-space-between">
            <span>{{ category.name }}</span>
            <span class="icon has-text-grey-light" @click="onEditClick(category)">
              <font-awesome-icon icon="fa-solid fa-pen" />
            </span>
          </div>
        </header>
        <m-links-list v-if="category.links" :links="category.links" />
      </div>
    </div>
    <div class="column is-3" @click="onAddClick">
      <div class="panel">
        <header class="panel-heading p-1">
          <div class="card-header-title">
            <span class="icon">
              <font-awesome-icon icon="fa-solid fa-plus" />
            </span>
            {{ $t('mCategoriesList.form.button.add') }}
          </div>
        </header>
      </div>
    </div>
  </div>

  <m-modal v-model="showModal" @cancel="showModal = false">
    <template v-slot:title>
      {{ !isEdit ? $t('mCategoriesList.title.add') : $t('mCategoriesList.title.edit') }}
    </template>
    <template v-slot:content>
      <m-notification :item="apiErrors" />
      <form @submit.prevent="!isEdit ? addCategory() : editCategory()" novalidate>
        <e-input v-model="name" :errorMessage="errors.name" id="name" label="mCategoriesList.form.name.label" />
        <div class="field is-grouped pt-3">
          <e-button type="submit">
            {{ $t('mCategoriesList.form.button.save') }}
          </e-button>
          <e-button type="button" layout="link-light-danger" @click="removeCategory()">
            {{ $t('mCategoriesList.form.button.remove') }}
          </e-button>
        </div>
      </form>
    </template>
  </m-modal>
</template>
