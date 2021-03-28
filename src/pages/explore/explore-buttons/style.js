import styled from 'styled-components';

export const ExploreButtonsWrapper = styled.div`
  .buttons {
    display: flex;
    flex-wrap: wrap;
    padding: var(--main-content-padding);
    .button {
      user-select: none;
      cursor: pointer;
      padding: 8px 16px;
      margin: 10px 16px 6px 0;
      display: flex;
      justify-content: center;
      align-items: center;
      font-weight: 600;
      font-size: 18px;
      border-radius: 10px;
      background-color: var(--color-secondary-bg);
      color: var(--color-secondary);
      transition: 0.2s;

      &:hover {
        background-color: var(--color-primary-bg);
        color: var(--color-primary);
      }
      &.active {
        background-color: var(--color-primary-bg);
        color: var(--color-primary);
      }
      &.more {
        i {
          text-align: center;
          height: 24px;
          width: 24px;
        }
      }
    }
  }
  .panel {
    margin-top: 10px;
    background: var(--color-secondary-bg);
    border-radius: 10px;
    padding: 0 8px;
    margin: var(--main-content-padding);
    color: var(--color-text);
    height: 0;
    opacity: 0;
    overflow: hidden;
    transition: all 0.3s;
    &.show {
      height: 100%;
      opacity: 1;
      padding: 8px;
    }

    .big-cat {
      display: flex;
      margin-bottom: 20px;
    }
    .name {
      font-size: 24px;
      font-weight: 700;
      opacity: 0.68;
      margin-left: 24px;
      min-width: 54px;
      margin-top: 8px;
    }
    .cats {
      margin-left: 24px;
      display: flex;
      flex-wrap: wrap;
    }
    .cat {
      user-select: none;
      margin: 4px 0px 0 0;
      display: flex;
      // justify-content: center;
      align-items: center;
      font-weight: 500;
      font-size: 16px;
      transition: 0.2s;
      min-width: 98px;

      span {
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        padding: 6px 12px;
        border-radius: 10px;
        opacity: 0.88;
        &:hover {
          opacity: 1;
          background-color: var(--color-primary-bg);
          color: var(--color-primary);
        }
      }
    }
    .cat.active {
      color: var(--color-primary);
      span {
        background-color: var(--color-primary-bg);
      }
    }
  }
`;
