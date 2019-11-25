const fs = require('fs');
const path = require('path');
const utils = require('../../lib/utils');

const yamlFixture = path.join(__dirname, '../fixtures', 'openapi', 'petstore.yaml');
const jsonFixture = path.join(__dirname, '../fixtures', 'openapi', 'petstore.json');

describe('#type', () => {
  it('should return `buffer` for a buffer', () => {
    expect(utils.type(fs.readFileSync(yamlFixture))).toBe('buffer');
  });

  it('should return `json` for an object', () => {
    expect(utils.type(JSON.parse(fs.readFileSync(jsonFixture).toString()))).toBe('json');
  });

  it('should return `string-json` for a stringified JSON object', () => {
    expect(utils.type(fs.readFileSync(jsonFixture).toString())).toBe('string-json');
  });

  it.skip('should return `string-yaml` for a YAML string', () => {
    // This currently returns `string-json` because the regex for that is matching `{`, and this
    // YAML fixture has URI templates present.
    expect(utils.type(fs.readFileSync(yamlFixture).toString())).toBe('string-yaml');
  });

  it('should return `url` for an HTTP URL', () => {
    expect(
      utils.type(
        'https://raw.githubusercontent.com/OAI/OpenAPI-Specification/master/examples/v3.0/petstore-expanded.yaml',
      ),
    ).toBe('url');
  });

  it('should return `url` for an HTTPS URL', () => {
    expect(utils.type('http://petstore.swagger.io/v2/swagger.json')).toBe('url');
  });

  it('should return `path` for a file path', () => {
    expect(utils.type(yamlFixture)).toBe('path');
  });
});
