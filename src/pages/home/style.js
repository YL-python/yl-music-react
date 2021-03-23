import styled from 'styled-components';

export const HomeWrapper = styled.div`
  .title {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    margin-bottom: 20px;
    font-size: 28px;
    font-weight: 700;
    color: var(--color-text);
    a {
      font-size: 13px;
      font-weight: 600;
      opacity: 0.68;
    }
  }
  .cover-list {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: 44px 24px;
  }
`;
