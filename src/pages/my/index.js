import React, { memo } from 'react';

import useScrollDown from '@/hooks/scrollHook';

export default memo(function My() {
  function handleScrollDown(e) {
    console.log('handleScrollDown');
  }
  useScrollDown(handleScrollDown);
  return (
    <div className="my">
      <h1>开发中...</h1>
    </div>
  );
});
