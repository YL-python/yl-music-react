import React, { memo } from 'react';
import { Image } from 'antd';

import { getSizeImage } from '@/utils/format-utils';
import { CoverImgWrapper } from './style';

export default memo(function CoverImg(props) {
  const picUrl = getSizeImage(props.picUrl, props.size);
  return (
    <CoverImgWrapper picUrl={picUrl}>
      <Image preview={false} src={picUrl} />
      <div className="shadow fade"></div>
    </CoverImgWrapper>
  );
});
