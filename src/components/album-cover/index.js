import React, { memo } from 'react';
// import LazyLoad from 'react-lazyload';
import { Image } from 'antd';

import { AlbumCoverWrapper } from './style';
import { getPlayCount, getSizeImage } from '@/utils/format-utils';

export default memo(function AlbumCover(props) {
  let picUrl = props.album?.picUrl || props.album?.coverImgUrl;
  picUrl = getSizeImage(picUrl, props.size);
  let playCount = props.album?.playCount;
  playCount = getPlayCount(playCount);

  const copywriter = props.album?.copywriter || props.album?.description;
  const name = props.album?.name;
  const updateTime = props.album?.updateFrequency;

  function gotoPlayList() {
    props.history.push(`/playlist/${props.album.id}`);
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
          <Image preview={false} src={picUrl} />
          <div className="shadow fade"></div>
        </div>
      </div>
      <div className="cover-desc">
        {playCount ? (
          <div className="cover-info">
            <span className="play-count">
              <i className="play iconfont icon-1_music81" />
              {playCount} {updateTime}
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
