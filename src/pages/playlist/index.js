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
import useLikePlaylist from '@/hooks/likePlaylistHook';

import {
  setMabyPlaylistAction,
  setPlaylistAction,
  setCurrentSongAction,
} from '@/store/player/actionCreators';

export default memo(function Playlist(props) {
  const dispatch = useDispatch();
  const [playlistDetail, setPlaylistDetail] = useState([]);
  const [songList, setSongList] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  //  常量
  const id = props.match.params.id;
  const size = 512;

  const [isLikePlaylist, toggleIsLikePlaylist] = useLikePlaylist(playlistDetail);

  const { maybePlaylist } = useSelector(
    (state) => ({
      maybePlaylist: state.getIn(['player', 'maybePlaylist']),
    }),
    shallowEqual
  );

  useEffect(() => {
    getPlaylistDetail(id).then((res) => {
      setPlaylistDetail(res.playlistDetail);

      let ids = res.playlist.trackIds.map((item) => item.id);
      getSongDetail(ids.join(',')).then((res) => {
        setSongList(res);
        dispatch(setMabyPlaylistAction(res));
      });
    });
  }, [dispatch, id]);

  function showDescription() {
    setIsModalVisible(true);
  }
  function playThisPlaylist() {
    dispatch(setPlaylistAction());
    dispatch(setCurrentSongAction(maybePlaylist[0]));
  }

  return (
    <PlaylistWrapper>
      <div className="playlist-detail">
        <CoverImg size={size} picUrl={playlistDetail.picUrl} />
        <div className="playlist-desc">
          <div className="playlist-title">{playlistDetail.name}</div>
          <div className="playlist-artist">Playlist by {playlistDetail.nickname}</div>
          <div className="date-and-count">
            最后更新于 {playlistDetail.updateTime} · {playlistDetail.trackCount} 首歌
          </div>
          <div className="description" onClick={(e) => showDescription()}>
            {playlistDetail.description}
          </div>
          <div className="buttons">
            <ButtonTone isButton onClick={(e) => playThisPlaylist()}>
              <i className="iconfont icon-1_music81"></i>
              <span>播放</span>
            </ButtonTone>
            <ButtonTone
              onClick={(e) => toggleIsLikePlaylist(playlistDetail, e)}
              backgroundColor={!isLikePlaylist ? 'var(--color-secondary-bg)' : ''}
            >
              <i
                className={
                  isLikePlaylist ? 'iconfont icon-love-b' : 'iconfont icon-love-b1'
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
