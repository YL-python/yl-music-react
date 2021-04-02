// import { Map } from 'immutable';
import produce from 'immer';
// 引入常量
import * as actionTypes from './constants';

// 迭代 初始的 state
const defaultState = {
  recommendList: [],
};

// recommend 的 reducer函数 针对 action 类型去修改 state
function reducer(state = defaultState, action) {
  switch (action.type) {
    case actionTypes.CHANGE_RECOMMEND_LIST:
      return produce(state, (draftState) => {
        draftState.recommendList = action.recommendList;
      });
    // return state.set('recommendList', action.recommendList);
    default:
      return state;
  }
}
export default reducer;
