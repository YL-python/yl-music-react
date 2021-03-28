import styled from 'styled-components';

export const ExploreWrapper = styled.div`
  h1 {
    color: var(--color-text);
    font-size: 56px;
    font-weight: 600;
    margin: 30px 0;
  }
  .explore-list {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: 44px 24px;
  }
  .load-more {
    display: flex;
    justify-content: center;
    margin-top: 32px;
  }
`;
