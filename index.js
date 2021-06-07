const fetch = require('node-fetch');
const fs = require('fs');
const $RefParser = require('@apidevtools/json-schema-ref-parser');
const converter = require('swagger2openapi');
const SwaggerParser = require('swagger-parser');
const utils = require('./lib/utils');

class oasNormalize {
  constructor(file, opts) {
    this.file = file;
    this.opts = { enablePaths: false, ...opts };
    this.type = utils.type(this.file);

    this.cache = {
      load: false,
      bundle: false,
      deref: false,
    };
  }

  // Internal API for the most part
  async load() {
    if (this.cache.load) return Promise.resolve(this.cache.load);

    const resolve = obj => {
      const ret = utils.stringToJSON(obj);
      this.cache.load = ret;
      return Promise.resolve(ret);
    };

    if (this.type === 'json' || this.type === 'string-json' || this.type === 'string-yaml') {
      return resolve(this.file);
    } else if (this.type === 'buffer') {
      return resolve(this.file.toString());
    } else if (this.type === 'url') {
      const resp = await fetch(this.file).then(res => res.text());
      return resolve(resp);
    } else if (this.type === 'path') {
      // Load a local file
      if (!this.opts.enablePaths) {
        return Promise.reject(new Error('Use `opts.enablePaths` to enable accessing local files.'));
      }

      const contents = fs.readFileSync(this.file).toString();
      return resolve(contents);
    }

    return Promise.reject(new Error('Could not load this file.'));
  }

  async bundle() {
    if (this.cache.bundle) return Promise.resolve(this.cache.bundle);

    return this.load()
      .then(schema => $RefParser.bundle(schema))
      .then(bundle => {
        this.cache.bundle = bundle;
        return bundle;
      });
  }

  async deref() {
    if (this.cache.deref) return Promise.resolve(this.cache.deref);

    return this.load()
      .then(schema => $RefParser.dereference(schema))
      .then(dereferenced => {
        this.cache.deref = dereferenced;
        return dereferenced;
      });
  }

  async validate(convertToLatest) {
    return this.deref().then(async schema => {
      const baseVersion = parseInt(utils.version(schema), 10);

      const resolve = out => {
        if (!convertToLatest) {
          return out;
        }

        return converter.convertObj(out, { anchors: true }).then(options => {
          return options.openapi;
        });
      };

      if (baseVersion === 1) {
        return Promise.reject(new Error('Swagger v1.2 is unsupported.'));
      } else if (baseVersion === 2 || baseVersion === 3) {
        return resolve(
          await SwaggerParser.validate(schema).catch(err => {
            const error = new Error(err.message.replace(/\[object Object\]/g, 'Schema'));
            error.full = err;

            if (err.details && err.details.length) {
              error.errors = [
                {
                  message: err.details[0].message,
                  path: err.details[0].path,
                },
              ];
            } else {
              error.errors = [
                {
                  message: err.message.replace(/\[object Object\]/g, 'Schema'),
                },
              ];
            }

            return Promise.reject(error);
          })
        );
      }

      return Promise.reject(new Error('The supplied API definition is unsupported.'));
    });
  }

  version() {
    return this.load().then(schema => utils.version(schema));
  }
}

module.exports = oasNormalize;
