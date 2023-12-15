import {
  PropsWithChildren,
  ReactNode,
  RefObject,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';

type PositionMode = 'lastChild' | 'middleChild' | 'firstChild';

export interface BasicInfiniteWrapperProps {
  positionMode?: PositionMode;
  Skeleton?: ReactNode;
  itemRef?: RefObject<HTMLElement>;
  selectItemVisibleHandler?: () => void;
  delay?: number;
}

const getSelectNode = (childrenNodes?: HTMLCollection, mode?: PositionMode) => {
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

const BasicInfiniteWrapper = ({
  positionMode,
  itemRef,
  selectItemVisibleHandler,
  delay,
  children,
}: PropsWithChildren<BasicInfiniteWrapperProps>) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [handlerFlag, setHandlerFlag] = useState(true);
  let refedPositionMode = useRef<PositionMode | null>(positionMode ?? null);
  let refedTimerId = useRef<NodeJS.Timeout | null>(null);
  useEffect(() => {
    if (positionMode !== refedPositionMode.current && !handlerFlag) {
      refedPositionMode.current = positionMode ?? null;
      setHandlerFlag(true);
    }
  }, [positionMode, handlerFlag]);

  const innerLogicFunc = useCallback(() => {
    const selectNode = itemRef
      ? itemRef.current
      : getSelectNode(wrapperRef?.current?.children, positionMode);

    const selectedNodeRect = selectNode?.getBoundingClientRect();

    let isVisibleElem = false;

    if (selectedNodeRect)
      isVisibleElem =
        selectedNodeRect?.top > 0 &&
        selectedNodeRect.left > 0 &&
        selectedNodeRect.top <=
          (window.innerHeight || document.documentElement.clientHeight) &&
        selectedNodeRect.right <=
          (window.innerWidth || document.documentElement.clientWidth);

    if (isVisibleElem && handlerFlag) {
      if (delay) {
        if (refedTimerId.current) clearTimeout(refedTimerId.current);
        refedTimerId.current = setTimeout(
          () => selectItemVisibleHandler?.(),
          delay
        );
      } else {
        selectItemVisibleHandler?.();
      }
      setHandlerFlag(false);
    }
  }, [handlerFlag, selectItemVisibleHandler, positionMode, delay]);

  useEffect(() => {
    window.removeEventListener('scroll', innerLogicFunc);
    window.addEventListener('scroll', innerLogicFunc);
    return () => {
      return window.removeEventListener('scroll', innerLogicFunc);
    };
  }, [innerLogicFunc]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }} ref={wrapperRef}>
      {children}
    </div>
  );
};

export default BasicInfiniteWrapper;
