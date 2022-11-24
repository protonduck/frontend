import eSelect from './e-select.vue';
import dummyData from './e-select.data';

export default {
  title: 'Elements/Form/Select',
  component: eSelect,
  argTypes: {}
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { eSelect },
  template: '<e-select v-bind="$props" />'
});

export const Select = Template.bind({});
Select.args = {
  ...dummyData,
  vObj: { $error: false, $dirty: false }
};

export const SelectWithErrorMessage = Template.bind({});
SelectWithErrorMessage.args = {
  ...dummyData,
  vObj: { $error: true }
};
