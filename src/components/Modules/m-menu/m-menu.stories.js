import mMenu from './m-menu.vue';
import dummyData from './m-menu.data';

export default {
  title: 'Modules/Menu',
  component: mMenu,
  argTypes: {
    isLoggedIn: {
      control: { type: 'select' },
      options: [true, false],
    },
  },
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { mMenu },
  template: '<m-menu v-bind="$props"><template #slot1>Slot 1</template><template #slot2>Slot 2</template></m-menu>',
});

export const Menu = Template.bind({});
Menu.args = { ...dummyData };
