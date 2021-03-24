import React, { memo, useEffect, useState } from 'react';

import CoverImg from '@/components/cover-img';
import { PlayListWrapper } from './style';
import { getPlaylistDetail } from '@/service/playlist';
import ButtonTone from '@/components/button-tone';

export default memo(function Playlist(props) {
  const [isLike, setIsLike] = useState(false);

  const id = props.match.params.id;
  const [playlistDetail, setPlaylistDetail] = useState([]);
  useEffect(() => {
    getPlaylistDetail(id).then((res) => {
      setPlaylistDetail(res.playlist);
    });
  }, [id]);

  const changeLike = function () {
    console.log('changeLike');
    setIsLike(!isLike);
  };

  const picUrl = playlistDetail.coverImgUrl;
  const size = 512;
  return (
    <PlayListWrapper>
      <div className="playlist-detail">
        <CoverImg size={size} picUrl={picUrl} />
        <div className="playlist-desc">
          <div className="playlist-title">{playlistDetail.name}</div>
          <div className="playlist-artist">
            Playlist by {playlistDetail.creator?.nickname}
          </div>
          <div className="date-and-count">
            最后更新于 {playlistDetail.updateTime} · {playlistDetail.trackCount} 首歌
          </div>
          <div className="description">{playlistDetail.description}</div>
          <div className="buttons">
            <ButtonTone isButton>
              <i className="iconfont icon-1_music81"></i>
              <span>播放</span>
            </ButtonTone>
            <ButtonTone
              onClick={(e) => changeLike()}
              backgroundColor={isLike ? 'var(--color-secondary-bg)' : ''}
            >
              <i className={!isLike ? 'iconfont icon-love-b' : 'iconfont icon-love-b1'} />
            </ButtonTone>
          </div>
        </div>
      </div>
      <div className="playlist-list">歌曲列表</div>
    </PlayListWrapper>
  );
});
