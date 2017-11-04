'use strict';

import * as authActions from '../redux/modules/auth';

export function handlerCode({code, dispatch}) {
  switch (code) {
    case 401:
      dispatch(authActions.logout());
      if (__CLIENT__) {
        window.location = '/login';
      }
      return false;

    default:
      return false;
  }
}
