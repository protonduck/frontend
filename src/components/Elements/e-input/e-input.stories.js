import eInput from './e-input.vue';

export default {
  title: 'Elements/Form/Input',
  component: eInput,
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

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { eInput },
  template: '<e-input v-bind="$props"><template #error><div class="invalid-feedback">Error</div></template></e-input>',
});

const params = { id: 'name', type: 'text', labelText: 'Name' };

export const InputField = Template.bind({});
InputField.args = {
  ...params,
  vObj: { $error: false, $dirty: false },
};

export const inputFieldWithErrorMessage = Template.bind({});
inputFieldWithErrorMessage.args = {
  ...params,
  vObj: { $error: true },
};
