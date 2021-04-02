import React, { memo, useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';

import { ScrollLyricWrapper } from './style';
import { changeProgerssAction } from '@/store/player/actionCreators';
import Scroll from '@/components/scroll';

export default memo(function ScrollLyric(props) {
  const scrollRef = useRef();
  const lyricRef = useRef();
  const [activeIndex, setActiveIndex] = useState(-1);

  const { lyric, progress } = useSelector((state) => state.player, shallowEqual);
  const dispatch = useDispatch();

  useEffect(() => {
    document.querySelector('body').style.overflow = 'hidden';
    return () => {
      document.querySelector('body').style.overflow = 'initial';
    };
  }, []);

  useEffect(() => {
    let index = lyric.seek(progress / 1000);
    if (index !== activeIndex) {
      // 上面 预留三个歌词
      if (index > 3) {
        scrollRef.current.scrollToElement(lyricRef.current.childNodes[index - 3]);
      } else {
        scrollRef.current.scrollTo(0, 0);
      }
      setActiveIndex(index);
    }
  }, [lyric, progress, activeIndex]);

  // 点击歌词去切换 歌曲进度
  function changeProgressWidthLyric(lyric) {
    dispatch(changeProgerssAction(lyric.time * 1000));
    props.audio.current.currentTime = lyric.time;
  }

  const fontSize = lyric.tlyric.length > 0 ? '22px' : '30px';
  // const block = lyric.lyric.length === 0 ? '歌词加载中...' : '';

  return (
    <Scroll data={lyric} ref={scrollRef}>
      <ScrollLyricWrapper size={fontSize} className="lyric-content" ref={lyricRef}>
        {lyric.lyricWithTranslation.map((line, index) => {
          return (
            <div
              key={index}
              className={['line', activeIndex === index ? 'active' : ''].join(' ')}
              onClick={(e) => changeProgressWidthLyric(line)}
              // ref={(ref) => logref(ref)}
            >
              <span>
                {line.contents[0]}
                {line.contents[1] ? <br /> : ''}
                {line?.contents[1]}
              </span>
            </div>
          );
        })}
      </ScrollLyricWrapper>
    </Scroll>
  );
});
