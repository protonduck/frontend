<template>
  <div>
    <ul class="list-group list-group-flush">
      <draggable
        v-model="items.links"
        group="links"
        handle=".link"
        @change="update()"
      >
        <li
          v-for="item in items.links"
          class="list-group-item d-flex justify-content-between align-items-center link"
          :key="item.id"
        >
          <div class="d-flex align-items-center">
            <img :src="favicon(item)" alt="" height="16" width="16">
            <a :href="item.url" :title="item.description" class="pl-3" target="_blank">
              {{ item.title }}
            </a>
          </div>
          <a class="btn btn-outline-light btn-sm" href="#" @click.prevent="edit(item.id)">
            <i class="fa fa-edit"></i>
          </a>
        </li>
        <li class="list-group-item">
          <i class="fa fa-plus pr-1"></i>
          <a href="#" @click.prevent="add(items.id)">{{ $t('link.add') }}</a>
        </li>
      </draggable>
    </ul>

    <modal v-if="$store.getters.showLinkModal">
      <div slot="content">
        <link-form></link-form>
      </div>
    </modal>
  </div>
</template>

<script>
import draggable from 'vuedraggable';
import _ from 'lodash';
import LinkForm from './Form.vue';
import LinkService from '../../services/LinkService';
import Modal from '../Modal.vue';

export default {
  name: 'LinkList',
  components: {
    LinkForm,
    Modal,
    draggable,
  },
  props: {
    items: {
      required: false,
      type: Object,
    },
  },
  methods: {
    add(categoryId) {
      this.$store.commit('toggle_link_modal', true);
      this.$store.commit('change_current_category_id', categoryId);
    },
    edit(selectedId) {
      const selectedItem = _.find(this.items.links, { id: selectedId });

      this.$store.commit('toggle_link_modal', true);

      this.$nextTick(() => {
        LinkService.edit(selectedItem);
      });
    },
    update() {
      // eslint-disable-next-line array-callback-return
      this.items.links.map((link, index) => {
        this.$store.dispatch('linkSave', {
          api_url: `/links/${link.id}`,
          method: 'put',
          // eslint-disable-next-line no-param-reassign
          sort: link.sort = index + 1,
        });
      });
    },
    favicon(item) {
      return item.favicon ? item.favicon : `https://www.google.com/s2/favicons?domain=${item.url}`;
    },
  },
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
