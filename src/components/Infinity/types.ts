import { HTMLProps, RefObject } from 'react';

export interface BasicInfiniteProps
  extends Omit<HTMLProps<HTMLDivElement>, 'itemRef'> {
  positionMode?: PositionMode;
  itemRef?: RefObject<HTMLElement>;
  selectItemVisibleHandler?: () => void | Promise<void>;
  delay?: number;
  itemPercentVisible?: number;
}

export type PositionMode = 'lastChild' | 'middleChild' | 'firstChild';
