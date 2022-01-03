/* eslint-disable import/no-dynamic-require, global-require */
const fs = require('fs');
const path = require('path');
const nock = require('nock');
const OASNormalize = require('..');

function cloneObject(obj) {
  return JSON.parse(JSON.stringify(obj));
}

describe('#load', () => {
  describe.each([
    ['Swagger 2.0', '2.0'],
    ['OpenAPI 3.0', '3.0'],
    ['OpenAPI 3.1', '3.1'],
  ])('%s support', (_, version) => {
    let json;
    let yaml;

    beforeEach(() => {
      json = require(`@readme/oas-examples/${version}/json/petstore.json`);
      yaml = require.resolve(`@readme/oas-examples/${version}/yaml/petstore.yaml`);
    });

    it('should reject if unrecognized file supplied', async () => {
      await expect(new OASNormalize().load()).rejects.toThrow('Could not load this file.');
    });

    it('should support JSON objects', async () => {
      const o = new OASNormalize(cloneObject(json));
      await expect(o.load()).resolves.toStrictEqual(json);
    });

    it('should support stringified JSON objects', async () => {
      const def = JSON.stringify(cloneObject(json));
      const o = new OASNormalize(def);

      await expect(o.load()).resolves.toStrictEqual(json);
    });

    it('should support YAML', async () => {
      const o = new OASNormalize(fs.readFileSync(yaml, 'utf8'));
      await expect(o.load()).resolves.toStrictEqual(json);
    });

    it('should support buffers', async () => {
      const o = new OASNormalize(fs.readFileSync(yaml));
      await expect(o.load()).resolves.toStrictEqual(json);
    });

    describe('urls', () => {
      it('should support URLs', async () => {
        const mock = nock('http://example.com').get(`/api-${version}.json`).reply(200, json);
        const o = new OASNormalize(`http://example.com/api-${version}.json`);

        await expect(o.load()).resolves.toStrictEqual(json);
        mock.done();
      });

      it('should support HTTPS URLs', async () => {
        const mock = nock('https://example.com').get(`/api-${version}.json`).reply(200, json);
        const o = new OASNormalize(`https://example.com/api-${version}.json`);

        await expect(o.load()).resolves.toStrictEqual(json);
        mock.done();
      });
    });

    describe('paths', () => {
      it('should support paths', async () => {
        const o = new OASNormalize(yaml, { enablePaths: true });
        await expect(o.load()).resolves.toStrictEqual(json);
      });

      it('should reject if `enablePaths` is not set', async () => {
        const o = new OASNormalize(yaml);
        await expect(o.load()).rejects.toThrow('Use `opts.enablePaths` to enable accessing local files.');
      });
    });
  });
});

describe('#bundle', () => {
  it('should bundle an external schema in', async () => {
    const petSchema = require('./__fixtures__/bundle/pet.json');
    const contents = require.resolve('./__fixtures__/bundle/definition.json');
    const o = new OASNormalize(contents, { enablePaths: true });
    const bundled = await o.bundle();

    expect(bundled.components.requestBodies.Pet.content).toStrictEqual({
      'application/json': {
        schema: {
          $ref: '#/components/requestBodies/Pet/content/application~1xml/schema',
        },
      },
      'application/xml': {
        schema: petSchema,
      },
    });
  });
});

describe('#deref', () => {
  it('should dereference a definition', async () => {
    const openapi = require('@readme/oas-examples/3.0/json/petstore.json');
    expect(openapi.paths['/pet'].post.requestBody).toStrictEqual({
      $ref: '#/components/requestBodies/Pet',
    });

    const o = new OASNormalize(cloneObject(openapi));
    const deref = await o.deref();
    expect(deref.paths['/pet'].post.requestBody).toStrictEqual({
      description: 'Pet object that needs to be added to the store',
      required: true,
      content: {
        'application/json': expect.any(Object),
        'application/xml': expect.any(Object),
      },
    });
  });
});

