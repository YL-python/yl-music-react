import React, { memo, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

import { getRecommendListAction } from '@/store/home/actionCreators';

import Hidden from '@/components/hidden';
import { HomeWrapper } from './style';
import AlbumCover from '@/components/album-cover';

export default memo(function Home(props) {
  const { recommendList } = useSelector(
    (state) => ({ recommendList: state.getIn(['home', 'recommendList']) }),
    shallowEqual
  );
  const dispatch = useDispatch();
  useEffect(() => {
    // 优先从 redux 中获取数据
    if (recommendList.length !== 30) dispatch(getRecommendListAction(30));
  }, [dispatch, recommendList]);

  return (
    <HomeWrapper>
      <div className="title">
        推荐歌单
        <NavLink to={`/explore?category=${encodeURIComponent('推荐歌单')}`}>
          查看全部
        </NavLink>
      </div>
      <Hidden show={recommendList.length === 0}>
        <Spin tip="Loading..." indicator={<LoadingOutlined spin />} />
      </Hidden>
      <div className="cover-list">
        {recommendList.map((album, index) => {
          return <AlbumCover key={album.id} album={album} size={256} {...props} />;
        })}
      </div>
    </HomeWrapper>
  );
});
