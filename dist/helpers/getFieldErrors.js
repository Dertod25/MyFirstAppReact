export default function getFieldErrors(err) {
  let serverErrors = {};
  if (Object.keys(err).length === 0 && err.constructor === Object) {
    return {};
  }
  if (err.errors && err.errors.length > 0) {
    err.errors.forEach(function(obj) {
      serverErrors[obj.param] = obj.msg
    });
  } else {
    serverErrors = {
      email: err.message,
      password: err.message
    }
  }
  return serverErrors;
}
