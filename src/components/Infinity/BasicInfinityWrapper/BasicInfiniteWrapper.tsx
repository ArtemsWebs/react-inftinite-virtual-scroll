import {
  PropsWithChildren,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { isAsync } from '../../../utils/utils';
import { BasicInfiniteProps, PositionMode } from '../types';
import { getSelectNode } from '../utils';

const BasicInfiniteWrapper = ({
  positionMode,
  itemRef,
  selectItemVisibleHandler,
  delay,
  itemPercentVisible = 0,
  children,
  ...props
}: PropsWithChildren<BasicInfiniteProps>) => {
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

    if (selectedNodeRect) {
      const selectedNodeTopWithPercentVisible =
        selectedNodeRect.top +
        selectedNodeRect.width * itemPercentVisible * 0.01;

      isVisibleElem =
        selectedNodeRect?.top > 0 &&
        selectedNodeRect.left > 0 &&
        selectedNodeTopWithPercentVisible <=
          (window.innerHeight || document.documentElement.clientHeight) &&
        selectedNodeRect.right <=
          (window.innerWidth || document.documentElement.clientWidth);
    }

    if (isVisibleElem && handlerFlag) {
      if (delay) {
        if (refedTimerId.current) clearTimeout(refedTimerId.current);
        refedTimerId.current = setTimeout(
          () => selectItemVisibleHandler?.(),
          delay
        );
      } else {
        if (isAsync(selectItemVisibleHandler))
          selectItemVisibleHandler?.()?.then(() => setHandlerFlag(true));
        else {
          selectItemVisibleHandler?.();
        }
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
    <div {...props} ref={wrapperRef}>
      {children}
    </div>
  );
};

export default BasicInfiniteWrapper;
