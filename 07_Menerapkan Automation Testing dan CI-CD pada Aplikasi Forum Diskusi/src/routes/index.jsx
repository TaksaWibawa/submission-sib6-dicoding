import React from 'react';
import { useRoutes } from 'react-router-dom';
import routes from './routes.json';
import { PrivateRoute, ProtectedRoute } from './access-routes';
import { FEATURES } from './features';

export default function RoutesBase() {
  const routeComponents = routes.map((route) => {
    let RouteComponent = React.Fragment;

    if (route.meta?.isPrivate) {
      RouteComponent = PrivateRoute;
    } else if (route.meta?.isProtected) {
      RouteComponent = ProtectedRoute;
    }

    return {
      ...route,
      element: <RouteComponent>{FEATURES[route.name]}</RouteComponent>,
    };
  });

  return useRoutes(routeComponents);
}
