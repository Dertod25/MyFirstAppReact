'use strict';


export default function getUserData(location) {
  let {query: {email, name, has_marketing, zip_code, token}} = location;
  let data;

  if (token) {
    data = {token, confirmed: true};
  } else {
    data = {name: decodeURI(name), email, confirmed: true};

    data.has_marketing = has_marketing === 'true';

    if (zip_code) {
      data.zip_code = zip_code;
    }


    try {
      let partsEmail = email.split(' ');

      if (partsEmail[1]) {
        data.email = partsEmail[0].concat('+', email.split(' ')[1]);
      }

    } catch (e) {
    }
  }
  return data;
}
