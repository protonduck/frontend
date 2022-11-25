<template>
  <div class="card bg-light">
    <div class="card-header" v-text="$t(isNewRecord ? 'form.link.add' : 'form.link.update')"></div>
    <div class="card-body">
      <form method="post" @submit.prevent="submit">
        <e-input :vObj="$v.title" :labelText="$t('form.link.title')" id="link-title" containerClass="col-sm-12" />

        <e-textarea
          :vObj="$v.description"
          :labelText="$t('form.link.description')"
          id="link-description"
          containerClass="col-sm-12"
        />

        <e-input :vObj="$v.url" :labelText="$t('form.link.url')" id="link-url" containerClass="col-sm-12" />

        <e-select
          v-if="!isNewRecord && categories.length > 1"
          :vObj="$v.category_id"
          :labelText="$t('form.link.category_id')"
          :options="categories"
          id="link-category-id"
          containerClass="col-sm-12"
        />

        <div class="form-group">
          <e-button :disabled="isSaving">
            <e-spinner :state="isSaving">
              <i :class="['fas', isNewRecord ? 'fa-plus-square' : 'fa-save']"></i>
            </e-spinner>
            {{ isNewRecord ? $t('form.add') : $t('form.save') }}
          </e-button>

          <e-button type="reset" :disabled="isSaving" classes="btn-secondary" @click="close">
            <i class="fas fa-times"></i>
            {{ $t('form.close') }}
          </e-button>

          <e-button v-if="!isNewRecord" :disabled="isRemoving" classes="btn-danger" @click="remove">
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
import { required, minLength, maxLength, numeric, url, helpers } from 'vuelidate/lib/validators';
import { serverError } from '@/validators/validators';
import bus from '../../bus';
import eSpinner from '../../components/Elements/e-spinner/e-spinner.vue';
import eInput from '../../components/Elements/e-input/e-input.vue';
import eTextarea from '../../components/Elements/e-textarea/e-textarea.vue';
import eSelect from '../../components/Elements/e-select/e-select.vue';
import eButton from '../../components/Elements/e-button/e-button.vue';

export default {
  name: 'LinkForm',
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
      title: '',
      description: '',
      category_id: '',
      url: '',
      // states
      isSaving: false,
      isRemoving: false,
      // server errors
      responseErrors: []
    };
  },
  validations: {
    title: {
      required: helpers.withParams({ message: 'error.required' }, required),
      minLength: helpers.withParams({ message: { path: 'error.tooShort', args: { min: 2 } } }, minLength(2)),
      maxLength: helpers.withParams({ message: { path: 'error.tooLong', args: { max: 255 } } }, maxLength(255)),
      serverError: serverError('title')
    },
    description: {
      maxLength: helpers.withParams({ message: { path: 'error.tooLong', args: { max: 255 } } }, maxLength(255)),
      serverError: serverError('description')
    },
    category_id: {
      required: helpers.withParams({ message: 'error.required' }, required),
      numeric,
      serverError: serverError('category_id')
    },
    url: {
      required: helpers.withParams({ message: 'error.required' }, required),
      url: helpers.withParams({ message: 'error.notValidUrl' }, url),
      minLength: helpers.withParams({ message: { path: 'error.tooShort', args: { min: 2 } } }, minLength(2)),
      maxLength: helpers.withParams({ message: { path: 'error.tooLong', args: { max: 2000 } } }, maxLength(2000)),
      serverError: serverError('url')
    }
  },
  computed: {
    isNewRecord() {
      return this.id === null;
    },
    categories() {
      return this.$store.getters.categories;
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
          api_url: this.isNewRecord ? '/links' : `/links/${this.id}`,
          method: this.isNewRecord ? 'post' : 'put',
          data: {
            id: this.id,
            category_id: this.category_id,
            title: this.title,
            description: this.description,
            url: this.url
          }
        })
        .then(() => {
          this.close();
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
      this.category_id = null;
      this.title = '';
      this.description = '';
      this.url = '';
    },
    close() {
      this.reset();
      this.$store.commit('toggle_link_modal', false);
      bus.fetchBoards();
    },
    remove() {
      this.isRemoving = true;

      this.$store
        .dispatch('save', {
          api_url: `/links/${this.id}`,
          method: 'delete'
        })
        .then(() => {
          this.close();
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
  }
};
</script>
