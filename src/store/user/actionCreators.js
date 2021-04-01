// 引入常量
import * as actionTypes from './constants';

// 真正的 action   指明类型  指明修改的数据
const changeHistorySongListAction = (historySongList) => ({
  type: actionTypes.CHANGE_HISTORYSONGLIST,
  historySongList,
});
const changeLikeSongListAction = (likeSongList) => ({
  type: actionTypes.CHANGE_LIKESONGLIST,
  likeSongList,
});
const changeLikePlaylistAction = (likePlaylist) => ({
  type: actionTypes.CHANGE_LIKEPLAYLIST,
  likePlaylist,
});

export {
  changeHistorySongListAction,
  changeLikeSongListAction,
  changeLikePlaylistAction,
};
