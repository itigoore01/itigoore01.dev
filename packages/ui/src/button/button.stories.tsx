import { Meta, StoryObj } from '@storybook/react';
import { Loader2, Mail } from 'lucide-react';

import { Button } from '.';

const meta: Meta<typeof Button> = {
  title: 'ui/Button',
  component: Button,
  tags: ['autodocs'],
  args: {
    children: 'Button',
  },
  argTypes: {},
};
export default meta;

type Story = StoryObj<typeof Button>;

export const Base: Story = {
  args: {},
};
export const Outline: Story = {
  args: {
    variant: 'outline',
  },
};
export const Ghost: Story = {
  args: {
    variant: 'ghost',
  },
};
export const Secondary: Story = {
  args: {
    variant: 'secondary',
  },
};
export const Link: Story = {
  args: {
    variant: 'link',
  },
};
export const Loading: Story = {
  args: {
    children: (
      <>
        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        Button
      </>
    ),
    variant: 'outline',
  },
};
export const WithIcon: Story = {
  args: {
    children: (
      <>
        <Mail className="mr-2 h-4 w-4" /> Login with Email Button
      </>
    ),
    variant: 'secondary',
  },
};
