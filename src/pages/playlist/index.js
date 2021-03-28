import React, { memo, useEffect, useState } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { Spin, Modal } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

import CoverImg from '@/components/cover-img';
import PlaylistItem from '@/components/playlist-item';
import { PlaylistWrapper } from './style';
import { getPlaylistDetail } from '@/service/playlist';
import { getSongDetail } from '@/service/song';
import ButtonTone from '@/components/button-tone';
import Hidden from '@/components/hidden';
import { formatDate } from '@/utils/format-utils';
import {
  setMabyPlaylistAction,
  setPlaylistAction,
  setCurrentSongAction,
} from '@/store/player/actionCreators';

export default memo(function Playlist(props) {
  const dispatch = useDispatch();
  const [isPlaylistLike, setIsPlaylistLike] = useState(false);
  const [playlistDetail, setPlaylistDetail] = useState([]);
  const [songList, setSongList] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  //  常量
  const id = props.match.params.id;
  const picUrl = playlistDetail.coverImgUrl;
  const size = 512;

  const { maybePlaylist } = useSelector(
    (state) => ({
      maybePlaylist: state.getIn(['player', 'maybePlaylist']),
    }),
    shallowEqual
  );

  useEffect(() => {
    getPlaylistDetail(id).then((res) => {
      setPlaylistDetail(res.playlist);
      let ids = res.playlist.trackIds.map((item) => item.id);
      getSongDetail(ids.join(',')).then((res) => {
        setSongList(res.songs);
        dispatch(setMabyPlaylistAction(res.songs));
      });
    });
  }, [dispatch, id]);

  const changeLike = function () {
    setIsPlaylistLike(!isPlaylistLike);
  };

  function showDescription() {
    setIsModalVisible(true);
  }
  function platThisPlaylist() {
    dispatch(setPlaylistAction());
    dispatch(setCurrentSongAction(maybePlaylist[0]));
  }

  return (
    <PlaylistWrapper>
      <div className="playlist-detail">
        <CoverImg size={size} picUrl={picUrl} />
        <div className="playlist-desc">
          <div className="playlist-title">{playlistDetail.name}</div>
          <div className="playlist-artist">
            Playlist by {playlistDetail.creator?.nickname}
          </div>
          <div className="date-and-count">
            最后更新于 {formatDate(playlistDetail.updateTime)} ·{' '}
            {playlistDetail.trackCount} 首歌
          </div>
          <div className="description" onClick={(e) => showDescription()}>
            {playlistDetail.description}
          </div>
          <div className="buttons">
            <ButtonTone isButton onClick={(e) => platThisPlaylist()}>
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
          return <PlaylistItem song={song} key={song.id} />;
        })}
      </div>
      <Hidden show={songList.length === 0}>
        <Spin tip="Loading..." indicator={<LoadingOutlined spin />} />
      </Hidden>
      <Modal
        onCancel={(e) => setIsModalVisible(false)}
        title="歌单介绍"
        visible={isModalVisible}
        footer={null}
        width="50vw"
      >
        {playlistDetail.description}
      </Modal>
    </PlaylistWrapper>
  );
});
