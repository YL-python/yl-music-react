// 引入常量
import * as actionTypes from './constants';

// 引入请求方法
import {
  getRecommendList,
  toplists,
  highQualityPlaylist,
  topPlaylist,
} from '@/service/playlist';

// 真正的 action   指明类型  指明修改的数据
const changeCategoriesAction = (categories) => ({
  type: actionTypes.CHANGE_CATEGORIES,
  categories,
});
const changeSearchCategorieAction = (searchCategorie) => ({
  type: actionTypes.CHANGE_SEARCH_CATEGORIE,
  searchCategorie,
});
const changeExplorelistAction = (explorelist) => ({
  type: actionTypes.CHANGE_EXPLOER_LIST,
  explorelist,
});
const changeHasMoreAction = (hasMore) => ({
  type: actionTypes.CHANGE_HASMORE,
  hasMore,
});
const changeLoadingAction = (loading) => ({
  type: actionTypes.CHANGE_LOADING,
  loading,
});

// 切换顶部分类
export const toggleCategorys = (name) => {
  return (dispatch, getState) => {
    let categories = getState().explore.categories;
    let cat = categories.find((c) => c.name === name);
    cat.enable = !cat.enable;
    categories = categories.map((c) => {
      if (c.name === name) return cat;
      return c;
    });
    dispatch(changeCategoriesAction(categories));
  };
};

// 更新 开始加载状态
const setStartNetworkAction = () => {
  return (dispatch) => {
    dispatch(changeHasMoreAction(true));
    dispatch(changeLoadingAction(true));
  };
};
// 更新 网络加载完毕结果
const setNetworkResultAction = (explorelist, hasMore, loading) => {
  return (dispatch) => {
    dispatch(changeExplorelistAction(explorelist));
    dispatch(changeHasMoreAction(hasMore));
    dispatch(changeLoadingAction(loading));
  };
};
const getExplorelistFromNetwork = () => {
  return (dispatch, getState) => {
    // 获取值
    const explorelist = getState().explore.explorelist;
    const searchCategorie = getState().explore.searchCategorie;
    // 更新开始加载状态
    dispatch(setStartNetworkAction());
    // 根据 searchCategorie 去加载列表
    if (searchCategorie === '推荐歌单') {
      dispatch(changeExplorelistAction([]));
      getRecommendList(100).then((res) => {
        // 没有更多了也没有在加载了
        dispatch(setNetworkResultAction(res.albums, false, false));
      });
    } else if (searchCategorie === '精品歌单') {
      let before =
        explorelist.length !== 0 ? explorelist[explorelist.length - 1].updateTime : 0;
      highQualityPlaylist({ limit: 20, before }).then((res) => {
        dispatch(
          setNetworkResultAction([...explorelist, ...res.albums], res.more, false)
        );
      });
    } else if (searchCategorie === '排行榜') {
      dispatch(changeExplorelistAction([]));
      toplists().then((res) => {
        dispatch(setNetworkResultAction(res.albums, false, false));
      });
    } else {
      topPlaylist({
        cat: searchCategorie,
        offset: explorelist.length,
      }).then((res) => {
        dispatch(
          setNetworkResultAction([...explorelist, ...res.albums], res.more, false)
        );
      });
    }
  };
};

// 更新了 搜索关键字
export const setSearchCategorieAction = (searchCategorie) => {
  return (dispatch, getState) => {
    // 初始化
    dispatch(changeHasMoreAction(true));
    dispatch(changeLoadingAction(false));
    dispatch(changeExplorelistAction([]));

    // 更新搜索关键字
    dispatch(changeSearchCategorieAction(searchCategorie));

    // 做一次网络加载请求
    dispatch(getExplorelistFromNetwork());
  };
};

export const loadMoreAction = () => {
  return (dispatch) => {
    dispatch(getExplorelistFromNetwork());
  };
};
