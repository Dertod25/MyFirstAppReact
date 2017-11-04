'use strict';

import _ from 'lodash';
import moment from 'moment';

const isEmpty = value => value === undefined || value === null || value === '';
const join = (rules) => (value, values, additional) => rules.map(rule => rule(value, values, additional)).filter(error => !!error)[0]; //first error
const trim = value => value.trim();

export function alphanumericSymbols(value) {
  if (!isEmpty(value) && !/^[0-9A-Z-_]+$/i.test(value)) {
    return 'Invalid format';
  }
}

export function requiredIfNotEqual(field, fieldValue) {
  return (value, values = {}, fieldName) => {
    if (values[field] !== fieldValue) {
      return required(value);
    }
  };
}

export function fromNowIfNotEqual(field, fieldValue, fieldEnable) {
  return (value, values = {}, fieldName) => {
    if (values[field] !== fieldValue && values[fieldEnable]) {
      if (!moment(new Date(value)).isAfter(moment(new Date()).hours(0).minutes(0).seconds(0).milliseconds(0))) {
        return 'Must be more or equal current date';
      }
    }
  };
}

export function email(value) {
  if (!isEmpty(value) && !/^\s*[\w\-\+_]+(\.[\w\-\+_]+)*\@[\w\-\+_]+\.[\w\-\+_]+(\.[\w\-\+_]+)*\s*$/i.test(value)) {
    return 'Invalid email address';
  }
}

export function emailArray(value) {
  if (Array.isArray(value)) {
    const errors = value.map(item => {
      return email(item.value) && 'Invalid email address';
    });
    return errors.some(item => item) && errors;
  }

}

export function required(value) {
  if (isEmpty(value)) {
    return 'Required';
  }
}
export function requiredArray(value) {
  if (!Array.isArray(value) || !value.length) {
    return 'Required';
  }
}
export function selected(value) {
  if (!value) {
    return 'Required';
  }
}

export function length(length) {
  return value => {
    if (!isEmpty(value) && trim(value).length !== length) {
      return ` Must be ${length} characters`;
    }
  };
}
export function minLength(min) {
  return value => {
    if (!isEmpty(value) && trim(value).length < min) {
      return `Must be at least ${min} characters`;
    }
  };
}

export function maxLength(max) {
  return value => {
    if (!isEmpty(value) && value.length > max) {
      return `Must be no more than ${max} characters`;
    }
  };
}

export function integer(value) {
  if (!Number.isInteger(Number(value))) {
    return 'Must be an integer';
  }
}

export function maxInteger(max) {
  return value => {
    if (parseInt(value) > max) {
      return `Must be less or equal ${max}`;
    }
  }
}

export function minInteger(min) {
  return value => {
    if (parseInt(value) < min) {
      return `Must be more or equal ${min}`;
    }
  }
}

export function oneOf(enumeration) {
  return value => {
    if (!~enumeration.indexOf(value)) {
      return `Must be one of: ${enumeration.join(', ')}`;
    }
  };
}

export function equal(name, msg) {
  return (value, values) => {
    if (!values || (value !== values[name])) {
      return `Must be equal ${msg}`;
    }
  };
}

export function unique(value, values, fieldName) {
  if (values.length !== _.uniq(values, fieldName).length) {
    if (_.filter(values, {[fieldName]: value}).length > 1) {
      return `Must be unique key`
    }
  }
}

export function url(value) {
  const isValidUrl = new RegExp('https?:\\/\\/(www\\.)?[-a-zA-Z0-9@:%._\\+~#=]{2,256}\.[a-z]{2,4}\\b([-a-zA-Z0-9@:%_\\+.~#?&//=]*)', 'i');
  const hasNoSpaces = new RegExp('^\\S+$');
  if ((value && !isValidUrl.test(value) || !hasNoSpaces.test(value)) && value.length > 0) {
    return 'Invalid URL';
  }
}

export function textRange(value) {
  if (_.endsWith(value, '-') || _.startsWith(value, '-') || _.endsWith(value, ',') || _.startsWith(value, ',')) {
    return 'Invalid range';
  }
}

export function createValidator(rules, skipValidationFields) {
  return (data = {}) => {
    const errors = {};

    if (skipValidationFields) {
      for (let key in skipValidationFields) {

        if (!isEmpty(data[key]) && (skipValidationFields[key] === Boolean(Number(data[key])))) {
          return errors;
        }
      }
    }

    _.forEach(rules, (rules, fieldPath) => {
      function validateArrays(data, errors, arrays, field) {
        const _arrays = arrays.slice();

        if (data.deleted) {
          return;
        }


        if (arrays.length) {
          const array = _arrays.shift();
          errors[array] = errors[array] || [];

          _.forEach(data[array], (d, i) => {
            errors[array][i] = errors[array][i] || {};
            validateArrays(d, errors[array][i], _arrays, field);
          });
        } else {
          const rule = join([].concat(rules));
          const error = rule(data[field], data);

          if (error) {
            errors[field] = error;
          }
        }

        if (field === 'deleted' && data[field]) {
          errors = {};
        }
      }

      const arrays = fieldPath.split('[].');
      const field = arrays.pop();
      validateArrays(data, errors, arrays, field);

    });

    return errors;
  };
}
