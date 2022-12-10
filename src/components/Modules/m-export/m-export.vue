<script setup>
import { storeToRefs } from 'pinia';
import { useBoardStore } from '@stores/boardStore';

function exportToFile() {
  const { boards } = storeToRefs(useBoardStore());

  let data = [];

  boards.value.forEach((board) => {
    let categories = [];

    board.categories.forEach((category) => {
      let links = [];

      category.links.forEach((link) => {
        links.push({ title: link.title, url: link.url });
      });

      categories.push({ name: category.name, links: links });
    });

    data.push({
      name: board.name,
      categories: categories,
    });
  });

  data = JSON.stringify(data);

  let dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(data);
  let linkElement = document.createElement('a');

  linkElement.setAttribute('href', dataUri);
  linkElement.setAttribute('download', 'bookmarks.json');
  linkElement.click();
}
</script>

<template>
  <a @click="exportToFile()" :title="$t('menu.export')" class="button is-link">
    <font-awesome-icon icon="fa-solid fa-download" />
  </a>
</template>
