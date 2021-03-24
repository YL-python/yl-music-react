import React, { memo, useEffect } from 'react';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';

import { getRecommendListAction } from '@/store/home/actionCreators';

import { HomeWrapper } from './style';
import AlbumCover from '@/components/album-cover';

export default memo(function Home(props) {
  const { recommendList } = useSelector(
    (state) => ({ recommendList: state.getIn(['home', 'recommendList']) }),
    shallowEqual
  );
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getRecommendListAction(10));
  }, [dispatch]);

  return (
    <HomeWrapper>
      <div className="title">
        推荐歌单
        <a href="#/"> 查看全部</a>
      </div>
      <div className="cover-list">
        {recommendList.map((item, index) => {
          return <AlbumCover key={item.id} album={item} size={256} {...props} />;
        })}
      </div>
    </HomeWrapper>
  );
});
