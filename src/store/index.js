import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import reducer from './reducer';

// disable reaet-dev-tools for this project
// if (typeof window.__REACT_DEVTOOLS_GLOBAL_HOOK__ === 'object') {
//   for (let [key, value] of Object.entries(window.__REACT_DEVTOOLS_GLOBAL_HOOK__)) {
//     window.__REACT_DEVTOOLS_GLOBAL_HOOK__[key] =
//       typeof value == 'function' ? () => {} : null;
//   }
// }

// redux  浏览器插件
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// 集成中间件  创建 store
// reducer 是 array.reduce 的迭代函数，里面会返回迭代的对象
const store = createStore(reducer, composeEnhancers(applyMiddleware(thunk)));

export default store;
