import { Map } from 'immutable';
// 引入常量
import * as actionTypes from './constants';
import { PLAYMODE } from '@/assets/js/config';

// 迭代 初始的 state
const defaultState = Map({
  currentSong: { ar: [] }, // 当前播放的歌曲
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
});

// recommend 的 reducer函数 针对 action 类型去修改 state
function reducer(state = defaultState, action) {
  switch (action.type) {
    case actionTypes.CHANGE_CURRENT_SONG:
      return state.set('currentSong', action.currentSong);
    case actionTypes.CHANGE_LYRIC:
      return state.set('lyric', action.lyric);
    case actionTypes.CHANGE_PLAYMODE:
      return state.set('playMode', action.playMode);
    case actionTypes.CHANGE_MAYBEPLAYLIST:
      return state.set('maybePlaylist', action.maybePlaylist);
    case actionTypes.CHANGE_MUSICPLAYLIST:
      return state.set('musicPlaylist', action.musicPlaylist);
    case actionTypes.CHANGE_SEQUENCELAYLIST:
      return state.set('sequencePlaylist', action.sequencePlaylist);
    case actionTypes.CHANGE_FULLSCREEN:
      return state.set('fullScreen', action.fullScreen);
    case actionTypes.CHANGE_PROGRESS:
      return state.set('progress', action.progress);
    case actionTypes.CHANGE_IS_PLAYING:
      return state.set('isPlaying', action.isPlaying);
    case actionTypes.CHANGE_VOLUME:
      return state.set('volume', action.volume);
    case actionTypes.CHANGE_IS_CHANGE:
      return state.set('isChange', action.isChange);
    default:
      return state;
  }
}
export default reducer;
