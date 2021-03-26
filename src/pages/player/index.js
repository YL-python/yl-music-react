import React, { memo, useRef, useEffect, useState, useCallback } from 'react';
import { Slider } from 'antd';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';

import useLikeSong from '@/hooks/likeSongHook';

import { getSongArtists, getSizeImage, formatMinuteSecond } from '@/utils/format-utils';
import { getSongUrl } from '@/service/song.js';
import { PlayerWrapper } from './style';
import ButtonIcon from '@/components/button-icon';

export default memo(function Player() {
  const audioRef = useRef();
  const [isPlaying, setIsPlaying] = useState(false);
  const [isChange, setIsChange] = useState(false);
  const [isLikeSong, toggleIsLikeSong] = useLikeSong();
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(100);

  const { currentSong } = useSelector(
    (state) => ({ currentSong: state.getIn(['player', 'currentSong']) }),
    shallowEqual
  );
  useEffect(() => {
    audioRef.current.src = getSongUrl(currentSong.id);
    audioRef.current
      .play()
      .then((res) => {
        setIsPlaying(true);
      })
      .catch((err) => {
        setIsPlaying(false);
      });
  }, [currentSong]);

  function timeUpdate(e) {
    if (!isChange) {
      let currentTime = e.target.currentTime * 1000;
      setProgress(currentTime);
    }
  }
  function handleMusicEnded() {
    console.log('handleMusicEnded');
  }
  const playMusic = useCallback(() => {
    setIsPlaying(!isPlaying);
    isPlaying ? audioRef.current.pause() : audioRef.current.play();
  }, [isPlaying]);

  // 时间条的格式函数
  const tipFormatterFun = useCallback((value) => {
    return formatMinuteSecond(value);
  }, []);

  //
  const sliderChange = useCallback(
    (value) => {
      setIsChange(true);
      setProgress(value);
    },
    [setProgress]
  );

  const sliderAfterChange = useCallback(
    (value) => {
      setIsChange(false);
      audioRef.current.currentTime = value / 1000;
      setProgress(value);
    },
    [setProgress]
  );
  //
  const volumeChange = useCallback(
    (value) => {
      audioRef.current.volume = value / 100;
      setVolume(value);
    },
    [setVolume]
  );

  const volumeAfterChange = useCallback(
    (value) => {
      audioRef.current.volume = value / 100;
      setVolume(value);
    },
    [setVolume]
  );
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
    [setVolume]
  );
  function getVolumeIcon(volume) {
    if (volume >= 80) {
      return 'icon-sound-max-full';
    } else if (volume > 0) {
      return 'icon-soound-min-full';
    } else {
      return 'icon-mute-full';
    }
  }
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
          <ButtonIcon>
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
          <ButtonIcon>
            <i className="iconfont icon-xiayishouweidianji" />
          </ButtonIcon>
        </div>
        <div className="right-control-buttons">
          <ButtonIcon>
            <i className="iconfont icon-list" />
          </ButtonIcon>
          <ButtonIcon>
            <i className="iconfont icon-order-play-line" />
          </ButtonIcon>
          <div className="volume-control">
            <ButtonIcon onClick={(e) => changeVolume(volume)}>
              <i className={['iconfont', getVolumeIcon(volume)].join(' ')} />
            </ButtonIcon>
            <Slider
              dots={false}
              value={volume}
              max={100}
              onChange={volumeChange}
              onAfterChange={volumeAfterChange}
              tipFormatter={null}
            />
          </div>
          <ButtonIcon>
            <i className="iconfont icon-icon-arrow-top2" />
          </ButtonIcon>
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
