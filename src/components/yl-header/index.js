import React, { memo } from 'react';
import { NavLink } from 'react-router-dom';
import { Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';

import { HeaderWrapper } from './style';
import ButtonIcon from '../button-icon';

export default memo(function YLHeader() {
  return (
    <HeaderWrapper className="wrap-v2">
      <div className="buttons">
        <ButtonIcon>
          <i className="iconfont icon-icon-test"></i>
        </ButtonIcon>
        <ButtonIcon>
          <i className="iconfont icon-icon-test1"></i>
        </ButtonIcon>
      </div>
      <div className="links">
        <NavLink to="/" exact>
          首页
        </NavLink>
        <NavLink to="/explore">发现</NavLink>
        <NavLink to="/my">我的</NavLink>
      </div>
      <div className="search">
        <Input placeholder="搜索" prefix={<SearchOutlined />} allowClear />
      </div>
    </HeaderWrapper>
  );
});
