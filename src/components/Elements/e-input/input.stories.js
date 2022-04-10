import PDInput from './Input.vue';

export default {
  title: 'Elements/Form/Input',
  component: PDInput,
  argTypes: {
    type: {
      control: { type: 'select' },
      options: ['text', 'password', 'email'],
    },
    autocomplete: {
      control: { type: 'select' },
      options: ['off', 'email', 'new-password', 'current-password', 'username'],
    },
  },
};

// input

const InputFieldArgs = {
  id: 'name',
  vObj: { $error: false, $dirty: false },
  type: 'text',
  labelText: 'Name',
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { PDInput },
  template: '<PDInput v-bind="$props" />',
});

export const InputField = Template.bind({});
InputField.args = InputFieldArgs;

// input with error message

const withErrorTemplate = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { PDInput },
  template: '<PDInput v-bind="$props"><template #error><div class="invalid-feedback">Error</div></template></PDInput>',
});

const InputFieldWithErrorArgs = {
  id: 'name',
  vObj: { $error: true },
  type: 'text',
  labelText: 'Name',
};

export const inputFieldWithErrorMessage = withErrorTemplate.bind({});
inputFieldWithErrorMessage.args = InputFieldWithErrorArgs;