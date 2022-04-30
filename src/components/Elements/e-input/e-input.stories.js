import eInput from './e-input.vue';
import dummyData from './e-input.data';

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
  template: '<e-input v-bind="$props" />',
});

export const InputField = Template.bind({});
InputField.args = {
  ...dummyData,
  vObj: { $error: false, $dirty: false },
};

export const inputFieldWithErrorMessage = Template.bind({});
inputFieldWithErrorMessage.args = {
  ...dummyData,
  vObj: { $error: true },
};
