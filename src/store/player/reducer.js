import produce from 'immer';
// 引入常量
import * as actionTypes from './constants';
import { PLAYMODE } from '@/assets/js/config';

// 迭代 初始的 state
const defaultState = {
  currentSong: {}, // 当前播放的歌曲
  lyric: {}, // 歌词
  maybePlaylist: [], // 有可能的播放列表  点击歌单后会存歌单到这里
  sequencePlaylist: [], // 原始顺序的播放列表  用于展示的播放列表
  musicPlaylist: [], // 实际歌曲的播放列表
  playMode: PLAYMODE.sequence, // 播放模式  默认顺序播放
  fullScreen: false, // 大屏模式  默认是小屏就是 false
  // 集成 audio标签相关的参数
  progress: 0, // 时间进度条
  volume: 50, // 音量
  isPlaying: false, // 当前是否在播放
  isChange: false, // 当前是否在改变进度条
};

// recommend 的 reducer函数 针对 action 类型去修改 state
function reducer(state = defaultState, action) {
  switch (action.type) {
    case actionTypes.CHANGE_CURRENT_SONG:
      return produce(state, (draftState) => {
        draftState.currentSong = action.currentSong;
      });
    case actionTypes.CHANGE_LYRIC:
      return produce(state, (draftState) => {
        draftState.lyric = action.lyric;
      });
    case actionTypes.CHANGE_PLAYMODE:
      return produce(state, (draftState) => {
        draftState.playMode = action.playMode;
      });
    case actionTypes.CHANGE_MAYBEPLAYLIST:
      return produce(state, (draftState) => {
        draftState.maybePlaylist = action.maybePlaylist;
      });
    case actionTypes.CHANGE_MUSICPLAYLIST:
      return produce(state, (draftState) => {
        draftState.musicPlaylist = action.musicPlaylist;
      });
    // return state.set('musicPlaylist', action.musicPlaylist);
    case actionTypes.CHANGE_SEQUENCELAYLIST:
      return produce(state, (draftState) => {
        draftState.sequencePlaylist = action.sequencePlaylist;
      });
    // return state.set('sequencePlaylist', action.sequencePlaylist);
    case actionTypes.CHANGE_FULLSCREEN:
      return produce(state, (draftState) => {
        draftState.fullScreen = action.fullScreen;
      });
    // return state.set('fullScreen', action.fullScreen);
    case actionTypes.CHANGE_PROGRESS:
      return produce(state, (draftState) => {
        draftState.progress = action.progress;
      });
    // return state.set('progress', action.progress);
    case actionTypes.CHANGE_IS_PLAYING:
      return produce(state, (draftState) => {
        draftState.isPlaying = action.isPlaying;
      });
    // return state.set('isPlaying', action.isPlaying);
    case actionTypes.CHANGE_VOLUME:
      return produce(state, (draftState) => {
        draftState.volume = action.volume;
      });
    // return state.set('volume', action.volume);
    case actionTypes.CHANGE_IS_CHANGE:
      return produce(state, (draftState) => {
        draftState.isChange = action.isChange;
      });
    // return state.set('isChange', action.isChange);
    default:
      return state;
  }
}
export default reducer;
