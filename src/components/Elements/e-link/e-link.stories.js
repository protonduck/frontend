import eLink from './e-link.vue';
import eLinkData from './e-link.data';

export default {
  title: 'Elements/Mix/Link',
  component: eLink,
  argTypes: {}
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { eLink },
  template: '<e-link v-bind="$props">Link</e-link>'
});

export const Link = Template.bind({});
Link.args = { ...eLinkData };
