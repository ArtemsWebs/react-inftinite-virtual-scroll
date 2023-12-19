import { PropsWithChildren, useEffect, useMemo, useRef } from 'react';
import { BasicInfiniteProps } from '../types';
import { getSelectNode } from '../utils';

const IntersectionInfiniteWrapper = ({
  itemRef,
  positionMode,
  itemPercentVisible = 0,
  selectItemVisibleHandler,
  children,
}: PropsWithChildren<BasicInfiniteProps>) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const observer = useMemo(
    () =>
      new IntersectionObserver(
        (entries, observer) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              selectItemVisibleHandler?.();
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: itemPercentVisible * 0.01 }
      ),
    []
  );

  useEffect(() => {
    const selectNode = itemRef
      ? itemRef.current
      : getSelectNode(wrapperRef?.current?.children, positionMode);

    if (selectNode) observer.observe(selectNode);

    return () => observer.disconnect();
  }, [observer, positionMode, itemRef]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }} ref={wrapperRef}>
      {children}
    </div>
  );
};
export default IntersectionInfiniteWrapper;
