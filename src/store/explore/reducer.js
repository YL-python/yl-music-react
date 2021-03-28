import { Map } from 'immutable';
// 引入常量
import * as actionTypes from './constants';
import { exploreCategories } from '@/assets/js/staticData.js';

// 迭代 初始的 state
const defaultState = Map({
  categories: exploreCategories,
});

// recommend 的 reducer函数 针对 action 类型去修改 state
function reducer(state = defaultState, action) {
  switch (action.type) {
    case actionTypes.CHANGE_CATEGORIES:
      return state.set('categories', action.categories);
    default:
      return state;
  }
}
export default reducer;
