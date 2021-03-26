import styled from 'styled-components';

export const ItemWrapper = styled.div`
  display: flex;
  align-items: center;
  padding: 8px;
  border-radius: 12px;
  user-select: none;
  transition: all 0.3s;
  img {
    border-radius: 8px;
    height: 46px;
    width: 46px;
    margin-right: 20px;
    border: 1px solid rgba(0, 0, 0, 0.04);
    filter: ${(props) => {
      return props.disable ? '' : 'grayscale(1) opacity(0.6)';
    }};
    cursor: pointer;
  }
  .title-and-artist {
    flex: 1;
    display: flex;
    flex-direction: column;
    opacity: ${(props) => (props.disable ? '1' : '0.28')};
    .playlist-item-title {
      font-size: 18px;
      font-weight: 600;
      color: var(--color-text);
      cursor: default;
      padding-right: 16px;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 1;
      overflow: hidden;
      word-break: break-all;
    }
    .playlist-item-artist {
      margin-top: 2px;
      font-size: 13px;
      opacity: 0.68;
      color: var(--color-text);
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 1;
      overflow: hidden;
    }
  }
  .playlist-item-album {
    flex: 1;
    display: flex;
    font-size: 16px;
    opacity: ${(props) => (props.disable ? '0.88' : '0.28')};
    color: var(--color-text);
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
  }
  .playlist-item-actions {
  }
  .playlist-item-time {
    font-size: 16px;
    width: 50px;
    cursor: default;
    display: flex;
    justify-content: flex-end;
    margin-right: 10px;
    font-variant-numeric: tabular-nums;
    opacity: ${(props) => (props.disable ? '0.88' : '0.28')};
    color: var(--color-text);
  }
  &:hover {
    background-color: ${(props) =>
      props.disable ? 'var(--color-secondary-bg)' : 'none'};
    button {
      background-color: ${(props) =>
        props.disable ? 'var(--color-secondary-bg)' : 'none'};
    }
  }
`;
