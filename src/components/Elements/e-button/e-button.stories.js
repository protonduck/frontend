import eButton from './e-button.vue';
import buttonData from './e-button.data';

export default {
  title: 'Elements/Form/Button',
  component: eButton,
  argTypes: {},
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { eButton },
  template: '<e-button v-bind="$props">Save</e-button>',
});

export const Default = Template.bind({});
Default.args = { ...buttonData };
