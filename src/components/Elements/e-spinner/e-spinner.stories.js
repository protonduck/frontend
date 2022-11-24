import eSpinner from './e-spinner.vue';

export default {
  title: 'Elements/Mix/Spinner',
  component: eSpinner,
  argTypes: {
    state: {
      control: { type: 'select' },
      options: [true, false]
    }
  }
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { eSpinner },
  template: '<e-spinner v-bind="$props" />'
});

export const Primary = Template.bind({});
Primary.args = {
  state: true
};
