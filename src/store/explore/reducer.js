// import { Map } from 'immutable';
import produce from 'immer';
// 引入常量
import * as actionTypes from './constants';
import { exploreCategories } from '@/assets/js/staticData.js';

// 迭代 初始的 state
const defaultState = {
  categories: exploreCategories, // 顶部按钮所有的分类
  searchCategorie: '全部', // 搜索的 categorie
  explorelist: [], // 发现页的列表
  hasMore: true, // 是否还有更多
  loading: false, // 是否在加载
};

// recommend 的 reducer函数 针对 action 类型去修改 state
function reducer(state = defaultState, action) {
  switch (action.type) {
    case actionTypes.CHANGE_CATEGORIES:
      return produce(state, (draftState) => {
        draftState.categories = action.categories;
      });
    // return state.set('categories', action.categories);
    case actionTypes.CHANGE_SEARCH_CATEGORIE:
      return produce(state, (draftState) => {
        draftState.searchCategorie = action.searchCategorie;
      });
    // return state.set('searchCategorie', action.searchCategorie);
    case actionTypes.CHANGE_EXPLOER_LIST:
      return produce(state, (draftState) => {
        draftState.explorelist = action.explorelist;
      });
    // return state.set('explorelist', action.explorelist);
    case actionTypes.CHANGE_HASMORE:
      return produce(state, (draftState) => {
        draftState.hasMore = action.hasMore;
      });
    // return state.set('hasMore', action.hasMore);
    case actionTypes.CHANGE_LOADING:
      return produce(state, (draftState) => {
        draftState.loading = action.loading;
      });
    // return state.set('loading', action.loading);
    default:
      return state;
  }
}
export default reducer;
