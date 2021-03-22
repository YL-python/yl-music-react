import React, { memo, Suspense } from 'react';
import { renderRoutes } from 'react-router-config';
import { HashRouter } from 'react-router-dom';

import YLheader from './components/yl-header';

import routes from './router';

export default memo(function App() {
  return (
    <>
      <HashRouter>
        <YLheader />
        <main>
          <Suspense fallback={<div>page loading</div>}>{renderRoutes(routes)}</Suspense>
        </main>
      </HashRouter>
    </>
  );
});
