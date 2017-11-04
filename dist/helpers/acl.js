'use strict';

import base64 from '../helpers/base64';

export default class Acl {
  static getCookies(cookies, token) {
    let result = {};

    if (token) {
      result.user = base64.decodeToken(token);
      result.company = JSON.parse(cookies.get('meistefitCompany') || '{}');
      result.twoFactorAuth = JSON.parse(cookies.get('meistefit2FA') || '{}');
    } else {
      //let clientCookies = CookieDough();
      result.user = JSON.parse(cookies.get('meisterfitAdmin') || '{}');
      result.company = JSON.parse(cookies.get('meistefitCompany') || '{}');
      result.twoFactorAuth = JSON.parse(cookies.get('meistefit2FA') || '{}');
    }
    return result;
  }

  static app(cookies, user, company,twoFactorAuth) {
    return (nextState, replace) => {

      const user = user || Acl.getCookies(cookies).user;
      const company = Acl.isEmpty(company) ? Acl.getCookies(cookies).company : company;
      const twoFactorAuth = twoFactorAuth || Acl.getCookies(cookies).twoFactorAuth;
      const {activated=false,confirm=false} = twoFactorAuth;
      if (!user || !user.token || Acl.isEmpty(company) || (activated && !confirm) ) {
        replace('/login');
      }
    };
  }

  static login(cookies, user, company,twoFactorAuth) {
    return (nextState, replace) => {
      const user = user || Acl.getCookies(cookies).user;
      const company = Acl.isEmpty(company) ? Acl.getCookies(cookies).company : company;
      const twoFactorAuth = twoFactorAuth || Acl.getCookies(cookies).twoFactorAuth;
      const {activated=false,confirm=false} = twoFactorAuth;
      if (user && user.token && !Acl.isEmpty(company) && (activated && confirm || !activated && !confirm)) {
        replace('/');
      }
    }
  }

  static company(store, cookies) {
    return (nextState, replaceState) => {
      let companyId;

      try {
        companyId = store.getState().auth.companyId;
      } catch (err) {
        companyId = Acl.getCookies(cookies).companyId;
      }
    }
  }

  static admin(store, token) {
    return (nextState, replace) => {
      let role, user, state;

      try {
        state = store.getState();
        role = state.auth.user.user_role;
      } catch (err) {
        try {
          user = Acl.getCookies(token).user;
          role = base64.decodeToken(Acl.getCookies(token).user.token).user_role;
        } catch  (err) {
          console.error(err.message);
        }
      }

      if (role !== '1') {
        replace('/');
      }
    }
  }
  static isEmpty(obj) {
    if(obj) {
      return Object.keys(obj).length === 0 && obj.constructor === Object;
    }
    else {
      return true;
    }
  }
}
