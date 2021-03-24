import styled from 'styled-components';

export const HeaderWrapper = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  height: 64px;
  backdrop-filter: saturate(180%) blur(20px);
  background-color: var(--color-navbar-bg);
  border-bottom: 1px solid transparent;
  transition-property: padding-bottom, border-bottom;
  transition-duration: 0.4s;
  z-index: 100;
  .header-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 100%;

    .buttons {
      flex: 1;
      display: flex;
      align-items: center;
      i {
        height: 24px;
        width: 24px;
      }
    }
    .links {
      flex: 1;
      display: flex;
      justify-content: center;
      text-transform: uppercase;
      user-select: none;
      a {
        font-size: 18px;
        font-weight: 700;
        text-decoration: none;
        border-radius: 6px;
        padding: 6px 10px;
        color: var(--color-text);
        transition: 0.2s;
        margin: {
          right: 12px;
          left: 12px;
        }
        &:hover {
          background: var(--color-secondary-bg-for-transparent);
        }
        &:active {
          transform: scale(0.92);
          transition: 0.2s;
        }
      }
      a.active {
        color: var(--color-primary);
      }
    }
    .search {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: flex-end;

      .ant-input-affix-wrapper {
        display: flex;
        align-items: center;
        justify-content: space-between;
        height: 32px;
        background: var(--color-secondary-bg-for-transparent);
        border-radius: 8px;
        width: 200px;

        .ant-input-prefix,
        .ant-input-suffix {
          font-size: 16px;
          color: var(--color-text);
          opacity: 0.28;
          margin: 0 4px 0 8px;
        }
        .ant-input-suffix {
          font-size: 12px;
          margin: 0 8px 0 4px;
        }
        input {
          font-size: 14px;
          border: none;
          background: transparent;
          font-weight: 600;
          color: var(--color-text);
          width: 96%;
        }
      }

      .ant-input-affix-wrapper-focused {
        background: var(--color-primary-bg-for-transparent);
        input,
        .ant-input-prefix {
          color: var(--color-primary);
        }
      }
    }
  }
`;
