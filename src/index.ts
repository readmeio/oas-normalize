import type { OpenAPI } from 'openapi-types';

import fs from 'fs';

import openapiParser from '@readme/openapi-parser';
import fetch from 'node-fetch';

import converter from 'swagger2openapi';

import * as utils from './lib/utils';

export type Options = {
  colorizeErrors?: boolean;
  enablePaths?: boolean;
};

export default class OASNormalize {
  cache: {
    bundle?: false | OpenAPI.Document;
    deref?: false | OpenAPI.Document;
    load?: false | Record<string, unknown>;
  };

  file: any;

  opts: Options;

  type: boolean | string;

  constructor(file: any, opts?: Options) {
    this.file = file;
    this.opts = {
      colorizeErrors: false,
      enablePaths: false,
      ...opts,
    };

    this.type = utils.getType(this.file);

    this.cache = {
      load: false,
      bundle: false,
      deref: false,
    };
  }

  // Internal API for the most part
  async load() {
    if (this.cache.load) return Promise.resolve(this.cache.load);

    const resolve = (obj: Parameters<typeof utils.stringToJSON>[0]) => {
      const ret = utils.stringToJSON(obj);
      this.cache.load = ret;
      return Promise.resolve(ret);
    };

    switch (this.type) {
      case 'json':
      case 'string-json':
      case 'string-yaml':
        return resolve(this.file);

      case 'buffer':
        return resolve(this.file.toString());

      case 'url':
        const resp = await fetch(this.file).then(res => res.text());
        return resolve(resp);

      case 'path':
        // Load a local file
        if (!this.opts.enablePaths) {
          return Promise.reject(new Error('Use `opts.enablePaths` to enable accessing local files.'));
        }

        const contents = fs.readFileSync(this.file).toString();
        return resolve(contents);

      default:
        return Promise.reject(new Error('Could not load this file.'));
    }
  }

  /**
   * Bundle up the given OpenAPI or Swagger definition, resolving any external `$ref` pointers in
   * the process.
   *
   */
  async bundle() {
    if (this.cache.bundle) return Promise.resolve(this.cache.bundle);

    return this.load()
      .then(schema => openapiParser.bundle(schema))
      .then(bundle => {
        this.cache.bundle = bundle;
        return bundle;
      });
  }

  /**
   * Dereference the given OpenAPI or Swagger.
   *
   */
  async deref() {
    if (this.cache.deref) return Promise.resolve(this.cache.deref);

    return this.load()
      .then(schema => openapiParser.dereference(schema))
      .then(dereferenced => {
        this.cache.deref = dereferenced;
        return dereferenced;
      });
  }

  /**
   * Validate a given OpenAPI or Swagger definition, potentially upconverting it from Swagger to
   * OpenAPI in the process if you wish.
   *
   */
  async validate(convertToLatest = false) {
    const colorizeErrors = this.opts.colorizeErrors;

    return this.load().then(async schema => {
      const baseVersion = parseInt(utils.version(schema), 10);

      if (baseVersion === 1) {
        return Promise.reject(new Error('Swagger v1.2 is unsupported.'));
      } else if (baseVersion === 2 || baseVersion === 3) {
        /**
         * `openapiParser.validate()` dereferences schemas at the same time as validation and does
         * not give us an option to disable this. Since all we already have a dereferencing method
         * on this library and our `validate()` method here just needs to tell us if the definition
         * is valid or not we need to clone it before passing it over to `openapi-parser` so as to
         * not run into pass-by-reference problems.
         */
        const clonedSchema = JSON.parse(JSON.stringify(schema));

        return openapiParser
          .validate(clonedSchema, {
            validate: {
              colorizeErrors,
            },
          })
          .then(() => {
            if (!convertToLatest) {
              return schema;
            }

            return converter.convertObj(schema, { anchors: true }).then((options: { openapi: OpenAPI.Document }) => {
              return options.openapi;
            });
          })
          .catch(err => Promise.reject(err));
      }

      return Promise.reject(new Error('The supplied API definition is unsupported.'));
    });
  }

  /**
   * Retrieve the OpenAPI or Swagger version of the current API definition.
   *
   */
  version() {
    return this.load().then(schema => utils.version(schema));
  }
}
