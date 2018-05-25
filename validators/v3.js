/*
const validator = require('speccy/lib/validator');
*/

const validator = require('swagger2openapi/validate.js');

module.exports = (el, cb) => {
  validator.validate(el.out.deref, {}, (err, out) => {
    if (!out.valid) {
      return cb({
        errors: [{
        message: err.message,
      }], full: err});
    } else {
      cb(null, el.out.deref);
    }
  });
};
