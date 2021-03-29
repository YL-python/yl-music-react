import React, { memo, Suspense } from 'react';
import { Provider } from 'react-redux';
import { renderRoutes } from 'react-router-config';
import { HashRouter } from 'react-router-dom';
import { Empty } from 'antd';

import routes from './router';
import store from './store';

import YLheader from './components/yl-header';
import YLPlayerAndLyric from './pages/player-lyric';

export default memo(function App(props) {
  return (
    <>
      <Provider store={store}>
        <HashRouter>
          <YLheader {...props} />
          <main>
            <Suspense fallback={<Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />}>
              {renderRoutes(routes)}
            </Suspense>
          </main>

          <YLPlayerAndLyric />
        </HashRouter>
      </Provider>
    </>
  );
});
