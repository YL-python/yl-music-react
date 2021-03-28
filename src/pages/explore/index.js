import React, { memo, useState, useEffect } from 'react';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

import { ExploreWrapper } from './style';
import { parseUrl } from '@/utils/format-utils.js';
import ExploreButtons from './explore-buttons';
import Hidden from '@/components/hidden';
import AlbumCover from '@/components/album-cover';
import useScrollDown from '@/hooks/scrollHook';
import {
  getRecommendList,
  toplists,
  highQualityPlaylist,
  topPlaylist,
} from '@/service/playlist';

export default memo(function Explore(props) {
  // 获取请求的分类参数
  let category = parseUrl(props.location.search).category;
  if (!category) category = '全部';
  const [hasMore, setHasMore] = useState(true);
  const [explorelist, setExplorelist] = useState([]);
  // 控制是否加载
  const [loading, setLoading] = useState(false);

  // 根据 category 获取歌单列表
  function getPlaylist() {
    setHasMore(true);
    setLoading(true);
    if (category === '推荐歌单') {
      return getRecommendPlayList();
    }
    if (category === '精品歌单') {
      return getHighQualityPlaylist();
    }
    if (category === '排行榜') {
      return getTopLists();
    }
    return getTopPlayList();
  }

  useEffect(() => {
    // 初始化参数
    setExplorelist([]);
    console.log('useEffect useEffect', category);
    setHasMore(true); // 有更多
    setLoading(false); // 没有在加载
    // 第一次请求
    getPlaylist();
  }, [category]);

  // 滚动到底部
  const handleScrollDown = (e) => {
    // 有更多并且当前没有在加载
    if (hasMore && !loading) {
      getPlaylist();
    }
  };
  useScrollDown(handleScrollDown);

  // 获取 推荐歌单
  function getRecommendPlayList() {
    setExplorelist([]);
    getRecommendList(100).then((res) => {
      setExplorelist(res.result);
      setHasMore(false);
      setLoading(false);
    });
  }
  // 获取 排行榜
  function getTopLists() {
    setExplorelist([]);
    toplists().then((res) => {
      setExplorelist(res.list);
      setHasMore(false);
      setLoading(false);
    });
  }
  // 获取 精品歌单
  function getHighQualityPlaylist() {
    let before =
      explorelist.length !== 0 ? explorelist[explorelist.length - 1].updateTime : 0;
    highQualityPlaylist({ limit: 20, before }).then((res) => {
      setExplorelist([...explorelist, ...res.playlists]);
      setHasMore(res.more);
      setLoading(false);
    });
  }
  // 根据 分类获取 热门的歌单
  function getTopPlayList() {
    console.log('explorelist.length', explorelist.length);
    topPlaylist({
      cat: category,
      offset: explorelist.length,
    }).then((res) => {
      console.log('explorelist.length', explorelist.length);
      setExplorelist([...explorelist, ...res.playlists]);
      setHasMore(res.more);
      setLoading(false);
    });
  }
  // 根据标签获取歌单
  return (
    <ExploreWrapper>
      <h1>发现</h1>
      <ExploreButtons {...props} select={category} />
      <div className="explore-list">
        {explorelist.map((album) => {
          return <AlbumCover key={album.id} album={album} size={256} {...props} />;
        })}
      </div>
      <Hidden show={hasMore}>
        <div className="load-more">
          <Spin tip="加载中..." indicator={<LoadingOutlined spin />} />
        </div>
      </Hidden>
    </ExploreWrapper>
  );
});
