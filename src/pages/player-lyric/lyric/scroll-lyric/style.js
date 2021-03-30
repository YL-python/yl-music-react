import styled from 'styled-components';

export const ScrollLyricWrapper = styled.div`
  /* height: 100%; */
  /* overflow: hidden; */
  /* overflow-y: auto; */
  display: flex;
  flex-direction: column;
  max-width: 460px;
  transition: 0.5s;
  font-size: ${(props) => props.size};
  .line {
    cursor: pointer;
    padding: 18px;
    transition: 0.2s;
    border-radius: 12px;
    &:hover {
      background: var(--color-secondary-bg);
    }
    &.active {
      transform: scale(1) translate(0, 0);
    }
    span {
      cursor: pointer;
      opacity: 0.28;
    }
  }
  .active span {
    opacity: 0.98;
    transition: 0.5s;
  }
  .top-block {
    text-align: center;
    opacity: 0.98;
    margin-top: 50vh;
  }
  .bottom-block {
    margin-bottom: 50vh;
  }
`;
