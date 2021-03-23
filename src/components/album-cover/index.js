import React, { memo } from 'react';

import { AlbumCoverWrapper } from './style';

export default memo(function AlbumCover() {
  return (
    <AlbumCoverWrapper>
      <div className="cover cover-hover">
        <div className="cover-container">
          <div className="shade">
            <button className="play-button">
              <i className="iconfont icon-1_music81"></i>
            </button>
          </div>
          <img
            alt=""
            src="https://p2.music.126.net/bQSgDY2r5xSnC_IEdf2jBQ==/109951165797255055.jpg?param=512y512"
          ></img>
          <div className="shadow fade"></div>
        </div>
      </div>
      <div className="cover-desc">
        <div className="cover-info">
          <span className="play-count">
            <i className="play iconfont icon-1_music81" />
            123
          </span>
        </div>
        <div className="cover-title text-nowrap2">
          <a href="#/">
            运动 有氧 健身BGM｜一半自律 一半热爱生活一半热爱生活一半热爱生活
          </a>
        </div>
        <div className="cover-info text-nowrap2">
          <span>编辑推荐：夏日将至，你的马甲线准备好了吗？一半热爱生活一半热爱生活</span>
        </div>
      </div>
    </AlbumCoverWrapper>
  );
});
