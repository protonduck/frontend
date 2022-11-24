import mChangeLanguage from './m-change-language.vue';
import dummyData from './m-change-language.data';

export default {
  title: 'Modules/ChangeLanguage',
  component: mChangeLanguage,
  argTypes: {}
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { mChangeLanguage },
  template: '<m-change-language v-bind="$props" />'
});

export const Default = Template.bind({});
Default.args = { ...dummyData };
