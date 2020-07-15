import React from 'react';
import {
  RouteProps as ReactDOMRouteProps,
  Route as ReactDOMRoute,
  Redirect,
} from 'react-router-dom';

import { useAuth } from '../hooks/auth';

interface RouteProps extends ReactDOMRouteProps {
  isPrivate?: boolean;
  component: React.ComponentType;
}

/*
  Cases that might happen on the route:
  (privateRoute/UserLogged)
  - true/true = ok
  - false/false = ok
  * show the route normally

  - true/false = redirect to login route (trying to access dashboard without being logged)
  - false/true = redirect to dashboard route (trying to access login page but is already logged)
*/

// Create our own Route component, that has all the props from the normal Route component, and can have custom props

// prop component is the value from component={Dashboard}
// render(location) => use location to not lose the navifgation history
const Route: React.FC<RouteProps> = ({
  isPrivate = false,
  component: Component,
  ...rest
}) => {
  const { user } = useAuth();

  return (
    <ReactDOMRoute
      {...rest}
      render={({ location }) => {
        console.log(location);
        return isPrivate === !!user ? (
          <Component />
        ) : (
          <Redirect
            to={{
              pathname: isPrivate ? '/' : '/dashboard',
              state: { from: location },
            }}
          />
        );
      }}
    />
  );
};

export default Route;
