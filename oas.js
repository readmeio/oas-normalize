/* TODO:
 * - documentation
 *   - errors
 *   - functions
 *   - credits
 * - promise support
 * - convert from v2 -> v3
 */

const r2 = require('r2')
const fs = require('fs');
const YAML = require('yamljs');
const $RefParser = require('json-schema-ref-parser');
const deepClone = require('deep-extend');
const converter = require('swagger2openapi');

const v2 = require('./validators/v2.js');
const v3 = require('./validators/v3.js');

class OAS {
  constructor(file, opts) {
    this.file = file;
    this.opts = deepClone({
      enablePaths: false,
    }, opts);
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

    const success = (obj) => {
      obj = utils.stringToJSON(obj);
      this.f_load = obj;
      cb(null, obj);
    };

    if (this.type === 'json' || this.type === 'string-json' || this.type === 'string-yaml') {
      return success(this.file);
    } else if(this.type === 'buffer') {
      return success(this.file.toString());
    } else if (this.type === 'url') {
      let resp = await r2.get(this.file).text;
      return success(resp);
    } else if (this.type === 'path') {
      // Load a local file
      if (!this.opts.enablePaths) {
        return cb(new Error("Use opts.enablePaths to enable accessing local files"));
      }

      const contents = fs.readFileSync(this.file).toString();
      return success(contents);
    } else {
      cb(new Error("Could not load this file"));
    }
  }

  bundle(cb) {
    if (this.out.bundle) return cb(null, this.out.bundle);

    this.load((err, schema) => {
      if (err) return cb(err);
      $RefParser.bundle(schema, (err, _schema) => {
        if (err) return cb(err);
        this.out.bundle = _schema;
        cb(null, _schema);
      });
    });
  }

  deref(cb) {
    if (this.out.deref) return cb(null, this.out.deref);

    this.load((err, schema) => {
      if (err) return cb(err);
      $RefParser.dereference(schema, (err, _schema) => {
        if (err) return cb(err);
        this.out.deref = _schema;
        cb(null, _schema);
      });
    });
  }

  validate(cb, convertToLatest) {
    this.deref((err, schema) => {
      if (err) return cb(err);

      const baseVersion = parseInt(utils.version(schema));

      const done = (err, out) => {
        if (err) return cb(err);

        if (out && convertToLatest) {
          return converter.convertObj(out, {}, (err, options) => {
            cb(null, options.openapi);
          });
        } else {
          cb(null, out);
        }
      }

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

const utils = {
  // YAML or JSON string to JSON Object
  stringToJSON : (string) => {
    if (typeof string === 'object') {
      return deepClone({}, string);
    } else if (string.match(/^\s*{/)) {
      return JSON.parse(string);
    } else {
      return YAML.parse(string);
    }
  },

  type : (obj) => {
    if (utils.isBuffer(obj)) {
      return 'buffer';
    } if (typeof obj === 'object') {
      return 'json';
    } else if (typeof obj === 'string') {
      if (obj.match(/\s*{/)) {
        return 'string-json';
      }
      if (obj.match(/\n/)) { // Not sure about this...
        return 'string-yaml';
      }
      if (obj.substr(0, 4) === 'http') {
        return 'url';
      }
      return 'path';
    }
    return false;
  },

  version: schema => schema.swagger || schema.openapi,

  isBuffer: obj => obj != null && obj.constructor != null &&
    typeof obj.constructor.isBuffer === 'function' && obj.constructor.isBuffer(obj),

};

module.exports = OAS;
