import styled from 'styled-components';

export const LyricWrapper = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  z-index: 200;
  background: var(--color-body-bg);
  display: flex;

  .left-side {
    flex: 1;
    display: flex;
    justify-content: flex-end;
    margin-right: 32px;
    margin-top: 24px;
    align-items: center;
    transition: all 0.5s;
    .wrapper {
      max-width: 350px;
    }
    .cover {
      position: relative;
      .cover-container {
        position: relative;
      }
      img {
        border-radius: 0.75em;
        width: 100%;
        height: 100%;
        max-width: 100%;
        max-height: 100%;
        user-select: none;
        object-fit: cover;
      }
      .shadow {
        position: absolute;
        top: 20px;
        width: 100%;
        height: 100%;
        max-width: 100%;
        max-height: 100%;
        filter: blur(16px) opacity(0.6);
        transform: scale(0.92, 0.96);
        z-index: -1;
        background-size: cover;
        border-radius: 0.75em;
      }
    }

    .top-part {
      display: flex;
      justify-content: space-between;
      .buttons {
        display: flex;
        align-items: center;
        button {
          margin: 0 0 0 4px;
        }
        i {
          color: var(--color-primary);
          font-size: 18px;
          height: 18px;
          width: 18px;
        }
      }
    }

    .controls {
      margin-top: 24px;
      color: var(--color-text);
      .title {
        margin-top: 8px;
        font-size: 1.4rem;
        font-weight: 600;
        opacity: 0.88;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 1;
        overflow: hidden;
      }
      .subtitle {
        margin-top: 4px;
        font-size: 1rem;
        opacity: 0.58;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 1;
        overflow: hidden;
      }
    }

    .progress-bar {
      margin-top: 22px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      span {
        font-size: 15px;
        opacity: 0.58;
        min-width: 36px;
      }
      .slider {
        width: 100%;
        flex-grow: grow;
        padding: 0 10px;
      }
      .ant-slider {
        margin: 0px;
        width: 100%;
        .ant-slider-handle {
          display: none;
          border-color: #eaeffd;
        }
        .ant-slider-track {
          background-color: #335eea;
        }
        &:hover {
          .ant-slider-handle {
            display: block;
          }
        }
      }
    }

    .media-controls {
      display: flex;
      justify-content: center;
      margin-top: 18px;
      align-items: center;
      button {
        margin: 0;
      }
      i {
        opacity: 0.88;
        height: 14px;
        font-size: 14px;
        width: 14px;
      }
      .middle {
        padding: 0 16px;
        display: flex;
        align-items: center;
        button {
          margin: 0 8px;
          i {
            opacity: 0.88;
          }
        }
        button:nth-child(2) i {
          height: 28px;
          width: 28px;
          font-size: 28px;
          padding: 2px;
          opacity: 0.88;
        }
      }
    }
  }
  .right-side {
    flex: 1;
    font-weight: 600;
    color: var(--color-text);
    margin-right: 24px;
  }

  .close-button {
    position: fixed;
    top: 24px;
    right: 24px;
    z-index: 300;
    border-radius: 0.75rem;
    height: 44px;
    width: 44px;
    display: flex;
    justify-content: center;
    align-items: center;
    opacity: 0.28;
    transition: 0.2s;
    -webkit-app-region: no-drag;
    button {
      background: var(--color-secondary-bg);
      .i {
        color: var(--color-text);
        padding-top: 5px;
        height: 22px;
        width: 22px;
      }
    }
    &:hover {
      background: var(--color-secondary-bg);
      opacity: 0.88;
    }
  }
`;
