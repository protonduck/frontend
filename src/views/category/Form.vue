<template>
  <div class="card bg-light">
    <div
      class="card-header"
      v-text="$t(isNewRecord ? 'form.addCategory' : 'form.updateCategory')"
    />
    <div class="card-body">
      <form method="post" @submit.prevent="submit">
        <div class="form-group">
          <e-input
            :vObj="$v.name"
            :labelText="$t('form.name')"
            id="category-name"
            containerClass="col-sm-12"
            />
        </div>

        <e-textarea
          :vObj="$v.description"
          :labelText="$t('form.description')"
          id="category-description"
          containerClass="col-sm-12"
        />

        <div class="form-group">
          <e-input
            :vObj="$v.color"
            :labelText="$t('form.color')"
            type="color"
            id="category-color"
            containerClass="col-sm-12"
          />
        </div>

        <div class="form-group">
          <e-input
            :vObj="$v.icon"
            :labelText="$t('form.icon')"
            id="category-icon"
            containerClass="col-sm-12"
          />
        </div>

        <div class="form-group">
          <button :disabled="isSaving" class="btn btn-success mr-2" type="submit">
            <e-spinner :state="isSaving">
              <i :class="['fas', isNewRecord ? 'fa-plus-square' : 'fa-save']"></i>
            </e-spinner>
            {{ isNewRecord ? $t('form.add') : $t('form.save') }}
          </button>
          <button
            :disabled="isSaving"
            class="btn btn-secondary mr-2"
            type="reset"
            @click.prevent="close"
          >
            <i class="fas fa-times"></i>
            {{ $t('form.close') }}
          </button>
          <button
            v-if="!isNewRecord"
            :disabled="isRemoving"
            class="btn btn-danger"
            type="submit"
            @click.prevent="remove"
          >
            <e-spinner :state="isRemoving">
              <i class="fas fa-trash-alt"></i>
            </e-spinner>
            {{ $t('form.remove') }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import {
  required,
  minLength,
  maxLength,
  helpers,
} from 'vuelidate/lib/validators';
import { serverError } from '@/validators/validators';
import eSpinner from '../../components/Elements/e-spinner/e-spinner.vue';
import eInput from '../../components/Elements/e-input/e-input.vue';
import eTextarea from '../../components/Elements/e-textarea/e-textarea.vue';
import bus from '../../bus';

export default {
  name: 'CategoryForm',
  components: {
    eSpinner,
    eInput,
    eTextarea,
  },
  data() {
    return {
      // form data
      id: null,
      name: '',
      description: '',
      color: '',
      icon: '',
      // states
      isSaving: false,
      isRemoving: false,
      // server errors
      responseErrors: [],
    };
  },
  validations: {
    name: {
      required: helpers.withParams({ message: 'error.required' }, required),
      minLength: helpers.withParams({ message: { path: 'error.tooShort', args: { min: 2 } } }, minLength(2)),
      maxLength: helpers.withParams({ message: { path: 'error.tooLong', args: { max: 255 } } }, maxLength(255)),
      serverError: serverError('name'),
    },
    description: {
      maxLength: helpers.withParams({ message: { path: 'error.tooLong', args: { max: 255 } } }, maxLength(255)),
      serverError: serverError('description'),
    },
    color: {
      minLength: helpers.withParams({ message: { path: 'error.tooShort', args: { min: 6 } } }, minLength(6)),
      maxLength: helpers.withParams({ message: { path: 'error.tooLong', args: { max: 7 } } }, maxLength(7)),
      serverError: serverError('color'),
    },
    icon: {
      minLength: helpers.withParams({ message: { path: 'error.tooShort', args: { min: 2 } } }, minLength(2)),
      maxLength: helpers.withParams({ message: { path: 'error.tooLong', args: { max: 255 } } }, maxLength(255)),
      serverError: serverError('icon'),
    },
  },
  computed: {
    isNewRecord() {
      return this.id === null;
    },
  },
  methods: {
    submit() {
      this.$v.$touch();

      if (this.$v.$invalid) {
        return;
      }

      this.isSaving = true;

      this.$store.dispatch('save', {
        api_url: this.isNewRecord ? '/categories' : `/categories/${this.id}`,
        method: this.isNewRecord ? 'post' : 'put',
        data: {
          board_id: this.$store.getters.activeBoardId,
          name: this.name,
          description: this.description,
          color: this.color,
          icon: this.icon,
        },
      })
        .then(() => {
          bus.fetchBoards();
          this.$store.commit('toggle_category_modal', false);
          this.reset();
        })
        .catch((err) => {
          if (err.response.status === 422) {
            this.responseErrors = err.response.data;
            // this.$v.$touch();
          }
        }).finally(() => {
          this.isSaving = false;
        });
    },
    reset() {
      this.id = null;
      this.name = '';
      this.description = '';
      this.color = '';
      this.icon = '';
    },
    close() {
      this.reset();
      this.$store.commit('toggle_category_modal', false);
    },
    remove() {
      this.isRemoving = true;

      this.$store.dispatch('save', {
        api_url: `/categories/${this.id}`,
        method: 'delete',
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
        }).finally(() => {
          this.isRemoving = false;
        });
    },
  },
  created() {
    // Reset validation
    this.$v.$reset();

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
  },
};
</script>
