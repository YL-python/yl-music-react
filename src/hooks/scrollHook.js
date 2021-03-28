import { useEffect, useCallback } from 'react';

// 底部 相差 downOffset 距离的时候触发
const downOffset = 200;

// 滚动到底部触发
function useScrollDown(handleScrollDown) {
  const handleScroll = useCallback(
    (e) => {
      let dom = document.querySelector('html');
      let scrollHeight = Math.max(dom.scrollHeight, dom.scrollHeight);
      let scrollTop = e.target.scrollingElement.scrollTop;
      let clientHeight = dom.innerHeight || Math.min(dom.clientHeight, dom.clientHeight);
      if (clientHeight + scrollTop + downOffset >= scrollHeight) {
        handleScrollDown(e);
      }
    },
    [handleScrollDown]
  );
  useEffect(() => {
    window.addEventListener('scroll', handleScroll, true);
    return () => {
      window.removeEventListener('scroll', handleScroll, true);
    };
  }, [handleScroll]);
}

export default useScrollDown;
