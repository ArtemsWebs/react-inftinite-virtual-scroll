import type { Meta, StoryObj } from '@storybook/react';

import IntersectionInfiniteWrapper from '../components/Infinity/BasicInfinityWrapper/BasicInfiniteWrapper';
import { mockChildren, mockData, mockRequestDataLink } from '../mock/Infinity';
import { useCallback, useState } from 'react';
import { faker } from '@faker-js/faker';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta: Meta<typeof IntersectionInfiniteWrapper> = {
  title: 'Example/IntersectionInfiniteWrapper',
  component: IntersectionInfiniteWrapper,
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
      defaultValue: 'lastChild',
      name: 'positionMode',
      description:
        'Пред настроенная позиция элемента в массиве, поддерживает 3 варианта: 1) "lastChild", ref вешается на последний элемент списка, ' +
        '2) "middleChild", ref вешается на средний элемент если кол-во элементов четное, округляются в большую сторону если кол-во элементов нечетное, ' +
        '3) "firstChild", ref вешается на первый элемент в массиве',
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
    itemPercentVisible: {
      control: 'number',
      name: 'itemPercentVisible',
      defaultValue: 100,
      description:
        'Процент от 0-100 целочисленное значение, которое задает момент выполнение selectItemVisibleHandler в зависимости от процента видимости выбранного элемента, ' +
        'если значение не передано то по дефолту используется 0',
    },
  },
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
};

export default meta;
type Story = StoryObj<typeof IntersectionInfiniteWrapper>;

export const InfinityScrollIntersection: Story = {
  args: {
    positionMode: 'lastChild',
    selectItemVisibleHandler: () => alert('Выполнился хендлер'),
  },
  render: function Render(args) {
    return (
      <IntersectionInfiniteWrapper {...args}>
        {mockChildren}
      </IntersectionInfiniteWrapper>
    );
  },
};

export const InfinityScrollIntersectionFetchData: Story = {
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
      <IntersectionInfiniteWrapper
        {...args}
        selectItemVisibleHandler={async () => await selectItemVisibleHandler()}
      >
        {localMockChildren}
      </IntersectionInfiniteWrapper>
    );
  },
};
