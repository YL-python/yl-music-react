// 引入常量
import * as actionTypes from './constants';
import Lyric from '@/utils/lyric-parse';

// 引入请求方法
import { getLyric } from '@/service/song.js';

// 真正的 action   指明类型  指明修改的数据
const changeCurrentSongAction = (currentSong) => ({
  type: actionTypes.CHANGE_CURRENT_SONG,
  currentSong,
});
const changeLyricAction = (lyric) => ({
  type: actionTypes.CHANGE_LYRIC,
  lyric,
});

export const setCurrentSongAction = (currentSong) => {
  return (dispatch) => {
    dispatch(changeCurrentSongAction(currentSong));
    getLyric(currentSong.id).then((res) => {
      let lyric = new Lyric(res);
      dispatch(changeLyricAction(lyric));
    });
  };
};
