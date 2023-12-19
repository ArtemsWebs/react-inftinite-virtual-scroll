import { PositionMode } from '../types';

export const getSelectNode = (
  childrenNodes?: HTMLCollection,
  mode?: PositionMode
) => {
  if (!childrenNodes || !mode) return;
  switch (mode) {
    case 'lastChild': {
      return childrenNodes[childrenNodes.length - 1];
    }
    case 'firstChild': {
      return childrenNodes[0];
    }
    case 'middleChild': {
      const middlePosition = childrenNodes.length / 2;
      if (String(middlePosition).includes('.'))
        return childrenNodes[Math.ceil(middlePosition)];
      return childrenNodes[middlePosition];
    }
    default: {
      return childrenNodes[childrenNodes.length - 1];
    }
  }
};
