<template>
  <div>
    <ul class="list-group list-group-flush">
      <draggable v-model="items.links" group="links" handle=".link" @change="updateSorting()">
        <li
          v-for="item in items.links"
          class="list-group-item d-flex justify-content-between align-items-center link"
          :key="item.id"
        >
          <div class="d-flex align-items-center">
            <img :src="favicon(item)" alt="" height="16" width="16" />
            <e-link :href="item.url" :title="item.description" target="_blank" class="pl-3">
              {{ item.title }}
            </e-link>
          </div>
          <e-link class="btn btn-outline-light btn-sm" @click="edit(item.id)">
            <i class="fa fa-edit" />
          </e-link>
        </li>
        <li class="list-group-item">
          <i class="fa fa-plus pr-1" />
          <e-link @click="add(items.id)">
            {{ $t('link.add') }}
          </e-link>
        </li>
      </draggable>
    </ul>

    <e-modal v-if="$store.getters.showLinkModal">
      <link-form />
    </e-modal>
  </div>
</template>

<script>
import draggable from 'vuedraggable';
import _ from 'lodash';
import LinkForm from './Form.vue';
import bus from '../../bus';
import eModal from '../../components/Elements/e-modal/e-modal.vue';
import eLink from '../../components/Elements/e-link/e-link.vue';

export default {
  name: 'LinkList',
  components: {
    LinkForm,
    eModal,
    eLink,
    draggable
  },
  props: {
    items: {
      required: false,
      type: Object
    }
  },
  methods: {
    add(categoryId) {
      this.openModal();
      this.$store.commit('change_current_category_id', categoryId);
    },
    edit(selectedId) {
      this.openModal();

      const selectedItem = _.find(this.items.links, { id: selectedId });

      this.$nextTick(() => {
        bus.edit('edit-link', selectedItem);
      });
    },
    openModal() {
      this.$store.commit('toggle_link_modal', true);
    },
    updateSorting() {
      this.items.links.map((link, index) => {
        this.$store.dispatch('save', {
          api_url: `/links/${link.id}`,
          method: 'put',
          data: {
            sort: (link.sort = index + 1)
          }
        });
      });
    },
    favicon(item) {
      return item.favicon ? item.favicon : `https://www.google.com/s2/favicons?domain=${item.url}`;
    }
  }
};
</script>

<style scoped>
.list-group-item {
  border-width: 0;
  border-bottom-width: 1px;
}

.list-group-item:last-of-type {
  border-width: 0;
}
</style>
