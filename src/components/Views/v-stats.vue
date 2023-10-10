<script setup>
import { storeToRefs } from 'pinia';
import { useBoardStore } from '@stores/boardStore';

const boardStore = useBoardStore();

const { totalBoardsCount, totalCategoriesCount, totalLinksCount } = storeToRefs(useBoardStore());

boardStore.fetchBoards();
</script>

<template>
  <div class="section">
    <table v-if="totalBoardsCount || totalCategoriesCount || totalLinksCount" class="table is-fullwidth">
      <thead>
        <tr>
          <th>{{ $t('stats.title') }}</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-if="totalBoardsCount">
          <td>{{ $t('stats.table.totalBoardTitle') }}</td>
          <td>{{ totalBoardsCount }}</td>
        </tr>
        <tr v-if="totalCategoriesCount">
          <td>{{ $t('stats.table.totalCategoriesTitle') }}</td>
          <td>{{ totalCategoriesCount }}</td>
        </tr>
        <tr v-if="totalLinksCount">
          <td>{{ $t('stats.table.totalLinksTitle') }}</td>
          <td>{{ totalLinksCount }}</td>
        </tr>
      </tbody>
    </table>
    <div v-else>
      <h1 class="title">{{ $t('stats.title') }}</h1>
      <p>{{ $t('stats.info') }}</p>
    </div>
  </div>
</template>
