<template>
  <div class="card bg-light">
    <div class="card-header" v-text="$t(isNewRecord ? 'form.addCategory' : 'form.updateCategory')" />
    <div class="card-body">
      <form method="post" @submit.prevent="submit">
        <e-input :vObj="$v.name" :labelText="$t('form.name')" id="category-name" containerClass="col-sm-12" />

        <e-textarea
          :vObj="$v.description"
          :labelText="$t('form.description')"
          id="category-description"
          containerClass="col-sm-12"
        />

        <e-input
          :vObj="$v.color"
          :labelText="$t('form.color')"
          type="color"
          id="category-color"
          containerClass="col-sm-12"
        />

        <e-select
          :vObj="$v.icon"
          :labelText="$t('form.icon')"
          :options="icons"
          id="category-icon"
          containerClass="col-sm-12"
        />

        <e-select
          v-if="!isNewRecord && boards.length > 1"
          :vObj="$v.board_id"
          :labelText="$t('form.board.id')"
          :options="boards"
          id="boards-id"
          containerClass="col-sm-12"
        />

        <div class="form-group">
          <e-button id="button-save" :disabled="isSaving">
            <e-spinner :state="isSaving">
              <i :class="['fas', isNewRecord ? 'fa-plus-square' : 'fa-save']"></i>
            </e-spinner>
            {{ isNewRecord ? $t('form.add') : $t('form.save') }}
          </e-button>

          <e-button id="button-reset" type="reset" :disabled="isSaving" classes="btn-secondary" @click="close">
            <i class="fas fa-times"></i> {{ $t('form.close') }}
          </e-button>

          <e-button v-if="!isNewRecord" id="button-remove" :disabled="isRemoving" classes="btn-danger" @click="remove">
            <e-spinner :state="isRemoving">
              <i class="fas fa-trash-alt"></i>
            </e-spinner>
            {{ $t('form.remove') }}
          </e-button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { required, minLength, maxLength, numeric, helpers } from 'vuelidate/lib/validators';
import { serverError } from '@/validators/validators';
import eSpinner from '../../components/Elements/e-spinner/e-spinner.vue';
import eInput from '../../components/Elements/e-input/e-input.vue';
import eTextarea from '../../components/Elements/e-textarea/e-textarea.vue';
import eSelect from '../../components/Elements/e-select/e-select.vue';
import eButton from '../../components/Elements/e-button/e-button.vue';
import bus from '../../bus';

export default {
  name: 'CategoryForm',
  components: {
    eSpinner,
    eInput,
    eTextarea,
    eSelect,
    eButton
  },
  data() {
    return {
      // form data
      id: null,
      name: '',
      description: '',
      color: '',
      icon: '',
      board_id: null,
      // states
      isSaving: false,
      isRemoving: false,
      // server errors
      responseErrors: []
    };
  },
  validations: {
    name: {
      required: helpers.withParams({ message: 'error.required' }, required),
      minLength: helpers.withParams({ message: { path: 'error.tooShort', args: { min: 2 } } }, minLength(2)),
      maxLength: helpers.withParams({ message: { path: 'error.tooLong', args: { max: 255 } } }, maxLength(255)),
      serverError: serverError('name')
    },
    description: {
      maxLength: helpers.withParams({ message: { path: 'error.tooLong', args: { max: 255 } } }, maxLength(255)),
      serverError: serverError('description')
    },
    color: {
      minLength: helpers.withParams({ message: { path: 'error.tooShort', args: { min: 6 } } }, minLength(6)),
      maxLength: helpers.withParams({ message: { path: 'error.tooLong', args: { max: 7 } } }, maxLength(7)),
      serverError: serverError('color')
    },
    icon: {
      minLength: helpers.withParams({ message: { path: 'error.tooShort', args: { min: 2 } } }, minLength(2)),
      maxLength: helpers.withParams({ message: { path: 'error.tooLong', args: { max: 255 } } }, maxLength(255)),
      serverError: serverError('icon')
    },
    board_id: {
      required: helpers.withParams({ message: 'error.required' }, required),
      numeric,
      serverError: serverError('board_id')
    }
  },
  computed: {
    isNewRecord() {
      return this.id === null;
    },
    boards() {
      return this.$store.getters.boards;
    },
    icons() {
      return [
        { id: '', name: 'None' },
        { id: 'fas fa-book', name: 'Book' },
        { id: 'fab fa-btc', name: 'Bitcoin' },
        { id: 'fas fa-chart-pie', name: 'Chart' },
        { id: 'fa fa-graduation-cap', name: 'Education' },
        { id: 'fa fa-envelope', name: 'E-Mail' },
        { id: 'fa fa-gamepad', name: 'Games' },
        { id: 'fas fa-home', name: 'Home' },
        { id: 'fas fa-music', name: 'Music' },
        { id: 'fas fa-dollar-sign', name: 'Money' },
        { id: 'fa fa-percent', name: 'Percent' },
        { id: 'fas fa-share-alt', name: 'Social' },
        { id: 'fa fa-video', name: 'Video' },
        { id: 'fas fa-wallet', name: 'Wallet' }
      ];
    }
  },
  methods: {
    submit() {
      this.$v.$touch();

      if (this.$v.$invalid) {
        return;
      }

      this.isSaving = true;

      this.$store
        .dispatch('save', {
          api_url: this.isNewRecord ? '/categories' : `/categories/${this.id}`,
          method: this.isNewRecord ? 'post' : 'put',
          data: {
            board_id: this.isNewRecord ? this.$store.getters.activeBoardId : this.board_id,
            name: this.name,
            description: this.description,
            color: this.color,
            icon: this.icon
          }
        })
        .then(() => {
          bus.fetchBoards();
          this.$store.commit('toggle_category_modal', false);
          this.reset();
        })
        .catch((err) => {
          if (err.response.status === 422) {
            this.responseErrors = err.response.data;
          }
        })
        .finally(() => {
          this.isSaving = false;
        });
    },
    reset() {
      this.id = null;
      this.name = '';
      this.description = '';
      this.color = '';
      this.icon = '';
      this.board_id = null;
    },
    close() {
      this.reset();
      this.$store.commit('toggle_category_modal', false);
    },
    remove() {
      this.isRemoving = true;

      this.$store
        .dispatch('save', {
          api_url: `/categories/${this.id}`,
          method: 'delete'
        })
        .then(() => {
          bus.fetchBoards();
          this.$store.commit('toggle_category_modal', false);
          this.reset();
        })
        .catch((err) => {
          if (err.response.status === 422) {
            this.responseErrors = err.response.data;
          }
        })
        .finally(() => {
          this.isRemoving = false;
        });
    }
  },
  created() {
    this.$v.$reset();

    this.board_id = this.$store.getters.activeBoardId;

    bus.$on('edit-category', (item) => {
      this.id = item.id;
      this.name = item.name;
      this.description = item.description;
      this.color = item.color;
      this.icon = item.icon;
    });
  },
  mounted() {
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        this.close();
      }
    });
  }
};
</script>
