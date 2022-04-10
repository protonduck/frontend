import Spinner from './Spinner.vue';

export default {
  title: 'Elements/Mix/Spinner',
  component: Spinner,
  argTypes: {
    state: {
      control: { type: 'select' },
      options: [true, false],
    },
  },
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { Spinner },
  template: '<spinner v-bind="$props" />',
});

export const Primary = Template.bind({});
Primary.args = {
  state: true,
};
