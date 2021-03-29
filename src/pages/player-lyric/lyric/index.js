import React, { memo, useCallback, useEffect } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { Slider } from 'antd';

import { LyricWrapper } from './style';
import useLikeSong from '@/hooks/likeSongHook';
import { getSizeImage, formatMinuteSecond } from '@/utils/format-utils.js';
import ButtonIcon from '@/components/button-icon';
import { PLAYMODE } from '@/assets/js/config';
import ScrollLyric from './scroll-lyric';
import {
  changeFullScreenAction,
  changeProgerssAction,
  changeIsChangeAction,
  switchCurrentSongAction,
  changeIsPlayingAction,
  changeVolumeAction,
  setPlayModeAction,
} from '@/store/player/actionCreators';

export default memo(function Lyric(props) {
  const audioRef = props.audio;
  const [isLikeSong, toggleIsLikeSong] = useLikeSong();

  const { fullScreen, currentSong, progress, isPlaying, volume, playMode } = useSelector(
    (state) => ({
      fullScreen: state.getIn(['player', 'fullScreen']),
      currentSong: state.getIn(['player', 'currentSong']),
      progress: state.getIn(['player', 'progress']),
      isPlaying: state.getIn(['player', 'isPlaying']),
      volume: state.getIn(['player', 'volume']),
      playMode: state.getIn(['player', 'playMode']),
    }),
    shallowEqual
  );
  const dispatch = useDispatch();

  const imageUrl = getSizeImage(currentSong.al?.picUrl, 512);

  // 歌曲 Slider  事件
  const sliderChange = useCallback(
    (value) => {
      dispatch(changeIsChangeAction(true));
      dispatch(changeProgerssAction(value));
    },
    [dispatch]
  );
  // 歌曲 Slider  事件
  const sliderAfterChange = useCallback(
    (value) => {
      dispatch(changeIsChangeAction(false));
      audioRef.current.currentTime = value / 1000;
      dispatch(changeProgerssAction(value));
    },
    [audioRef, dispatch]
  );
  // 控制歌曲的播放暂停
  const playMusic = useCallback(() => {
    dispatch(changeIsPlayingAction(!isPlaying));
    isPlaying ? audioRef.current.pause() : audioRef.current.play();
  }, [isPlaying, audioRef, dispatch]);

  // 切换歌曲
  const switchSong = useCallback(
    (flag) => {
      dispatch(switchCurrentSongAction(flag));
    },
    [dispatch]
  );

  // 切换 歌词 大小屏
  const switchFullScreen = useCallback(() => {
    dispatch(changeFullScreenAction(!fullScreen));
  }, [fullScreen, dispatch]);

  // 根据声音大小获取声音的图标
  function getVolumeIcon(volume) {
    if (volume >= 80) {
      return 'icon-sound-max-full';
    } else if (volume > 0) {
      return 'icon-soound-min-full';
    } else {
      return 'icon-mute-full';
    }
  }
  // 切换播放模式
  const changePlayMode = function () {
    let nextMode = playMode + 1;
    if (nextMode >= 3) nextMode = 0;
    dispatch(setPlayModeAction(nextMode));
  };
  // 获取播放模式的图标
  const getPlayModeIcon = function () {
    if (playMode === PLAYMODE.loop) {
      return 'iconfont icon-danquxunhuan';
    } else if (playMode === PLAYMODE.random) {
      return 'iconfont icon-random-solid';
    } else {
      return 'iconfont icon-order-play-line';
    }
  };
  // 点击声音图标的时候切换声音方法
  const changeVolume = useCallback(
    (volume) => {
      if (volume === 100) {
        dispatch(changeVolumeAction(0));
        audioRef.current.volume = 0;
      } else if (volume >= 50) {
        dispatch(changeVolumeAction(100));
        audioRef.current.volume = 1;
      } else {
        dispatch(changeVolumeAction(50));
        audioRef.current.volume = 0.5;
      }
    },
    [audioRef, dispatch]
  );
  return (
    <LyricWrapper>
      <div className="left-side">
        <div className="wrapper">
          <div className="cover">
            <div className="cover-container">
              <img src={imageUrl} alt="" />
              <div
                className="shadow"
                style={{ backgroundImage: `url(${imageUrl})` }}
              ></div>
            </div>
          </div>

          <div className="controls">
            <div className="top-part">
              <div className="track-info">
                <div className="title">
                  <span>{currentSong.name}</span>
                </div>
                <div className="subtitle">
                  <span>
                    {currentSong.ar[0].name} - {currentSong.al.name}
                  </span>
                </div>
              </div>
              <div className="buttons">
                <ButtonIcon onClick={(e) => toggleIsLikeSong(e)}>
                  <i
                    className={
                      isLikeSong ? 'iconfont icon-love-b' : 'iconfont icon-love-b1'
                    }
                  />
                </ButtonIcon>
              </div>
            </div>
            <div className="progress-bar">
              <span>{formatMinuteSecond(progress)}</span>
              <div className="slider">
                <Slider
                  dots={false}
                  value={progress}
                  max={currentSong.dt}
                  tipFormatter={null}
                  onChange={sliderChange}
                  onAfterChange={sliderAfterChange}
                />
              </div>
              <span>{formatMinuteSecond(currentSong.dt)}</span>
            </div>
            <div className="media-controls">
              <ButtonIcon onClick={(e) => changeVolume(volume)}>
                <i className={['iconfont', getVolumeIcon(volume)].join(' ')} />
              </ButtonIcon>

              <div className="middle">
                <ButtonIcon onClick={(e) => switchSong(-1)}>
                  <i className="iconfont icon-shangyishouweidianji" />
                </ButtonIcon>
                <ButtonIcon onClick={(e) => playMusic()}>
                  <i
                    className={[
                      'iconfont play',
                      isPlaying ? 'icon-zanting1' : 'icon-zanting',
                    ].join(' ')}
                  />
                </ButtonIcon>
                <ButtonIcon onClick={(e) => switchSong(1)}>
                  <i className="iconfont icon-xiayishouweidianji" />
                </ButtonIcon>
              </div>
              <ButtonIcon onClick={(e) => changePlayMode()}>
                <i className={getPlayModeIcon()} />
              </ButtonIcon>
            </div>
          </div>
        </div>
      </div>
      <div className="right-side">
        <ScrollLyric {...props} />
      </div>
      <div className="close-button" onClick={(e) => switchFullScreen()}>
        <button>
          <i className="iconfont icon-icon-arrow-bottom2" />
        </button>
      </div>
    </LyricWrapper>
  );
});