describe('#validate', () => {
  it("should not convert a Swagger definition to OpenAPI if we don't want to", async () => {
    const swagger = require('@readme/oas-examples/2.0/json/petstore.json');
    const o = new OASNormalize(cloneObject(swagger));

    await expect(o.validate()).resolves.toStrictEqual(swagger);
  });

  it('should error out on a definition a missing component', async () => {
    const contents = path.join(__dirname, '__fixtures__', 'invalid', 'swagger.json');
    const o = new OASNormalize(contents, { enablePaths: true });

    await expect(o.validate()).rejects.toThrow('Token "Category" does not exist.');
  });

  it('should error if a schema is missing', async () => {
    const contents = path.join(__dirname, '__fixtures__', 'invalid', 'openapi.json');
    const o = new OASNormalize(contents, { enablePaths: true });

    await expect(o.validate()).rejects.toThrow('Token "Error" does not exist.');
  });

  it("should error out when a definition doesn't match the spec", async () => {
    // This definition is missing `paths`, which should incur a failed validation check.
    const contents = {
      openapi: '3.0.3',
      info: {
        title: 'Example OpenAPI base file for `oas`.',
        version: '1.0',
      },
    };

    const o = new OASNormalize(contents);
    await expect(o.validate()).rejects.toThrow('Supplied schema is not a valid OpenAPI definition.');
  });

  it("should error out when a definition doesn't match the schema", async () => {
    const o = new OASNormalize(require.resolve('./__fixtures__/invalid/openapi-3.1.json'), { enablePaths: true });

    await expect(o.validate()).rejects.toStrictEqual(
      expect.objectContaining({
        message: expect.stringContaining("REQUIRED must have required property 'name'"),
        details: expect.any(Array),
      })
    );
  });

  // Skipping because the `chalk` dependency of `better-ajv-errors` within `openapi-parser` has issues in CI. Test
  // works fine locally though!
  it.skip('should colorize errors when `opts.colorizeErrors` is present', async () => {
    const o = new OASNormalize(require.resolve('./__fixtures__/invalid/openapi-3.1.json'), {
      colorizeErrors: true,
      enablePaths: true,
    });

    await expect(o.validate()).rejects.toMatchSnapshot();
  });

  describe.each([
    ['Swagger 2.0', '2.0'],
    ['OpenAPI 3.0', '3.0'],
    ['OpenAPI 3.1', '3.1'],
  ])('%s support', (_, version) => {
    it('should validate a URL hosting JSON as expected', async () => {
      const json = require(`@readme/oas-examples/${version}/json/petstore.json`);

      const mock = nock('http://example.com').get(`/api-${version}.json`).reply(200, cloneObject(json));
      const o = new OASNormalize(`http://example.com/api-${version}.json`);

      await expect(o.validate(true)).resolves.toMatchSnapshot();
      mock.done();
    });

    it('should validate a JSON path as expected', async () => {
      const o = new OASNormalize(require.resolve(`@readme/oas-examples/${version}/json/petstore.json`), {
        enablePaths: true,
      });

      await expect(o.validate(true)).resolves.toMatchSnapshot();
    });

    it('should validate a URL hosting YAML as expected', async () => {
      const yaml = fs.readFileSync(require.resolve(`@readme/oas-examples/${version}/yaml/petstore.yaml`), 'utf8');
      const mock = nock('http://example.com').get(`/api-${version}.yaml`).reply(200, yaml);
      const o = new OASNormalize(`http://example.com/api-${version}.yaml`);

      await expect(o.validate(true)).resolves.toMatchSnapshot();
      mock.done();
    });

    it('should validate a YAML path as expected', async () => {
      const o = new OASNormalize(require.resolve(`@readme/oas-examples/${version}/yaml/petstore.yaml`), {
        enablePaths: true,
      });

      await expect(o.validate(true)).resolves.toMatchSnapshot();
    });
  });
});

describe('#version', () => {
  it('should detect a Swagger definition', async () => {
    await expect(
      new OASNormalize(require.resolve('@readme/oas-examples/2.0/json/petstore.json'), { enablePaths: true }).version()
    ).resolves.toBe('2.0');
  });

  it('should detect an OpenAPI definition', async () => {
    await expect(
      new OASNormalize(require('@readme/oas-examples/3.0/json/petstore.json'), { enablePaths: true }).version()
    ).resolves.toBe('3.0.0');

    await expect(
      new OASNormalize(require('@readme/oas-examples/3.1/json/petstore.json'), { enablePaths: true }).version()
    ).resolves.toBe('3.1.0');
  });
});
