import styled from 'styled-components';

export const CoverImgWrapper = styled.div`
  width: 290px;
  height: 290px;
  position: relative;

  img {
    border-radius: 4%;
    width: 100%;
    user-select: none;
  }
  .shadow {
    height: 100%;
    width: 100%;
    position: absolute;
    top: 28px;
    filter: blur(16px) opacity(0.6);
    transform: scale(0.92, 0.96);
    z-index: -1;
    background-image: ${(props) => `url(${props.picUrl})`};
    background-size: cover;
    border-radius: 8%;
  }
`;
