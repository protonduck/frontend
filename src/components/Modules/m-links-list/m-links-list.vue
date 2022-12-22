<script setup>
import { ref } from 'vue';
import { storeToRefs } from 'pinia';
import { useField, useForm } from 'vee-validate';
import { object, string } from 'yup';
import { useBoardStore } from '@stores/boardStore';
import mModal from '@modules/m-modal/m-modal.vue';
import eButton from '@elements/e-button/e-button.vue';
import eInput from '@elements/e-input/e-input.vue';
import eTextarea from '@elements/e-textarea/e-textarea.vue';
import mSpinner from '@modules/m-spinner/m-spinner.vue';
import mNotification from '@modules/m-notification/m-notification.vue';

const boardStore = useBoardStore();
const { activeBoardId, activeLinkId, errors: apiErrors } = storeToRefs(useBoardStore());

const validationSchema = object().shape({
  title: string().required('mLinksList.form.title.error.required'),
  url: string().required('mLinksList.form.url.error.required'),
  description: string().nullable(),
});

const { handleSubmit, errors, resetForm, setFieldError } = useForm({ validationSchema });

const { value: title } = useField('title');
const { value: url } = useField('url');
const { value: description } = useField('description');

let showModal = ref(false);
let isEdit = ref(false);

const props = defineProps({
  links: Array,
  categoryId: Number,
});

function favicon(link) {
  return link.favicon ? link.favicon : `https://www.google.com/s2/favicons?domain=${link.url}`;
}

// add link

function onAddClick() {
  resetForm({
    values: { title: '', description: '' },
  });

  isEdit.value = false;
  showModal.value = true;
}

const addLink = handleSubmit(async (values, { resetForm }) => {
  await boardStore.addLink({
    ...values,
    board_id: activeBoardId.value,
    category_id: props.categoryId,
  });

  if (apiErrors.value.length !== 0) {
    apiErrors.value.forEach((error) => {
      setFieldError(error.field, 'serverErrors.' + error.message);
    });
  } else {
    resetForm();

    showModal.value = false;
  }
});

// edit link

function onEditClick(link) {
  resetForm({
    values: {
      title: link.title,
      url: link.url,
      description: link.description,
    },
  });

  boardStore.activeLinkId = link.id;
  isEdit.value = true;
  showModal.value = true;
}

const editLink = handleSubmit(async (values) => {
  await boardStore.editLink({
    ...values,
    id: activeLinkId.value,
    board_id: activeBoardId.value,
    category_id: props.categoryId,
  });

  if (apiErrors.value.length !== 0) {
    apiErrors.value.forEach((error) => {
      setFieldError(error.field, 'serverErrors.' + error.message);
    });
  } else {
    showModal.value = false;
  }
});

// remove link

async function removeLink() {
  await boardStore.removeLink({ id: activeLinkId.value, board_id: activeBoardId.value, category_id: props.categoryId });

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
  <m-spinner :is-loading="boardStore.isLoading" />
  <div v-for="link in links" :key="link.id" class="panel-block">
    <span class="panel-icon">
      <img :src="favicon(link)" alt="" height="16" width="16" />
    </span>
    <div class="is-flex is-flex-grow-1 is-flex-shrink-1 is-justify-content-space-between">
      <a :href="link.url" :title="link.description" target="_blank">
        {{ link.title }}
      </a>
      <span class="icon has-text-grey-lighter cursor-pointer" @click="onEditClick(link)">
        <font-awesome-icon icon="fa-solid fa-pen" />
      </span>
    </div>
  </div>
  <div class="panel-block is-justify-content-space-between cursor-pointer" @click="onAddClick">
    <span>
      <font-awesome-icon icon="fa-solid fa-plus" />
      {{ $t('mLinksList.form.button.add') }}
    </span>
  </div>

  <m-modal v-model="showModal" @cancel="showModal = false">
    <template v-slot:title>
      {{ !isEdit ? $t('mLinksList.title.add') : $t('mLinksList.title.edit') }}
    </template>
    <template v-slot:content>
      <m-notification :item="apiErrors" />
      <form @submit.prevent="!isEdit ? addLink() : editLink()" novalidate>
        <e-input v-model="title" :errorMessage="errors.title" id="title" label="mLinksList.form.title.label" />
        <e-input v-model="url" :errorMessage="errors.url" id="url" label="mLinksList.form.url.label" />
        <e-textarea
          v-model="description"
          :errorMessage="errors.description"
          id="description"
          label="mLinksList.form.description.label"
        />
        <div class="field is-grouped pt-3">
          <e-button type="submit">
            {{ $t('mLinksList.form.button.save') }}
          </e-button>
          <e-button v-show="isEdit" type="button" layout="link-light-danger" @click="removeLink()">
            {{ $t('mLinksList.form.button.remove') }}
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
