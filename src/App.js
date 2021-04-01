import React, { memo, Suspense } from 'react';
import { Provider } from 'react-redux';
import { renderRoutes } from 'react-router-config';
import { HashRouter } from 'react-router-dom';
import { Empty } from 'antd';
import { BackTop } from 'antd';
// import { persistStore } from 'redux-persist';
// import { PersistGate } from 'redux-persist/lib/integration/react';

import routes from './router';
import store from './store';

import YLheader from './components/yl-header';
import YLPlayerAndLyric from './pages/player-lyric';

export default memo(function App(props) {
  return (
    <>
      <Provider store={store}>
        {/* <PersistGate persistor={persistStore(store)}> */}
        <HashRouter>
          <YLheader {...props} />
          <main>
            <Suspense fallback={<Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />}>
              {renderRoutes(routes)}
            </Suspense>
          </main>

          <YLPlayerAndLyric />
          <BackTop className="back-top">
            <i className="iconfont icon-huojian"></i>
          </BackTop>
        </HashRouter>
        {/* </PersistGate> */}
      </Provider>
    </>
  );
});
