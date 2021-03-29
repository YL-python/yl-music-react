import { Map } from 'immutable';
// 引入常量
import * as actionTypes from './constants';
import { exploreCategories } from '@/assets/js/staticData.js';

// 迭代 初始的 state
const defaultState = Map({
  categories: exploreCategories, // 顶部按钮所有的分类
  searchCategorie: '全部', // 搜索的 categorie
  explorelist: [], // 发现页的列表
  hasMore: true, // 是否还有更多
  loading: false, // 是否在加载
});

// recommend 的 reducer函数 针对 action 类型去修改 state
function reducer(state = defaultState, action) {
  switch (action.type) {
    case actionTypes.CHANGE_CATEGORIES:
      return state.set('categories', action.categories);
    case actionTypes.CHANGE_SEARCH_CATEGORIE:
      return state.set('searchCategorie', action.searchCategorie);
    case actionTypes.CHANGE_EXPLOER_LIST:
      return state.set('explorelist', action.explorelist);
    case actionTypes.CHANGE_HASMORE:
      return state.set('hasMore', action.hasMore);
    case actionTypes.CHANGE_LOADING:
      return state.set('loading', action.loading);
    default:
      return state;
  }
}
export default reducer;
