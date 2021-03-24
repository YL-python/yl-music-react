import React from 'react';
import { Redirect } from 'react-router-dom';

const YLHome = React.lazy(() => import('@/pages/home'));
const YLExplore = React.lazy(() => import('@/pages/explore'));
const YLMy = React.lazy(() => import('@/pages/my'));
const YLPlaylist = React.lazy(() => import('@/pages/playlist'));

const routes = [
  { path: '/', exact: true, component: YLHome },
  { path: '/explore', component: YLExplore },
  { path: '/my', component: YLMy },
  { path: '/playlist/:id', component: YLPlaylist },
  { path: '*', render: () => <Redirect to="/" /> },
];

export default routes;
