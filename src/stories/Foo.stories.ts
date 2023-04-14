import type { Meta, StoryObj } from '@storybook/vue3';
import { component } from '../../dist/vue.esm';

const meta = {
  title: 'Smarty/Foo',
};

export default meta;
type Story = StoryObj<typeof meta>;

const Template = (args: any) => component('foo.tpl', {
  data() {
    return args;
  }
});

export const Default = Template.bind({});
Default.args = {
  'hello': 'mario'
};
