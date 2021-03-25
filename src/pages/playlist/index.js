import React, { memo, useEffect, useState } from 'react';

import CoverImg from '@/components/cover-img';
import PlayListItem from '@/components/playlist-item/';
import { PlayListWrapper } from './style';
import { getPlaylistDetail } from '@/service/playlist';
import { getSongDetail } from '@/service/song';
import ButtonTone from '@/components/button-tone';

export default memo(function Playlist(props) {
  const [isPlaylistLike, setIsPlaylistLike] = useState(false);
  const [playlistDetail, setPlaylistDetail] = useState([]);
  const [songList, setSongList] = useState([]);

  const id = props.match.params.id;
  useEffect(() => {
    getPlaylistDetail(id).then((res) => {
      setPlaylistDetail(res.playlist);
      let ids = res.playlist.trackIds.map((item) => item.id);
      getSongDetail(ids.join(',')).then((res) => {
        setSongList(res.songs);
      });
    });
  }, [id]);

  const changeLike = function () {
    setIsPlaylistLike(!isPlaylistLike);
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
              backgroundColor={!isPlaylistLike ? 'var(--color-secondary-bg)' : ''}
            >
              <i
                className={
                  isPlaylistLike ? 'iconfont icon-love-b' : 'iconfont icon-love-b1'
                }
              />
            </ButtonTone>
          </div>
        </div>
      </div>
      <div className="playlist-list">
        {songList.map((song) => {
          return <PlayListItem song={song} key={song.id} />;
        })}
      </div>
    </PlayListWrapper>
  );
});
