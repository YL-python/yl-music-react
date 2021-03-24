import { Map } from 'immutable';
// 引入常量
import * as actionTypes from './constants';

// 迭代 初始的 state
const defaultState = Map({
  recommendList: [],
});

// recommend 的 reducer函数 针对 action 类型去修改 state
function reducer(state = defaultState, action) {
  switch (action.type) {
    case actionTypes.CHANGE_RECOMMEND_LIST:
      return state.set('recommendList', action.recommendList);
    default:
      return state;
  }
}
export default reducer;
