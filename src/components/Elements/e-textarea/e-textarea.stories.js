import eTextarea from './e-textarea.vue';
import dummyData from './e-texterea.data';

export default {
  title: 'Elements/Form/Textarea',
  component: eTextarea,
  argTypes: {}
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { eTextarea },
  template: '<e-textarea v-bind="$props" />'
});

export const InputField = Template.bind({});
InputField.args = {
  ...dummyData,
  vObj: { $error: false, $dirty: false }
};

export const inputFieldWithErrorMessage = Template.bind({});
inputFieldWithErrorMessage.args = {
  ...dummyData,
  vObj: { $error: true }
};
