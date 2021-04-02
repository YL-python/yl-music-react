import React, { memo, useRef, useEffect, useState, useCallback } from 'react';
import { Slider, Tooltip } from 'antd';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';

import useLikeSong from '@/hooks/likeSongHook';

import { getSongArtists, getSizeImage, formatMinuteSecond } from '@/utils/format-utils';
import { getSongUrl } from '@/service/song.js';
import { PlayerWrapper } from './style';
import ButtonIcon from '@/components/button-icon';
import { PLAYMODE } from '@/assets/js/config';
import {
  setPlayModeAction,
  switchCurrentSongAction,
  changeFullScreenAction,
} from '@/store/player/actionCreators';

export default memo(function Player() {
  const audioRef = useRef();
  const [isPlaying, setIsPlaying] = useState(false);
  const [isChange, setIsChange] = useState(false);
  const [isLikeSong, toggleIsLikeSong] = useLikeSong();
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(50);

  const { currentSong, playMode, fullScreen } = useSelector(
    (state) => state.player,
    shallowEqual
  );
  const dispatch = useDispatch();
  // 初始化  获取 url播放歌曲
  useEffect(() => {
    audioRef.current.src = getSongUrl(currentSong.id);
    audioRef.current.volume = 0.5;
    audioRef.current
      .play()
      .then((res) => {
        setIsPlaying(true);
      })
      .catch((err) => {
        setIsPlaying(false);
      });
  }, [currentSong]);

  // 监听 audit 播放时间事件
  function timeUpdate(e) {
    if (!isChange) {
      let currentTime = e.target.currentTime * 1000;
      setProgress(currentTime);
    }
  }
  // 歌曲播放完毕事件
  function handleMusicEnded() {
    if (playMode === PLAYMODE.loop) {
      audioRef.current.currentTime = 0;
      audioRef.current.play();
    } else {
      switchSong(1);
    }
    setProgress(0);
  }
  // 控制歌曲的播放暂停
  const playMusic = useCallback(() => {
    setIsPlaying(!isPlaying);
    isPlaying ? audioRef.current.pause() : audioRef.current.play();
  }, [isPlaying]);

  // 歌曲进度条的时间提示的格式化时间函数
  const tipFormatterFun = useCallback((value) => {
    return formatMinuteSecond(value);
  }, []);

  // 歌曲 Slider  事件
  const sliderChange = useCallback((value) => {
    setIsChange(true);
    setProgress(value);
  }, []);
  // 歌曲 Slider  事件
  const sliderAfterChange = useCallback(
    (value) => {
      setIsChange(false);
      audioRef.current.currentTime = value / 1000;
      setProgress(value);
    },
    [audioRef]
  );
  // 声音 Slider  事件
  const volumeChange = useCallback(
    (value) => {
      audioRef.current.volume = value / 100;
      setVolume(value);
    },
    [audioRef]
  );
  // 声音 Slider  事件
  const volumeAfterChange = useCallback(
    (value) => {
      audioRef.current.volume = value / 100;
      setVolume(value);
    },
    [audioRef]
  );
  // 点击声音图标的时候切换声音方法
  const changeVolume = useCallback(
    (volume) => {
      if (volume === 100) {
        setVolume(0);
        audioRef.current.volume = 0;
      } else if (volume >= 50) {
        setVolume(100);
        audioRef.current.volume = 1;
      } else {
        setVolume(50);
        audioRef.current.volume = 0.5;
      }
    },
    [audioRef]
  );

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

  // 常量 （vue中的计算属性？？）
  const playModeText = PLAYMODE.getPlayModeText(playMode);
  return (
    <PlayerWrapper show={currentSong?.name}>
      <Slider
        dots={false}
        value={progress}
        max={currentSong.dt}
        tipFormatter={tipFormatterFun}
        onChange={sliderChange}
        onAfterChange={sliderAfterChange}
      />
      <div className="controls wrap-v1">
        <div className="playing">
          <img src={getSizeImage(currentSong.al?.picUrl, 128)} alt="" />
          <div className="song-info">
            <div className="name" title={currentSong?.name}>
              {currentSong?.name}
            </div>
            <a href="#/" className="artist" title={getSongArtists(currentSong.ar)}>
              {getSongArtists(currentSong.ar)}
            </a>
          </div>
          <div className="like-button">
            <ButtonIcon onClick={(e) => toggleIsLikeSong(e)}>
              <i
                className={isLikeSong ? 'iconfont icon-love-b' : 'iconfont icon-love-b1'}
              />
            </ButtonIcon>
          </div>
        </div>
        <div className="middle-control-buttons">
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
        <div className="right-control-buttons">
          <ButtonIcon>
            <i className="iconfont icon-list" />
          </ButtonIcon>
          <Tooltip title={playModeText} key="playMode">
            <ButtonIcon onClick={(e) => changePlayMode()}>
              <i className={getPlayModeIcon()} />
            </ButtonIcon>
          </Tooltip>
          <div className="volume-control">
            <Tooltip title={volume} key="volume">
              <ButtonIcon onClick={(e) => changeVolume(volume)}>
                <i className={['iconfont', getVolumeIcon(volume)].join(' ')} />
              </ButtonIcon>
            </Tooltip>
            <Slider
              dots={false}
              value={volume}
              max={100}
              onChange={volumeChange}
              onAfterChange={volumeAfterChange}
            />
          </div>
          <Tooltip title="查看歌词" key="lyric">
            <ButtonIcon onClick={(e) => switchFullScreen()}>
              <i className="iconfont icon-icon-arrow-top2" />
            </ButtonIcon>
          </Tooltip>
        </div>
      </div>
      <audio
        ref={audioRef}
        onTimeUpdate={(e) => timeUpdate(e)}
        onEnded={(e) => handleMusicEnded()}
      />
    </PlayerWrapper>
  );
});
