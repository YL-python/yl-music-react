import React, { memo } from 'react';
// import LazyLoad from 'react-lazyload';
import { Image } from 'antd';

import { AlbumCoverWrapper } from './style';
import { getPlayCount, getSizeImage } from '@/utils/format-utils';

export default memo(function AlbumCover(props) {
  let { album, size } = props;
  const picUrl = getSizeImage(album.picUrl, size);
  const playCount = getPlayCount(album.playCount);

  function gotoPlayList() {
    props.history.push(`/playlist/${album.id}`);
  }
  return (
    <AlbumCoverWrapper picUrl={picUrl}>
      <div className="cover cover-hover" onClick={(e) => gotoPlayList()}>
        <div className="cover-container">
          <div className="shade">
            <button className="play-button">
              <i className="iconfont icon-1_music81"></i>
            </button>
          </div>
          {/* <img alt="错误" src={picUrl}></img> */}
          <Image preview={false} src={album.picUrl} />
          <div className="shadow fade"></div>
        </div>
      </div>
      <div className="cover-desc">
        {playCount ? (
          <div className="cover-info">
            <span className="play-count">
              <i className="play iconfont icon-1_music81" />
              {playCount} {album.updateFrequency}
            </span>
          </div>
        ) : (
          ''
        )}

        <div className="cover-title text-nowrap2" title={album.name}>
          <a href="#/">{album.name}</a>
        </div>
        <div className="cover-info text-nowrap2" title={album.copywriter}>
          <span>{album.copywriter}</span>
        </div>
      </div>
    </AlbumCoverWrapper>
  );
});
