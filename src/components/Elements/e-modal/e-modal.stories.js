import eModal from './e-modal.vue';

export default {
  title: 'Elements/Mix/Modal',
  component: eModal
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { eModal },
  template: '<e-modal><div slot="content">Test modal</div></e-modal>'
});

export const Primary = Template.bind({});
