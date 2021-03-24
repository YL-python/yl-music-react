import React, { memo } from 'react';

import { ButtonWrapper } from './style';

const ButtonTone = memo(function (props) {
  return (
    <>
      <ButtonWrapper {...props} className={props.color}>
        {props.children}
      </ButtonWrapper>
    </>
  );
});

ButtonTone.defaultProps = {
  isButton: false,
  paddingX: 16,
  color: 'blue',
  shape: 'square',
};

export default ButtonTone;
