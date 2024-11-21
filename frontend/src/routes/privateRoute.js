import React from 'react';
import {Navigate} from 'react-router-dom';
import {path} from '../common/routesNames';
import {getToken} from '../utils/localstorage';

const PrivateRoute = ({children}) => {
  const isLoggedIn = getToken() !== '';

  if (!isLoggedIn) {
    return <Navigate to={path.login} />;
  }

  return children;
};

export default PrivateRoute;
