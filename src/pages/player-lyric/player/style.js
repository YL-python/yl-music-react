import styled from 'styled-components';

export const PlayerWrapper = styled.div`
  display: ${(props) => (props.show ? 'flex' : 'none')};
  opacity: ${(props) => (props.show ? '1' : '0')};

  transition: opacity 0.3s;
  position: fixed;
  bottom: 0;
  right: 0;
  left: 0;
  flex-direction: column;
  justify-content: space-around;
  height: 64px;
  backdrop-filter: saturate(180%) blur(30px);
  background-color: var(--color-navbar-bg);
  z-index: 100;

  .ant-slider {
    position: absolute;
    top: -6px;
    margin: 0px;
    width: 100%;
    .ant-slider-handle {
      width: 12px;
      height: 12px;
      display: none;
      border-color: #eaeffd;
    }
    .ant-slider-rail {
      height: 2px;
    }
    .ant-slider-track {
      background-color: #335eea;
      height: 2px;
    }
    &:hover {
      .ant-slider-handle {
        display: block;
      }
    }
  }

  .controls {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    height: 100%;
    .playing {
      max-width: 250px;
      display: flex;
      align-items: center;
      img {
        height: 46px;
        border-radius: 5px;
        box-shadow: 0 6px 8px -2px rgba(0, 0, 0, 0.16);
        cursor: pointer;
      }
      .song-info {
        height: 46px;
        margin-left: 12px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        .name {
          font-weight: 600;
          opacity: 0.88;
          color: var(--color-text);
          margin-bottom: 4px;
          cursor: pointer;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 1;
          overflow: hidden;
          word-break: break-all;
          &:hover {
            text-decoration: underline;
          }
        }
        .artist {
          font-size: 12px;
          opacity: 0.58;
          color: var(--color-text);
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 1;
          overflow: hidden;
          word-break: break-all;
          width: 100%;
          .a {
            cursor: pointer;
            &:hover {
              text-decoration: underline;
            }
          }
        }
      }
      .like-button {
        margin-left: 16px;
        i {
          color: var(--color-primary);
          height: 16px;
          width: 16px;
          font-size: 16px;
        }
      }
    }
    .middle-control-buttons {
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 0 8px;
      button {
        margin: 0 8px;
      }
      i {
        height: 16px;
        width: 16px;
        font-size: 16px;
      }
      .play {
        height: 30px;
        width: 30px;
        font-size: 30px;
      }
    }
    .right-control-buttons {
      display: flex;
      justify-content: flex-end;
      align-items: center;
      button {
        margin: 4px 4px 4px 0;
      }
      i {
        font-weight: 600;
        height: 16px;
        width: 16px;
        font-size: 16px;
      }
      .volume-control {
        width: 120px;
        position: relative;
        margin-left: 4px;
        display: flex;
        align-items: center;
        .volume-bar {
          width: 84px;
        }
        .ant-slider {
          position: relative !important;
          top: 0;
          margin: 0 4px;
          width: 100%;
          .ant-slider-handle {
            width: 14px;
            height: 14px;
            display: none;
            border-color: #eaeffd;
          }
          .ant-slider-rail {
            height: 4px;
          }
          .ant-slider-track {
            background-color: #000;
            height: 4px;
          }
          &:hover {
            .ant-slider-handle {
              display: block;
            }
          }
        }
      }
    }
  }
  .blank {
    flex-grow: 1;
  }
`;
