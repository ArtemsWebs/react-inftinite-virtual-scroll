import type { Meta, StoryObj } from '@storybook/react';

import BasicInfiniteWrapper from '../components/BasicInfinityWrapper/BasicInfiniteWrapper';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta: Meta<typeof BasicInfiniteWrapper> = {
  title: 'Example/BasicInfiniteWrapper',
  component: BasicInfiniteWrapper,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  argTypes: {
    positionMode: {
      options: ['lastChild', 'middleChild', 'firstChild'],
      control: { type: 'select' },
      defaultValue: 'firstChild',
      name: 'positionMode',
      description:
        'Пред настроенная позиция элемента в массиве, поддерживает 3 варианта: 1) "lastChild", ref вешается на последний элемент списка, ' +
        '2) "middleChild", ref вешается на средний элемент если кол-во элементов четное, округляются в большую сторону если кол-во элементов нечетное, ' +
        '3) "firstChild", ref вешается на первый элемент в массиве',
    },
    Skeleton: {
      control: 'object',
      name: 'Skeleton',
      description:
        'Если вы хотите добавить, кастомный скелетон, этот пропс для вас! =)',
    },
    itemRef: {
      control: 'object',
      name: 'ItemRef',
      description: 'Позволяет обрабатывать событий на кастомном элементе',
    },
    delay: {
      control: 'number',
      name: 'delay',
      description: 'Задержка перед вызовом "selectItemVisibleHandler"',
    },
    selectItemVisibleHandler: {
      control: 'object',
      name: 'selectItemVisibleHandler',
      description:
        'Функция с вашим кастомным действием, которое вы хотите совершить при пересечение scroll с вашим объектом',
    },
  },
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
};

export default meta;
type Story = StoryObj<typeof BasicInfiniteWrapper>;

const mockChildren = (
  <>
    <img
      src="https://cdn3.emoji.gg/emojis/4496-brown-jump.gif"
      width="128px"
      height="128px"
      alt="brown_jump"
    />
    <img
      src="https://cdn3.emoji.gg/emojis/4496-brown-jump.gif"
      width="128px"
      height="128px"
      alt="brown_jump"
    />
    <img
      src="https://cdn3.emoji.gg/emojis/4496-brown-jump.gif"
      width="128px"
      height="128px"
      alt="brown_jump"
    />
    <img
      src="https://cdn3.emoji.gg/emojis/4496-brown-jump.gif"
      width="128px"
      height="128px"
      alt="brown_jump"
    />
    <img
      src="https://cdn3.emoji.gg/emojis/4496-brown-jump.gif"
      width="128px"
      height="128px"
      alt="brown_jump"
    />
    <img
      src="https://cdn3.emoji.gg/emojis/4496-brown-jump.gif"
      width="128px"
      height="128px"
      alt="brown_jump"
    />
    <img
      src="https://cdn3.emoji.gg/emojis/4496-brown-jump.gif"
      width="128px"
      height="128px"
      alt="brown_jump"
    />
    <img
      src="https://cdn3.emoji.gg/emojis/4496-brown-jump.gif"
      width="128px"
      height="128px"
      alt="brown_jump"
    />
    <img
      src="https://cdn3.emoji.gg/emojis/4496-brown-jump.gif"
      width="128px"
      height="128px"
      alt="brown_jump"
    />
    <img
      src="https://cdn3.emoji.gg/emojis/4496-brown-jump.gif"
      width="128px"
      height="128px"
      alt="brown_jump"
    />
    <img
      src="https://cdn3.emoji.gg/emojis/4496-brown-jump.gif"
      width="128px"
      height="128px"
      alt="brown_jump"
    />
  </>
);

export const InfinityScroll: Story = {
  args: {
    positionMode: 'lastChild',
    delay: 1000,
    selectItemVisibleHandler: () => alert('Выполнился хендлер'),
  },
  render: function Render(args) {
    return (
      <BasicInfiniteWrapper {...args}>{mockChildren}</BasicInfiniteWrapper>
    );
  },
};
