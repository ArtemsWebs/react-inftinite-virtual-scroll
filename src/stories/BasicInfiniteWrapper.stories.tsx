import type { Meta, StoryObj } from '@storybook/react';

import BasicInfiniteWrapper from '../components/BasicInfinityWrapper/BasicInfiniteWrapper';
import {
  mockChildren,
  mockData,
  mockRequestDataLink,
} from '../mock/BaseInfiniteWrapper';
import { useCallback, useRef, useState } from 'react';
import { faker } from '@faker-js/faker';

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

export const InfinityScrollBase: Story = {
  args: {
    positionMode: 'lastChild',
    selectItemVisibleHandler: () => alert('Выполнился хендлер'),
  },
  render: function Render(args) {
    return (
      <BasicInfiniteWrapper {...args}>{mockChildren}</BasicInfiniteWrapper>
    );
  },
};

export const InfinityScrollFetchData: Story = {
  args: {
    positionMode: 'lastChild',
  },
  render: function Render(args) {
    const [linkIndex, setLinkIndex] = useState(1);
    const [linkIndexDirection, setLinkIndexDirection] = useState(true);

    const [localMockChildren, setLocalMockChildren] = useState(
      mockRequestDataLink.map((link, index) => {
        return (
          <img
            key={faker.commerce.isbn()}
            src={link}
            width={'128px'}
            height={'128px'}
          />
        );
      })
    );

    const selectItemVisibleHandler = useCallback(async () => {
      const actualData = await mockData(linkIndex);
      setLocalMockChildren((prevState) => [
        ...prevState,
        ...actualData.map((link, index) => {
          return (
            <img
              key={faker.commerce.isbn()}
              src={link}
              width={'128px'}
              height={'128px'}
            />
          );
        }),
      ]);
      if (linkIndexDirection) {
        setLinkIndex((prevState) => prevState + 1);
      } else {
        setLinkIndex((prevState) => prevState - 1);
      }
      if (linkIndex >= 0 && linkIndex < 2) {
        setLinkIndexDirection(true);
      } else if (linkIndex >= 2) {
        setLinkIndexDirection(false);
      }
    }, [linkIndex, linkIndexDirection]);

    return (
      <BasicInfiniteWrapper
        {...args}
        selectItemVisibleHandler={async () => await selectItemVisibleHandler()}
      >
        {localMockChildren}
      </BasicInfiniteWrapper>
    );
  },
};
