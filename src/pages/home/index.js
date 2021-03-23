import React, { memo } from 'react';

import { HomeWrapper } from './style';
import AlbumCover from '@/components/album-cover';

export default memo(function Home() {
  return (
    <HomeWrapper>
      <div className="title">
        推荐歌单
        <a href="#/"> 查看全部</a>
      </div>
      <div className="cover-list">
        <AlbumCover></AlbumCover>
        <AlbumCover></AlbumCover>
        <AlbumCover></AlbumCover>
        <AlbumCover></AlbumCover>
        <AlbumCover></AlbumCover>
        <AlbumCover></AlbumCover>
        <AlbumCover></AlbumCover>
        <AlbumCover></AlbumCover>
        <AlbumCover></AlbumCover>
        <AlbumCover></AlbumCover>
        <AlbumCover></AlbumCover>
        <AlbumCover></AlbumCover>
        <AlbumCover></AlbumCover>
        <AlbumCover></AlbumCover>
        <AlbumCover></AlbumCover>
        <AlbumCover></AlbumCover>
        <AlbumCover></AlbumCover>
        <AlbumCover></AlbumCover>
        <AlbumCover></AlbumCover>
        <AlbumCover></AlbumCover>
      </div>
    </HomeWrapper>
  );
});
