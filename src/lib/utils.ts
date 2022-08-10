import type { OpenAPIV2, OpenAPIV3, OpenAPIV3_1 } from 'openapi-types';

import YAML from 'js-yaml';

/**
 * Retrieve the Swagger or OpenAPI version that a given Swagger or OpenAPI definition are targeting.
 *
 */
export function version(schema: OpenAPIV2.Document & OpenAPIV3.Document & OpenAPIV3_1.Document) {
  return schema.swagger || schema.openapi;
}

/**
 * Determine if a given variable is a `Buffer`.
 *
 */
export function isBuffer(obj: any) {
  return (
    obj != null &&
    obj.constructor != null &&
    typeof obj.constructor.isBuffer === 'function' &&
    obj.constructor.isBuffer(obj)
  );
}

/**
 * Convert a YAML blob or stringified JSON object into a JSON object.
 *
 */
export function stringToJSON(string: string | Record<string, unknown>) {
  if (typeof string === 'object') {
    return string;
  } else if (string.match(/^\s*{/)) {
    return JSON.parse(string);
  }

  return YAML.load(string);
}

/**
 * Determine the type of a given variable. Returns `false` if unrecognized.
 *
 */
export function getType(obj: any) {
  if (isBuffer(obj)) {
    return 'buffer';
  } else if (typeof obj === 'object') {
    return 'json';
  } else if (typeof obj === 'string') {
    if (obj.match(/\s*{/)) {
      return 'string-json';
    } else if (obj.match(/\n/)) {
      // Not sure about this...
      return 'string-yaml';
    } else if (obj.substring(0, 4) === 'http') {
      return 'url';
    }

    return 'path';
  }

  return false;
}
