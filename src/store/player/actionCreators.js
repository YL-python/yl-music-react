// 引入常量
import * as actionTypes from './constants';
import Lyric from '@/utils/lyric-parse';
import { PLAYMODE } from '@/assets/js/config';

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
const changePlayModeAction = (playMode) => ({
  type: actionTypes.CHANGE_PLAYMODE,
  playMode,
});
const changeMabyPlaylisteAction = (maybePlaylist) => ({
  type: actionTypes.CHANGE_MAYBEPLAYLIST,
  maybePlaylist,
});
const changeSequencePlaylisteAction = (sequencePlaylist) => ({
  type: actionTypes.CHANGE_SEQUENCELAYLIST,
  sequencePlaylist,
});
const changeMusicPlaylisteAction = (musicPlaylist) => ({
  type: actionTypes.CHANGE_MUSICPLAYLIST,
  musicPlaylist,
});
export const changeFullScreenAction = (fullScreen) => ({
  type: actionTypes.CHANGE_FULLSCREEN,
  fullScreen,
});
export const changeProgerssAction = (progress) => ({
  type: actionTypes.CHANGE_PROGRESS,
  progress,
});
export const changeVolumeAction = (volume) => ({
  type: actionTypes.CHANGE_VOLUME,
  volume,
});
export const changeIsPlayingAction = (isPlaying) => ({
  type: actionTypes.CHANGE_IS_PLAYING,
  isPlaying,
});
export const changeIsChangeAction = (isChange) => ({
  type: actionTypes.CHANGE_IS_CHANGE,
  isChange,
});

export const setMabyPlaylistAction = (maybePlaylist) => {
  return (dispatch) => {
    dispatch(changeMabyPlaylisteAction(maybePlaylist.filter((song) => song.playable)));
  };
};

export const setCurrentSongAction = (currentSong) => {
  return (dispatch) => {
    dispatch(changeCurrentSongAction(currentSong));
    getLyric(currentSong.id).then((res) => {
      let lyric = new Lyric(res);

      dispatch(changeLyricAction(lyric));
    });
  };
};

// 切换歌曲的action 根据flag判断是上一首还是下一首
export const switchCurrentSongAction = (flag) => {
  return (dispatch, getState) => {
    // 获取真实的播放列表
    const musicPlaylist = getState().player.musicPlaylist;
    const currentSong = getState().player.currentSong;
    let currentIndex = musicPlaylist.findIndex((song) => song.id === currentSong.id);
    currentIndex += flag;
    let listLength = musicPlaylist.length;
    if (currentIndex >= listLength) {
      currentIndex = 0;
    } else if (currentIndex < 0) {
      currentIndex = listLength - 1;
    }
    dispatch(setCurrentSongAction(musicPlaylist[currentIndex]));
  };
};

export const setPlayModeAction = (playMode) => {
  return (dispatch, getState) => {
    dispatch(changePlayModeAction(playMode));
    dispatch(setPlaylistAction());
  };
};

// 根据播放模式设置播放列表的方法  第一次点击歌曲的时候主动设置  每次切换歌曲播放模式的时候被动设置
export const setPlaylistAction = () => {
  return (dispatch, getState) => {
    const maybePlaylist = getState().player.maybePlaylist;
    const playMode = getState().player.playMode;
    dispatch(changeSequencePlaylisteAction(maybePlaylist));
    if (playMode === PLAYMODE.random) {
      let playlist = [...maybePlaylist];
      playlist.sort((a, b) => (Math.random() > 0.5 ? -1 : 1));
      dispatch(changeMusicPlaylisteAction(playlist));
    } else {
      dispatch(changeMusicPlaylisteAction(maybePlaylist));
    }
  };
};
