import React, { memo, useState } from 'react';

import { getSongArtists, getSizeImage, formatMinuteSecond } from '@/utils/format-utils';
import { ItemWrapper } from './style';
import ButtonTone from '@/components/button-tone';

export default memo(function PlayListItem(props) {
  const song = props.song;
  const [isSonglistLike, setIsSonglistLike] = useState(false);
  const likeThisSong = function () {
    setIsSonglistLike(!isSonglistLike);
  };
  return (
    <ItemWrapper disable={song.playable}>
      <img src={getSizeImage(song.al?.picUrl, 126)} alt="" />
      <div className="title-and-artist">
        <div className="playlist-item-title">{song.name}</div>
        <div className="playlist-item-artist">
          <a href="#/">{getSongArtists(song.ar)}</a>
        </div>
      </div>
      <div className="playlist-item-album">{song.al?.name}</div>
      <div className="playlist-item-actions">
        <ButtonTone onClick={(e) => likeThisSong()} backgroundColor={'#fff'}>
          <i
            className={isSonglistLike ? 'iconfont icon-love-b' : 'iconfont icon-love-b1'}
          />
        </ButtonTone>
      </div>
      <div className="playlist-item-time">{formatMinuteSecond(song.dt)}</div>
    </ItemWrapper>
  );
});
