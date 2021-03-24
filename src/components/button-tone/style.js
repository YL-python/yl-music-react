import styled from 'styled-components';

export const ButtonWrapper = styled.button`
  height: 40px;
  min-width: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  line-height: 18px;
  font-weight: 600;
  background-color: ${(props) =>
    props.backgroundColor ? props.backgroundColor : 'var(--color-primary-bg)'};
  color: ${(props) => (props.textColor ? props.textColor : 'var(--color-primary)')};
  margin-right: 12px;
  border-radius: ${(props) => (props.shape === 'round' ? '50%' : '8px')};
  width: ${(props) => (props.shape === 'round' ? '38px' : 'auto')};
  padding: ${(props) => `8px ${props.paddingX}px`};
  cursor: pointer;
  transition: 0.2s;
  i {
    width: 16px;
    height: 16px;
    margin-right: ${(props) => (props.isButton ? '8px' : '0px')};
  }
  &:hover {
    transform: scale(1.06);
  }
  &:active {
    transform: scale(0.94);
  }
  &.grey {
    background-color: var(--color-secondary-bg);
    color: var(--color-text);
    opacity: 0.78;
  }
  &.transparent {
    background-color: transparent;
  }
`;
