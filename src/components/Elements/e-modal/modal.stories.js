import Modal from './Modal.vue';

export default {
  title: 'Elements/Mix/Modal',
  component: Modal,
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { Modal },
  template: '<modal><div slot="content">Test modal</div></modal>',
});

export const Primary = Template.bind({});
