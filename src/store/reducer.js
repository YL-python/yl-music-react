// import { combineReducers } from 'redux';
import { combineReducers } from 'redux-immutable';

// 引入每一个模块的 reducer
import { reducer as homeReducer } from './home';
import { reducer as playerReducer } from './player';
import { reducer as exploreReducer } from './explore';

// combineReducers 是会帮助我们对每个返回的对象进行一个浅层比较  相同就直接返回原来的对象，会节约一点性能
// combineReducers 返回值是一个函数  函数的内部返回值是 每一次迭代之后的 state
const cReducer = combineReducers({
  home: homeReducer,
  player: playerReducer,
  explore: exploreReducer,
});

export default cReducer;
