<script setup>
import { ref } from 'vue';
import { storeToRefs } from 'pinia';
import { useBoardStore } from '@stores/boardStore';
import apiClient from '@/apiClient';
import mModal from '@modules/m-modal/m-modal.vue';
import eButton from '@elements/e-button/e-button.vue';

const boardStore = useBoardStore();
const { activeBoardId } = storeToRefs(useBoardStore());

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

  showModal.value = false;
}

let showModal = ref(false);
</script>

<template>
  <a :title="$t('removeBoard.form.button.remove')" @click="showModal = true">
    <span class="icon">
      <font-awesome-icon icon="fa-solid fa-trash" />
    </span>
  </a>

  <m-modal v-model="showModal" @cancel="showModal = false">
    <template v-slot:title>
      {{ $t('removeBoard.title') }}
    </template>
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
