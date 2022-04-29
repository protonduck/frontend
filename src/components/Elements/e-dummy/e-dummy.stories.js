import eDummy from './e-dummy.vue';
import dummyData from './e-dummy.data';

export default {
  title: 'Elements/Dummy',
  component: eDummy,
  argTypes: {},
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { eDummy },
  template: '<e-dummy v-bind="$props" />',
});

export const Dummy = Template.bind({});
Dummy.args = { ...dummyData };
