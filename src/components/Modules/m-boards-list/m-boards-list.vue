<script setup>
import { ref, onMounted } from 'vue';
import { storeToRefs } from 'pinia';
import { useField, useForm } from 'vee-validate';
import { object, string } from 'yup';
import { useBoardStore } from '@stores/boardStore';
import storage from '@plugins/storage';
import apiClient from '@/apiClient';
import mModal from '@modules/m-modal/m-modal.vue';
import eButton from '@elements/e-button/e-button.vue';
import eInput from '@elements/e-input/e-input.vue';
import mSpinner from '@modules/m-spinner/m-spinner.vue';

const boardStore = useBoardStore();

function switchBoard(selectedBoardId) {
  boardStore.setActiveBoard(selectedBoardId);
}

if (storage.getItem('selectedBoardId')) {
  boardStore.setActiveBoard(parseInt(storage.getItem('selectedBoardId'), 10));
}

const { boards, activeBoardId } = storeToRefs(useBoardStore());

onMounted(async () => {
  await boardStore.fetchBoards();
});

const validationSchema = object().shape({
  name: string().required('addBoard.form.name.error.required'),
});

const { handleSubmit, errors, setFieldError, resetForm } = useForm({ validationSchema });

const { value: name } = useField('name');

// add board

let showAddModal = ref(false);

function onAddClick() {
  resetForm({
    values: {
      name: '',
    },
  });

  showAddModal.value = true;
}

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

  showAddModal.value = false;
});

// edit board

let showEditModal = ref(false);

function onEditClick() {
  resetForm({
    values: {
      name: boardStore.getBoardById(activeBoardId.value)?.name,
    },
  });

  showEditModal.value = true;
}

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

  showEditModal.value = false;
});

// remove board

let showRemoveModal = ref(false);

async function removeBoard() {
  await apiClient
    .removeBoard(activeBoardId.value)
    .then(() => {
      boardStore.removeBoard(activeBoardId.value);
    })
    .catch((err) => {
      /*
      if (err.response.data) {
        err.response.data.forEach((error) => {
          'serverErrors.' + error.message
        });
      }
      */
    });

  showRemoveModal.value = false;
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
          @click="switchBoard(board.id)"
          :class="{ 'is-active': board.id === activeBoardId }"
        >
          <a>{{ board.name }}</a>
        </li>
      </template>
      <a :title="$t('addBoard.form.button.add')" @click="onAddClick()">
        <span class="icon">
          <font-awesome-icon icon="fa-solid fa-plus" />
        </span>
      </a>
      <a v-if="activeBoardId" :title="$t('editBoard.form.button.edit')" @click="onEditClick()">
        <span class="icon">
          <font-awesome-icon icon="fa-solid fa-pen" />
        </span>
      </a>
      <a v-if="activeBoardId" :title="$t('removeBoard.form.button.remove')" @click="showRemoveModal = true">
        <span class="icon">
          <font-awesome-icon icon="fa-solid fa-trash" />
        </span>
      </a>
    </ul>
  </div>

  <div v-if="boards.length === 0" class="notification is-warning is-light">
    {{ $t('site.boardsList.info') }}
  </div>

  <m-modal v-model="showAddModal" @cancel="showAddModal = false">
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

  <m-modal v-model="showEditModal" @cancel="showEditModal = false">
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

  <m-modal v-model="showRemoveModal" @cancel="showRemoveModal = false">
    <template v-slot:title>{{ $t('removeBoard.title') }}</template>
    <template v-slot:content>
      <div class="block has-text-danger">
        <p>{{ $t('removeBoard.info') }}</p>
      </div>
      <form @submit.prevent="removeBoard()" novalidate>
        <e-button layout="link-danger" type="submit">
          {{ $t('removeBoard.form.button.remove') }}
        </e-button>
      </form>
    </template>
  </m-modal>
</template>
