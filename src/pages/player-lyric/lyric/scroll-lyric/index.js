import React, { memo, useState, useEffect } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';

import { ScrollLyricWrapper } from './style';
import { changeProgerssAction } from '@/store/player/actionCreators';

export default memo(function ScrollLyric(props) {
  const [activeIndex, setActiveIndex] = useState(-1);
  const { lyric, progress } = useSelector(
    (state) => ({
      lyric: state.getIn(['player', 'lyric']),
      progress: state.getIn(['player', 'progress']),
    }),
    shallowEqual
  );
  const dispatch = useDispatch();

  useEffect(() => {
    document.querySelector('body').style.overflow = 'hidden';
    return () => {
      document.querySelector('body').style.overflow = 'initial';
    };
  }, []);
  useEffect(() => {
    setActiveIndex(lyric.seek(progress / 1000));
  }, [progress, lyric]);

  // 点击歌词去切换 歌曲进度
  function changeProgressWidthLyric(lyric) {
    dispatch(changeProgerssAction(lyric.time * 1000));
    props.audio.current.currentTime = lyric.time;
  }

  const fontSize = lyric.tlyric.length > 0 ? '22px' : '30px';
  const block = lyric.lyric.length === 0 ? '歌词加载中...' : '';

  return (
    <ScrollLyricWrapper size={fontSize}>
      <div className="block">{block}</div>
      {lyric.lyricWithTranslation.map((line, index) => {
        return (
          <div
            key={index}
            className={['line', activeIndex === index ? 'active' : ''].join(' ')}
            onClick={(e) => changeProgressWidthLyric(line)}
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
  );
});
