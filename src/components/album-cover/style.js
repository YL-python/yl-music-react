import styled from 'styled-components';

export const AlbumCoverWrapper = styled.div`
  width: 170px;
  position: relative;

  .cover-hover {
    cursor: pointer;
    transition: transform 0.3s;
    &:hover {
      transform: scale(1.02);

      .fade {
        opacity: 1;
        transition: 0.3s;
      }
      .shade .play-button {
        display: block;
      }
    }
  }
  .cover-container {
    position: relative;
    .shade {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background: transparent;
      .play-button {
        display: none;
        width: 40px;
        height: 40px;
        color: #fff;
        background: transparent;
        backdrop-filter: blur(12px) brightness(96%);
        transition: transform 0.2s;
        border-radius: 50%;
        cursor: pointer;
        i {
          font-size: 22px;
        }
        &:hover {
          transform: scale(1.06);
        }
        &:active {
          transform: scale(0.94);
        }
      }
    }

    img {
      border-radius: 8%;
      width: 100%;
      user-select: none;
    }
    .shadow {
      height: 100%;
      width: 100%;
      position: absolute;
      top: 14px;
      filter: blur(16px) opacity(0.6);
      transform: scale(0.92, 0.96);
      z-index: -1;
      background-image: ${(props) => `url(${props.picUrl})`};
      background-size: cover;
      border-radius: 8%;
    }
    .fade {
      opacity: 0;
    }
  }
  .cover-desc {
    margin-top: 8px;
    .cover-info {
      font-size: 12px;
      opacity: 0.68;
      line-height: 18px;
      word-break: break-word;
      i {
        font-size: 12px;
        margin-right: 5px;
      }
    }
    .cover-title {
      font-size: 16px;
      font-weight: 600;
      line-height: 20px;
      word-break: break-all;
      a {
        color: #000;
      }
    }
  }
`;
