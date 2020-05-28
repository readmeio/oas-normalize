const r2 = require('r2');
const fs = require('fs');
const $RefParser = require('@apidevtools/json-schema-ref-parser');
const deepClone = require('deep-extend');
const converter = require('swagger2openapi');

const v2 = require('./validators/v2.js');
const v3 = require('./validators/v3.js');
const utils = require('./lib/utils');

class OAS {
  constructor(file, opts) {
    this.file = file;
    this.opts = deepClone({ enablePaths: false }, opts);
    this.type = utils.type(this.file);

    this.out = {
      load: false,
      bundle: false,
      deref: false,
    };
  }

  // Internal API for the most part
  async load(cb) {
    if (this.out.load) return cb(null, this.out.load);

    const success = obj => {
      const ret = utils.stringToJSON(obj);
      this.f_load = ret;
      cb(null, ret);
    };

    if (this.type === 'json' || this.type === 'string-json' || this.type === 'string-yaml') {
      return success(this.file);
    } else if (this.type === 'buffer') {
      return success(this.file.toString());
    } else if (this.type === 'url') {
      const resp = await r2.get(this.file).text;
      return success(resp);
    } else if (this.type === 'path') {
      // Load a local file
      if (!this.opts.enablePaths) {
        return cb(new Error('Use opts.enablePaths to enable accessing local files'));
      }

      const contents = fs.readFileSync(this.file).toString();
      return success(contents);
    } else {
      cb(new Error('Could not load this file'));
    }
  }

  bundle(cb) {
    if (this.out.bundle) return cb(null, this.out.bundle);

    this.load((err, schema) => {
      if (err) return cb(err);
      $RefParser.bundle(schema, (err2, _schema) => {
        if (err2) return cb(err2);
        this.out.bundle = _schema;
        cb(null, _schema);
      });
    });
  }

  deref(cb) {
    if (this.out.deref) return cb(null, this.out.deref);

    this.load((err, schema) => {
      if (err) return cb(err);
      $RefParser.dereference(schema, (err2, _schema) => {
        if (err2) return cb(err2);
        this.out.deref = _schema;
        cb(null, _schema);
      });
    });
  }

  validate(cb, convertToLatest) {
    this.deref((err, schema) => {
      if (err) return cb(err);

      const baseVersion = parseInt(utils.version(schema), 10);

      const done = (err2, out) => {
        if (err2) return cb(err2);

        if (out && convertToLatest) {
          return converter.convertObj(out, {}, (err3, options) => {
            cb(null, options.openapi);
          });
        } else {
          cb(null, out);
        }
      };

      if (baseVersion === 1) {
        return cb(new Error("Doesn't currently support Swagger v1.2"));
      }

      if (baseVersion === 2) {
        return v2(this, done);
      }

      if (baseVersion === 3) {
        return v3(this, done);
      }

      return cb(new Error("We can't find this version"));
    });
  }

  version(cb) {
    this.load((err, schema) => {
      if (err) return cb(err);
      return cb(null, utils.version(schema));
    });
  }
}

module.exports = OAS;
