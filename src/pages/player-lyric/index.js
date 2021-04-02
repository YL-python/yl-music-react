import React, { memo, useEffect, useRef } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';

import Hidden from '@/components/hidden';
import YLPlayer from './player';
import YLLyric from './lyric';
import { getSongUrl } from '@/service/song.js';
import { PLAYMODE } from '@/assets/js/config';
import {
  changeProgerssAction,
  changeIsPlayingAction,
  switchCurrentSongAction,
} from '@/store/player/actionCreators';

export default memo(function PlayerAndLyric() {
  const audioRef = useRef();

  const { currentSong, playMode, fullScreen, isChange, progress, volume } = useSelector(
    (state) => state.player,
    shallowEqual
  );
  const dispatch = useDispatch();

  // 初始化  获取 url播放歌曲
  useEffect(() => {
    audioRef.current.src = getSongUrl(currentSong.id);
    // audioRef.current.currentTime = progress;
    audioRef.current.volume = volume / 100;
    dispatch(changeProgerssAction(0));
    audioRef.current
      .play()
      .then((res) => {
        dispatch(changeIsPlayingAction(true));
      })
      .catch((err) => {
        dispatch(changeIsPlayingAction(false));
      });
  }, [currentSong, dispatch]);

  // 监听 audit 播放时间事件
  function timeUpdate(e) {
    if (!isChange) {
      let currentTime = e.target.currentTime * 1000;
      dispatch(changeProgerssAction(currentTime));
    }
  }
  // 歌曲播放完毕事件
  function handleMusicEnded() {
    if (playMode === PLAYMODE.loop) {
      audioRef.current.currentTime = 0;
      audioRef.current.play();
    } else {
      dispatch(switchCurrentSongAction(1));
    }
    dispatch(changeProgerssAction(0));
  }

  return (
    <>
      <YLPlayer audio={audioRef} />

      <Hidden show={fullScreen}>
        <YLLyric audio={audioRef} />
      </Hidden>
      <audio
        ref={audioRef}
        onTimeUpdate={(e) => timeUpdate(e)}
        onEnded={(e) => handleMusicEnded()}
      />
    </>
  );
});
