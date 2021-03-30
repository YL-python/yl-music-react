import React, {
  memo,
  useEffect,
  useState,
  forwardRef,
  useImperativeHandle,
  useRef,
} from 'react';
import BScroll from 'better-scroll';

import { ScrollWrapper } from './style';

const Scroll = forwardRef(function (props, ref) {
  const { data } = props;
  const [bscroll, setBscroll] = useState();

  const scrollRef = useRef();

  // 这里是用来让暴露子组件的方法给父组件
  useImperativeHandle(
    ref,
    () => ({
      dom: scrollRef,
      scrollToElement: (el, time = 1000) => {
        bscroll && bscroll.scrollToElement(el, time);
      },
      scrollTo: (x, y, time = 1000) => {
        bscroll && bscroll.scrollTo(x, y, time);
      },
      refresh: () => {
        bscroll && bscroll.refresh();
      },
    }),
    [bscroll]
  );

  useEffect(() => {
    let scroll = new BScroll(scrollRef.current, {
      scrollY: true,
      click: true,
      // 滚动的时候应该抛出滚动事件 禁止歌词滚动
      mouseWheel: true,
    });
    // console.log('wrapper', scrollRef.current);
    // console.log('content', scroll.content);
    setBscroll(scroll);
    return () => {
      bscroll && bscroll.destroy();
    };
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    bscroll && bscroll.refresh();
    // eslint-disable-next-line
  }, [data]);

  return (
    <ScrollWrapper className="scroll-wrapper" ref={scrollRef}>
      {props.children}
    </ScrollWrapper>
  );
});
export default memo(Scroll);
