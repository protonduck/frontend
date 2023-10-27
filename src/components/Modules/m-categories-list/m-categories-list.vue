<script setup>
import { ref } from 'vue';
import { storeToRefs } from 'pinia';
import { useField, useForm } from 'vee-validate';
import { object, string } from 'yup';
import { useI18n } from 'vue-i18n';
import { useBoardStore } from '@stores/boardStore';
import mModal from '@modules/m-modal/m-modal.vue';
import eButton from '@elements/e-button/e-button.vue';
import eInput from '@elements/e-input/e-input.vue';
import eTextarea from '@elements/e-textarea/e-textarea.vue';
import eSelect from '@elements/e-select/e-select.vue';
import mSpinner from '@modules/m-spinner/m-spinner.vue';
import mNotification from '@modules/m-notification/m-notification.vue';
import mLinksList from '@modules/m-links-list/m-links-list.vue';

const boardStore = useBoardStore();
const { activeBoardId, activeCategoryId, boards, errors: apiErrors } = storeToRefs(useBoardStore());

const validationSchema = object().shape({
  name: string().required('mCategoriesList.form.name.error.required'),
  description: string().nullable(),
  icon: string().nullable(),
  board_id: string(),
});

const { handleSubmit, errors, resetForm, setFieldError } = useForm({ validationSchema });

const { value: name } = useField('name');
const { value: description } = useField('description');
const { value: icon } = useField('icon');
const { value: board_id } = useField('board_id');

let showModal = ref(false);
let isEdit = ref(false);

// add category

function onAddClick() {
  resetForm({
    values: { name: '', description: '', icon: '', board_id: '' },
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
      description: category.description,
      icon: category.icon,
      board_id: category.board_id,
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
    board_id: board_id.value,
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

const { t } = useI18n();

const categoryIcons = ref([
  { id: '', name: t('mCategoriesList.icons.none') },
  { id: 'fa-solid fa-book', name: t('mCategoriesList.icons.book') },
  { id: 'fa-solid fa-chart-pie', name: t('mCategoriesList.icons.chart') },
  { id: 'fa-solid fa-building-columns', name: t('mCategoriesList.icons.education') },
  { id: 'fa-solid fa-envelope', name: t('mCategoriesList.icons.email') },
  { id: 'fa-solid fa-gamepad', name: t('mCategoriesList.icons.games') },
  { id: 'fa-solid fa-home', name: t('mCategoriesList.icons.home') },
  { id: 'fa-solid fa-music', name: t('mCategoriesList.icons.music') },
  { id: 'fa-solid fa-money-bill', name: t('mCategoriesList.icons.money') },
  { id: 'fa-solid fa-percent', name: t('mCategoriesList.icons.percent') },
  { id: 'fa-solid fa-share-nodes', name: t('mCategoriesList.icons.share') },
  { id: 'fa-solid fa-video', name: t('mCategoriesList.icons.video') },
  { id: 'fa-solid fa-wallet', name: t('mCategoriesList.icons.wallet') },
]);
</script>

<template>
  <div v-if="boards.length && activeBoardId" class="columns is-multiline">
    <m-spinner :is-loading="boardStore.isLoading" />
    <div v-for="category in boardStore.getBoardById(activeBoardId)?.categories" :key="category.id" class="column is-3">
      <div class="panel">
        <header class="panel-heading p-1 cursor-pointer" @click="onEditClick(category)">
          <div class="card-header-title is-justify-content-space-between">
            <span v-show="category.icon" class="icon">
              <font-awesome-icon :icon="category.icon" />
            </span>
            <span>{{ category.name }}</span>
            <span class="icon has-text-grey-light">
              <font-awesome-icon icon="fa-solid fa-pen-to-square" />
            </span>
          </div>
        </header>
        <m-links-list v-if="category.links" :links="category.links" :category-id="category.id" />
      </div>
    </div>
    <div class="column is-3 cursor-pointer" @click="onAddClick">
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

  <div
    v-if="boards.length && !boardStore.getBoardById(activeBoardId)?.categories.length && !activeBoardId"
    class="notification is-warning is-light"
  >
    {{ $t('mCategoriesList.info.select') }}
  </div>

  <m-modal v-model="showModal" @cancel="showModal = false">
    <template #title>
      {{ !isEdit ? $t('mCategoriesList.title.add') : $t('mCategoriesList.title.edit') }}
    </template>
    <template #content>
      <m-notification :item="apiErrors" />
      <form novalidate @submit.prevent="!isEdit ? addCategory() : editCategory()">
        <e-input id="name" v-model="name" :error-message="errors.name" label="mCategoriesList.form.name.label" />
        <e-textarea
          id="description"
          v-model="description"
          :error-message="errors.description"
          label="mCategoriesList.form.description.label"
        />
        <e-select
          id="icon"
          v-model="icon"
          :options="categoryIcons"
          :error-message="errors.icon"
          label="mCategoriesList.form.icon.label"
        />
        <e-select
          v-if="isEdit"
          id="board_id"
          v-model="board_id"
          :options="boards"
          :error-message="errors.board_id"
          label="mCategoriesList.form.board_id.label"
        />
        <div class="field is-grouped pt-3">
          <e-button type="submit">
            {{ $t('mCategoriesList.form.button.save') }}
          </e-button>
          <e-button v-show="isEdit" type="button" layout="link-light-danger" @click="removeCategory()">
            {{ $t('mCategoriesList.form.button.remove') }}
          </e-button>
        </div>
      </form>
    </template>
  </m-modal>
</template>

<style lang="scss" scoped>
.cursor-pointer {
  cursor: pointer;
}
</style>
