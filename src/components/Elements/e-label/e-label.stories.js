import eLabel from './e-label.vue';
import dummyData from './e-label.data';

export default {
  title: 'Elements/Form/Label',
  component: eLabel,
  argTypes: {},
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { eLabel },
  template: '<e-label v-bind="$props" />',
});

export const Default = Template.bind({});
Default.args = { ...dummyData };
