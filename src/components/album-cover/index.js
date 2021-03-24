import React, { memo } from 'react';
// import LazyLoad from 'react-lazyload';

import { AlbumCoverWrapper } from './style';
import { getPlayCount, getSizeImage } from '@/utils/format-utils';

export default memo(function AlbumCover(props) {
  let picUrl = props.album?.picUrl;
  picUrl = getSizeImage(picUrl, 1902);
  let playCount = props.album?.playCount;
  playCount = getPlayCount(playCount);
  const copywriter = props.album?.copywriter;
  const name = props.album?.name;
  return (
    <AlbumCoverWrapper picUrl={picUrl}>
      <div className="cover cover-hover">
        <div className="cover-container">
          <div className="shade">
            <button className="play-button">
              <i className="iconfont icon-1_music81"></i>
            </button>
          </div>
          <img alt="错误" src={picUrl}></img>

          <div className="shadow fade"></div>
        </div>
      </div>
      <div className="cover-desc">
        {playCount ? (
          <div className="cover-info">
            <span className="play-count">
              <i className="play iconfont icon-1_music81" />
              {playCount}
            </span>
          </div>
        ) : (
          ''
        )}

        <div className="cover-title text-nowrap2" title={name}>
          <a href="#/">{name}</a>
        </div>
        <div className="cover-info text-nowrap2" title={copywriter}>
          <span>{copywriter}</span>
        </div>
      </div>
    </AlbumCoverWrapper>
  );
});
