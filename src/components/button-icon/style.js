import styled from 'styled-components';

export const ButtonWrapper = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  background: transparent;
  border-radius: 25%;
  transition: 0.2s;
  padding: 8px;
  cursor: pointer;
  i {
    color: var(--color-text);
    height: 24px;
    width: 24px;
    font-size: 24px;
    font-weight: 600;
  }
  &:first-child {
    margin-left: 0;
  }
  &:hover {
    background: var(--color-secondary-bg-for-transparent);
  }
  &:active {
    transform: scale(0.92);
  }
`;
