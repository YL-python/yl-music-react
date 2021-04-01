import { Map } from 'immutable';
// 引入常量
import * as actionTypes from './constants';
import produce from 'immer';

// 迭代 初始的 state
const defaultState = Map({
  historySongList: [], // 历史播放 列表
  likeSongList: [], // 喜欢的歌曲 列表
  likePlaylist: [], // 喜欢的歌单 列表
});

// recommend 的 reducer函数 针对 action 类型去修改 state
function reducer(state = defaultState, action) {
  switch (action.type) {
    case actionTypes.CHANGE_HISTORYSONGLIST:
      return state.set('historySongList', action.historySongList);
    case actionTypes.CHANGE_LIKESONGLIST:
      return state.set('likeSongList', action.likeSongList);
    case actionTypes.CHANGE_LIKEPLAYLIST:
      return state.set('likePlaylist', action.likePlaylist);
    default:
      return state;
  }
}
export default reducer;
