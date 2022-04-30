<template>
  <div class="card bg-light">
    <div class="card-header" v-text="$t(isNewRecord ? 'form.link.add' : 'form.link.update')"></div>
    <div class="card-body">
      <form method="post" @submit.prevent="submit">
        <e-input
          :vObj="$v.title"
          :labelText="$t('form.link.title')"
          :errors="responseErrors"
          id="link-title"
          containerClass="col-sm-12"
        />

        <e-textarea
          :vObj="$v.description"
          :labelText="$t('form.link.description')"
          :errors="responseErrors"
          id="link-description"
          containerClass="col-sm-12"
        />

        <e-input
          :vObj="$v.url"
          :labelText="$t('form.link.url')"
          :errors="responseErrors"
          id="link-url"
          containerClass="col-sm-12"
        />

        <div class="form-group" v-if="!isNewRecord">
          <label for="link-category-id">
            {{ $t('form.link.category_id') }}
          </label>
          <select
            id="link-category-id"
            v-model="$v.category_id.$model"
            :class="validationCssClass($v.category_id)"
            class="form-control"
            @keydown="filterErrors('category_id')"
          >
            <option
              v-for="(category, index) in categories"
              :key="index"
              :value="category.id"
            >
              {{ category.name }}
            </option>
          </select>
          <template v-for="(validator, validatorName, index) in $v.category_id.$params">
            <div
              v-if="!$v.category_id[validatorName]"
              :key="index"
              v-t="validator && validator.message ? validator.message : validator"
              class="invalid-feedback"
            />
          </template>
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
  numeric,
  helpers,
} from 'vuelidate/lib/validators';
import { serverError } from '@/validators/validators';
import bus from '../../bus';
import eSpinner from '../../components/Elements/e-spinner/e-spinner.vue';
import eInput from '../../components/Elements/e-input/e-input.vue';
import eTextarea from '../../components/Elements/e-textarea/e-textarea.vue';

export default {
  name: 'LinkForm',
  components: {
    eSpinner,
    eInput,
    eTextarea,
  },
  data() {
    return {
      // form data
      id: null,
      title: '',
      description: '',
      category_id: '',
      url: '',
      // states
      isSaving: false,
      isRemoving: false,
      // server errors
      responseErrors: [],
    };
  },
  validations: {
    title: {
      required: helpers.withParams({ message: 'error.required' }, required),
      minLength: helpers.withParams({ message: { path: 'error.tooShort', args: { min: 2 } } }, minLength(2)),
      maxLength: helpers.withParams({ message: { path: 'error.tooLong', args: { max: 255 } } }, maxLength(255)),
      serverError: serverError('title'),
    },
    description: {
      maxLength: helpers.withParams({ message: { path: 'error.tooLong', args: { max: 255 } } }, maxLength(255)),
      serverError: serverError('description'),
    },
    category_id: {
      numeric,
      serverError: serverError('category_id'),
    },
    url: {
      minLength: helpers.withParams({ message: { path: 'error.tooShort', args: { min: 2 } } }, minLength(2)),
      maxLength: helpers.withParams({ message: { path: 'error.tooLong', args: { max: 2000 } } }, maxLength(2000)),
      serverError: serverError('url'),
    },
  },
  computed: {
    isNewRecord() {
      return this.id === null;
    },
    categories() {
      return this.$store.getters.categories;
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
        api_url: this.isNewRecord ? '/links' : `/links/${this.id}`,
        method: this.isNewRecord ? 'post' : 'put',
        data: {
          id: this.id,
          category_id: this.category_id,
          title: this.title,
          description: this.description,
          url: this.url,
        },
      })
        .then(() => {
          bus.fetchBoards();
          this.$store.commit('toggle_link_modal', false);
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
      this.category_id = 0;
      this.title = '';
      this.description = '';
      this.url = '';
    },
    close() {
      this.reset();
      this.$store.commit('toggle_link_modal', false);
    },
    remove() {
      this.isRemoving = true;

      this.$store.dispatch('save', {
        api_url: `/links/${this.id}`,
        method: 'delete',
      })
        .then(() => {
          bus.fetchBoards();
          this.$store.commit('toggle_link_modal', false);
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
    validationCssClass(validation) {
      return {
        'is-valid': !validation.$error && validation.$dirty,
        'is-invalid': validation.$error,
      };
    },
    filterErrors(field) {
      return this.responseErrors.filter((item) => item.field !== field);
    },
  },
  created() {
    // Reset validation
    this.$v.$reset();

    this.category_id = this.$store.getters.currentCategoryId;

    bus.$on('edit-link', (item) => {
      this.id = item.id;
      this.category_id = item.category_id;
      this.title = item.title;
      this.description = item.description;
      this.url = item.url;
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
