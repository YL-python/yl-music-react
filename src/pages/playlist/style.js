import styled from 'styled-components';

export const PlaylistWrapper = styled.div`
  .playlist-detail {
    display: flex;
    margin-bottom: 72px;
    .playlist-desc {
      display: flex;
      flex-direction: column;
      justify-content: center;
      flex: 1;
      margin-left: 56px;
      .playlist-title {
        font-size: 36px;
        font-weight: 700;
        color: var(--color-text);
      }
      .playlist-artist {
        font-size: 18px;
        opacity: 0.88;
        color: var(--color-text);
        margin-top: 24px;
      }
      .date-and-count {
        font-size: 14px;
        opacity: 0.68;
        color: var(--color-text);
        margin-top: 2px;
      }
      .description {
        font-size: 14px;
        opacity: 0.68;
        color: var(--color-text);
        margin-top: 24px;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 3;
        overflow: hidden;
        cursor: pointer;
        &:hover {
          transition: opacity 0.3s;
          opacity: 0.88;
        }
      }
      .buttons {
        margin-top: 32px;
        display: flex;
        button {
          margin-right: 16px;
        }
      }
    }
  }
  .playlist-list {
    .ant-spin-spinning {
      display: block;
      margin: 0 auto;
      color: var(--color-primary);
      .ant-spin-dot {
        font-size: 50px;
      }
    }
  }
`;
