<template>
  <div class="card bg-light">
    <div class="card-header" v-text="$t(isNewRecord ? 'form.board.add' : 'form.board.update')">
    </div>
    <div class="card-body">
      <form method="post" @submit.prevent="submit">
        <div class="form-group">
          <label for="board-name">{{ $t('form.board.name') }}</label>
          <input
            id="board-name"
            v-model.trim="$v.name.$model"
            :class="validationCssClass($v.name)"
            autocomplete="off"
            class="form-control"
            type="text"
            @keydown="filterErrors('name')"
          >
          <template v-for="(validator, validatorName, index) in $v.name.$params">
            <div
              v-if="!$v.name[validatorName]"
              :key="index"
              v-t="validator && validator.message ? validator.message : validator"
              class="invalid-feedback"
            />
          </template>
        </div>
        <div class="form-group">
          <label for="board-image">
            {{ $t('form.board.image') }}
          </label>
          <textarea
            id="board-image"
            v-model.trim="$v.image.$model"
            :class="validationCssClass($v.image)"
            class="form-control"
            rows="2"
            type="text"
            @keydown="filterErrors('image')"
          ></textarea>
          <template v-for="(validator, validatorName, index) in $v.image.$params">
            <div
              v-if="!$v.image[validatorName]"
              :key="index"
              v-t="validator && validator.message ? validator.message : validator"
              class="invalid-feedback"
            />
          </template>
        </div>
        <div class="form-group">
          <button :disabled="isSaving" class="btn btn-success mr-2" type="submit">
            <spinner :state="isSaving">
              <i :class="['fas', isNewRecord ? 'fa-plus-square' : 'fa-save']"></i>
            </spinner>
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
            <spinner :state="isRemoving">
              <i class="fas fa-trash-alt"></i>
            </spinner>
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
import BoardService from '../../services/BoardService';
import Spinner from '../../components/misc/Spinner.vue';

export default {
  name: 'BoardForm',
  components: { Spinner },
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

      this.$store.dispatch('boardSave', {
        url: this.isNewRecord ? '/boards' : `/boards/${this.id}`,
        method: this.isNewRecord ? 'post' : 'put',
        name: this.name,
        image: this.image,
      })
        .then(() => {
          BoardService.fetchBoards();
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

      this.$store.dispatch('categorySave', {
        url: `/boards/${this.id}`,
        method: 'delete',
      })
        .then(() => {
          BoardService.fetchBoards();
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

    BoardService.$on('edit', (item) => {
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
