const swagger = require('swagger-parser');

module.exports = (el, cb) => {
  swagger.validate(el.out.deref, (err, out) => {
    if (err) {
      if (err.details && err.details.length) {
        return cb({
          errors: [{
          message: err.details[0].message,
          path: err.details[0].path,
        }], full: err});
      } else {
        return cb({
          errors: [{
            message: err.message.replace(/\[object Object\]/g, 'Schema')
          }], full: err});
      }
    } else {
      return cb(null, el.out.deref);
    }
  });
};
