// 优雅的实现 v-if
import React, { memo } from 'react';

export default memo(function Hidden(props) {
  let { show, children } = props;
  const content = show ? children : null;
  return <>{content}</>;
});
