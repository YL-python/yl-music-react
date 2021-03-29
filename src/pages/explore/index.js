import React, { memo, useEffect } from 'react';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';

import { ExploreWrapper } from './style';
import { parseUrl } from '@/utils/format-utils.js';
import ExploreButtons from './explore-buttons';
import Hidden from '@/components/hidden';
import AlbumCover from '@/components/album-cover';
import useScrollDown from '@/hooks/scrollHook';
import { setSearchCategorieAction, loadMoreAction } from '@/store/explore/actionCreators';

export default memo(function Explore(props) {
  // 获取请求的分类参数
  let category = parseUrl(props.location.search).category;
  if (!category) category = '全部';

  // store
  const dispatch = useDispatch();
  const { searchCategorie, explorelist, loading, hasMore } = useSelector(
    (state) => ({
      searchCategorie: state.getIn(['explore', 'searchCategorie']),
      explorelist: state.getIn(['explore', 'explorelist']),
      hasMore: state.getIn(['explore', 'hasMore']),
      loading: state.getIn(['explore', 'loading']),
    }),
    shallowEqual
  );

  useEffect(() => {
    dispatch(setSearchCategorieAction(category));
  }, [dispatch, category]);

  // 滚动到底部
  const handleScrollDown = (e) => {
    // 有更多并且当前没有在加载
    if (hasMore && !loading) {
      dispatch(loadMoreAction());
    }
  };
  useScrollDown(handleScrollDown);

  // 根据标签获取歌单
  return (
    <ExploreWrapper>
      <h1>发现</h1>
      <ExploreButtons {...props} select={searchCategorie} />
      <div className="explore-list">
        {explorelist.map((album) => {
          return <AlbumCover key={album.id} album={album} size={256} {...props} />;
        })}
      </div>
      <Hidden show={hasMore}>
        <div className="load-more">
          <Spin tip="加载中..." indicator={<LoadingOutlined spin />} />
        </div>
      </Hidden>
    </ExploreWrapper>
  );
});
