import React, { memo } from 'react';

import { ButtonWrapper } from './style';

export default memo(function ButtonIcon(props) {
  return (
    <>
      <ButtonWrapper {...props}>{props.children}</ButtonWrapper>
    </>
  );
});
