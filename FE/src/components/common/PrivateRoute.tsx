import React from 'react';
import { Redirect, Route, RouteProps } from 'react-router-dom';
import { getItem } from 'utils';

export interface PrivateRouteProps {}

export function PrivateRoute(props: RouteProps) {
  // Check user i logged
  const { accessToken } = getItem('users');
  const isLoggedIn = Boolean(accessToken);
  if (!isLoggedIn) return <Redirect to="/login" />;
  // console.log('isLoggedIn: ', isLoggedIn);

  return <Route {...props} />;
}
