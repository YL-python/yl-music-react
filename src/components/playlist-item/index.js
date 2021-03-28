import React, { memo } from 'react';
import { useDispatch } from 'react-redux';

import { message } from 'antd';

import { setCurrentSongAction, setPlaylistAction } from '@/store/player/actionCreators';
import useLikeSong from '@/hooks/likeSongHook';

import { getSongArtists, getSizeImage, formatMinuteSecond } from '@/utils/format-utils';
import { ItemWrapper } from './style';
import ButtonTone from '@/components/button-tone';

export default memo(function PlayListItem(props) {
  const song = props.song;
  const [isLikeSong, toggleIsLikeSong] = useLikeSong();

  const dispatch = useDispatch();
  function playSong(song) {
    if (song.playable) {
      dispatch(setPlaylistAction());
      dispatch(setCurrentSongAction(song));
    } else {
      message.error(song.reason);
    }
  }

  return (
    <ItemWrapper disable={song.playable} onClick={(e) => playSong(song)}>
      <img src={getSizeImage(song.al?.picUrl, 128)} alt="" />
      <div className="title-and-artist">
        <div className="playlist-item-title">{song.name}</div>
        <div className="playlist-item-artist">
          <a href="#/">{getSongArtists(song.ar)}</a>
        </div>
      </div>
      <div className="playlist-item-album">{song.al?.name}</div>
      <div className="playlist-item-actions">
        <ButtonTone onClick={(e) => toggleIsLikeSong(e)} backgroundColor={'#fff'}>
          <i className={isLikeSong ? 'iconfont icon-love-b' : 'iconfont icon-love-b1'} />
        </ButtonTone>
      </div>
      <div className="playlist-item-time">{formatMinuteSecond(song.dt)}</div>
    </ItemWrapper>
  );
});