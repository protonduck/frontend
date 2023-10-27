<script setup>
import { ref, onMounted } from 'vue';
import { storeToRefs } from 'pinia';
import { useField, useForm } from 'vee-validate';
import { object, string } from 'yup';
import { useBoardStore } from '@stores/boardStore';
import storage from '@helpers/storage';
import mModal from '@modules/m-modal/m-modal.vue';
import eButton from '@elements/e-button/e-button.vue';
import eInput from '@elements/e-input/e-input.vue';
import mSpinner from '@modules/m-spinner/m-spinner.vue';
import mNotification from '@modules/m-notification/m-notification.vue';
import mCategoriesList from '@modules/m-categories-list/m-categories-list.vue';

const boardStore = useBoardStore();

function switchBoard(selectedBoardId) {
  boardStore.setActiveBoard(selectedBoardId);
}

if (storage.getItem('selectedBoardId')) {
  boardStore.setActiveBoard(parseInt(storage.getItem('selectedBoardId'), 10));
}

const { boards, activeBoardId, errors: apiErrors } = storeToRefs(useBoardStore());

onMounted(async () => {
  await boardStore.fetchBoards();
});

const validationSchema = object().shape({
  name: string().required('mBoardList.form.name.error.required'),
});

const { handleSubmit, errors, resetForm, setFieldError } = useForm({ validationSchema });

const { value: name } = useField('name');

let showModal = ref(false);
let isEdit = ref(false);

// add board

function onAddClick() {
  resetForm({
    values: { name: '' },
  });

  isEdit.value = false;
  showModal.value = true;
}

const addBoard = handleSubmit(async (values, { resetForm }) => {
  await boardStore.addBoard(values);

  if (apiErrors.value.length !== 0) {
    apiErrors.value.forEach((error) => {
      setFieldError(error.field, 'serverErrors.' + error.message);
    });
  } else {
    resetForm();

    showModal.value = false;
  }
});

// edit board

function onEditClick() {
  resetForm({
    values: {
      name: boardStore.getBoardById(activeBoardId.value)?.name,
    },
  });

  isEdit.value = true;
  showModal.value = true;
}

const editBoard = handleSubmit(async (values) => {
  await boardStore.editBoard({ ...values, id: activeBoardId.value });

  if (apiErrors.value.length !== 0) {
    apiErrors.value.forEach((error) => {
      setFieldError(error.field, 'serverErrors.' + error.message);
    });
  } else {
    showModal.value = false;
  }
});

// remove board

let showRemoveModal = ref(false);

function onRemoveClick() {
  isEdit.value = false;
  showModal.value = false;
  showRemoveModal.value = true;
}

async function removeBoard() {
  await boardStore.removeBoard(activeBoardId.value);

  if (apiErrors.value.length !== 0) {
    apiErrors.value.forEach((error) => {
      setFieldError(error.field, 'serverErrors.' + error.message);
    });
  } else {
    showRemoveModal.value = false;
  }
}
</script>

<template>
  <div class="tabs is-centered is-boxed is-medium">
    <ul>
      <m-spinner :is-loading="boardStore.isLoading" />
      <template v-if="boards.length">
        <li
          v-for="board in boards"
          :key="board.id"
          :class="{ 'is-active': board.id === activeBoardId }"
          @click="switchBoard(board.id)"
        >
          <a>{{ board.name }}</a>
        </li>
      </template>
      <a :title="$t('mBoardList.form.button.add')" @click="onAddClick()">
        <span class="icon">
          <font-awesome-icon icon="fa-solid fa-plus" />
        </span>
      </a>
      <a v-if="activeBoardId" :title="$t('mBoardList.form.button.edit')" @click="onEditClick()">
        <span class="icon">
          <font-awesome-icon icon="fa-solid fa-pen-to-square" />
        </span>
      </a>
    </ul>
  </div>

  <m-categories-list />

  <div v-if="boards.length === 0" class="notification is-warning is-light">
    {{ $t('mBoardList.info.add') }}
  </div>

  <m-modal v-model="showModal" @cancel="showModal = false">
    <template #title>
      {{ !isEdit ? $t('mBoardList.title.add') : $t('mBoardList.title.edit') }}
    </template>
    <template #content>
      <m-notification :item="apiErrors" />
      <form novalidate @submit.prevent="!isEdit ? addBoard() : editBoard()">
        <e-input id="name" v-model="name" :error-message="errors.name" label="mBoardList.form.name.label" />
        <div class="field is-grouped pt-3">
          <e-button type="submit">
            {{ $t('mBoardList.form.button.save') }}
          </e-button>
          <e-button v-show="isEdit" type="button" layout="link-light-danger" @click="onRemoveClick()">
            {{ $t('mBoardList.form.button.remove') }}
          </e-button>
        </div>
      </form>
    </template>
  </m-modal>

  <m-modal v-model="showRemoveModal" @cancel="showRemoveModal = false">
    <template #title>{{ $t('mBoardList.title.remove') }}</template>
    <template #content>
      <m-notification :item="apiErrors" />
      <div class="block has-text-danger">
        <p>{{ $t('mBoardList.info.remove') }}</p>
      </div>
      <form novalidate @submit.prevent="removeBoard()">
        <e-button layout="link-danger" type="submit">
          {{ $t('mBoardList.form.button.remove') }}
        </e-button>
      </form>
    </template>
  </m-modal>
</template>
