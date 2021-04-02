import { combineReducers } from 'redux';

// 引入每一个模块的 reducer
import { reducer as homeReducer } from './home';
import { reducer as playerReducer } from './player';
import { reducer as exploreReducer } from './explore';
import { reducer as userReducer } from './user';

// 数据持久化
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/es/storage';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';

// 持久化;
const userConfig = {
  key: 'user',
  storage: storage,
  // 黑白名单同时存在 忽略黑名单
  // blacklist: ['likePlaylist'], // 不持久化白名单中的数据
  // whitelist: ['likeSongList'], // 持久化白名单中的数据
  stateReconciler: autoMergeLevel2,
};
// 持久化;
const playerConfig = {
  key: 'player',
  storage: storage,
  blacklist: ['maybePlaylist', 'fullScreen', 'isPlaying', 'isChange'],
};

// combineReducers 是会帮助我们对每个返回的对象进行一个浅层比较  相同就直接返回原来的对象，会节约一点性能
// combineReducers 返回值是一个函数  函数的内部返回值是 每一次迭代之后的 state
const cReducer = combineReducers({
  home: homeReducer,
  player: persistReducer(playerConfig, playerReducer),
  explore: exploreReducer,
  user: persistReducer(userConfig, userReducer),
});

export default cReducer;
// export default cReducer;
