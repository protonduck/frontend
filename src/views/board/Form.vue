<template>
  <div class="card bg-light">
    <div class="card-header" v-text="$t(isNewRecord ? 'form.board.add' : 'form.board.update')" />
    <div class="card-body">
      <form method="post" @submit.prevent="submit">
        <e-input
          :vObj="$v.name"
          :labelText="$t('form.board.name')"
          id="board-name"
          containerClass="col-sm-12"
        />

        <e-textarea
          :vObj="$v.image"
          :labelText="$t('form.board.image')"
          id="board-image"
          containerClass="col-sm-12"
        />

        <div class="form-group">
          <e-button :disabled="isSaving">
            <e-spinner :state="isSaving">
              <i :class="['fas', isNewRecord ? 'fa-plus-square' : 'fa-save']"></i>
            </e-spinner>
            {{ isNewRecord ? $t('form.add') : $t('form.save') }}
          </e-button>

          <e-button
            type="reset"
            :disabled="isSaving"
            @click="close"
            classes="btn-secondary"
          >
            <i class="fas fa-times"></i>
            {{ $t('form.close') }}
          </e-button>

          <e-button
            v-if="!isNewRecord"
            :disabled="isRemoving"
            classes="btn-danger"
            @click="remove"
          >
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
import {
  required,
  minLength,
  maxLength,
  helpers,
} from 'vuelidate/lib/validators';
import { serverError } from '@/validators/validators';
import eSpinner from '../../components/Elements/e-spinner/e-spinner.vue';
import bus from '../../bus';
import eInput from '../../components/Elements/e-input/e-input.vue';
import eTextarea from '../../components/Elements/e-textarea/e-textarea.vue';
import eButton from '../../components/Elements/e-button/e-button.vue';

export default {
  name: 'BoardForm',
  components: {
    eSpinner,
    eInput,
    eTextarea,
    eButton,
  },
  data() {
    return {
      // form data
      id: null,
      name: '',
      image: '',
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
    image: {
      maxLength: helpers.withParams({ message: { path: 'error.tooLong', args: { max: 255 } } }, maxLength(255)),
      serverError: serverError('description'),
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
        api_url: this.isNewRecord ? '/boards' : `/boards/${this.id}`,
        method: this.isNewRecord ? 'post' : 'put',
        data: {
          name: this.name,
          image: this.image,
        },
      })
        .then(() => {
          bus.fetchBoards();
          this.$store.commit('toggle_board_modal', false);
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
      this.image = '';
    },
    close() {
      this.reset();
      this.$store.commit('toggle_board_modal', false);
    },
    remove() {
      this.isRemoving = true;

      this.$store.dispatch('save', {
        api_url: `/boards/${this.id}`,
        method: 'delete',
      })
        .then(() => {
          bus.fetchBoards();
          localStorage.removeItem('active_board_id');
          this.close();
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

    bus.$on('edit-board', (item) => {
      this.id = item.id;
      this.name = item.name;
      this.image = item.image;
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
