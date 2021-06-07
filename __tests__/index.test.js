/* eslint-disable global-require */
const fs = require('fs');
const path = require('path');
const nock = require('nock');
const OASNormalize = require('..');
const swagger = require('@readme/oas-examples/2.0/json/petstore.json');
const openapi = require('@readme/oas-examples/3.0/json/petstore.json');

const openapiYaml = require.resolve('@readme/oas-examples/3.0/yaml/petstore.yaml');

describe('#load', () => {
  it('should reject if unrecognized file supplied', async () => {
    await expect(new OASNormalize().load()).rejects.toThrow('Could not load this file.');
  });

  it('should support JSON objects', () => {
    const o = new OASNormalize(swagger);
    return o.load().then(res => {
      expect(res).toStrictEqual(swagger);
    });
  });

  it('should support stringified JSON objects', () => {
    const def = JSON.stringify(swagger);
    const o = new OASNormalize(def);
    return o.load().then(res => {
      expect(res).toStrictEqual(swagger);
    });
  });

  it('should support YAML', () => {
    const yaml = fs.readFileSync(openapiYaml, 'utf8');
    const o = new OASNormalize(yaml);
    return o.load().then(res => {
      expect(res).toStrictEqual(openapi);
    });
  });

  it('should support buffers', () => {
    const yaml = fs.readFileSync(openapiYaml);
    const o = new OASNormalize(yaml);
    return o.load().then(res => {
      expect(res).toStrictEqual(openapi);
    });
  });

  describe('urls', () => {
    it('should support URLs', () => {
      const mock = nock('http://example.com').get('/swagger.json').reply(200, swagger);
      const o = new OASNormalize('http://example.com/swagger.json');

      return o.load().then(res => {
        expect(res).toStrictEqual(swagger);
        mock.done();
      });
    });

    it('should support HTTPS URLs', () => {
      const mock = nock('https://example.com').get('/swagger.json').reply(200, swagger);
      const o = new OASNormalize('https://example.com/swagger.json');

      return o.load().then(res => {
        expect(res).toStrictEqual(swagger);
        mock.done();
      });
    });
  });

  describe('paths', () => {
    it('should support paths', () => {
      const o = new OASNormalize(openapiYaml, { enablePaths: true });
      return o.load().then(res => {
        expect(res).toStrictEqual(openapi);
      });
    });

    it('should reject if `enablePaths` is not set', async () => {
      const o = new OASNormalize(openapiYaml);
      await expect(o.load()).rejects.toThrow('Use `opts.enablePaths` to enable accessing local files.');
    });
  });
});

describe('#bundle', () => {
  it('should bundle a swagger definition', async () => {
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
    expect(openapi.paths['/pet'].post.requestBody).toStrictEqual({
      $ref: '#/components/requestBodies/Pet',
    });

    const o = new OASNormalize(openapi);
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
  describe('Swagger', () => {
    it('should validate a URL hosting JSON as expected', async () => {
      const mock = nock('http://example.com').get('/swagger.json').reply(200, swagger);
      const o = new OASNormalize('http://example.com/swagger.json');
      const definition = await o.validate(true);

      expect(definition.openapi).toBe('3.0.0');
      expect(Object.keys(definition.paths)).toHaveLength(14);
      expect(definition.paths['/pet'].post.operationId).toBe('addPet');
      expect(Object.keys(definition.components.requestBodies)).toHaveLength(2);
      expect(Object.keys(definition.components.securitySchemes)).toHaveLength(2);
      expect(Object.keys(definition.components.schemas)).toHaveLength(6);

      mock.done();
    });

    it('should validate a JSON path as expected', async () => {
      const contents = require.resolve('@readme/oas-examples/2.0/json/petstore.json');
      const o = new OASNormalize(contents, { enablePaths: true });
      const definition = await o.validate(true);

      expect(definition.openapi).toBe('3.0.0');
      expect(Object.keys(definition.paths)).toHaveLength(14);
      expect(definition.paths['/pet'].post.operationId).toBe('addPet');
      expect(Object.keys(definition.components.requestBodies)).toHaveLength(2);
      expect(Object.keys(definition.components.securitySchemes)).toHaveLength(2);
      expect(Object.keys(definition.components.schemas)).toHaveLength(6);
    });

    it("should not convert a swagger definition to openapi if we don't want to", async () => {
      const o = new OASNormalize(swagger);
      expect(await o.validate()).toStrictEqual(swagger);
    });

    describe('error handling', () => {
      it('should error out on a definition a missing component', async () => {
        const contents = path.join(__dirname, '__fixtures__', 'invalid', 'swagger.json');
        const o = new OASNormalize(contents, { enablePaths: true });

        expect.hasAssertions();
        await o.validate().catch(err => {
          // eslint-disable-next-line jest/no-conditional-expect
          expect(err.message).toBe('Token "Category" does not exist.');
        });
      });

      it("should error out when a definition doesn't match the spec", async () => {
        // This definition is missing `paths`, which should incur a failed validation check.
        const contents = {
          openapi: '3.0.3',
          info: {
            title: 'Example OpenAPI base file for `oas`.',
            version: '1.0',
          },
          servers: [
            {
              url: 'https://api.example.com',
            },
          ],
        };

        const o = new OASNormalize(contents);
        expect.hasAssertions();

        await o.validate().catch(err => {
          // eslint-disable-next-line jest/no-conditional-expect
          expect(err.message).toBe('Schema is not a valid Openapi API definition');
        });
      });
    });
  });

  describe('OpenAPI', () => {
    it('should validate a URL hosting YAML as expected', async () => {
      const yaml = fs.readFileSync(openapiYaml, 'utf8');
      const mock = nock('http://example.com').get('/openapi.json').reply(200, yaml);
      const o = new OASNormalize('http://example.com/openapi.json');
      const definition = await o.validate(true);

      expect(definition.openapi).toBe('3.0.0');
      expect(definition.paths['/pet'].post.operationId).toBe('addPet');
      expect(Object.keys(definition.paths)).toHaveLength(14);
      expect(Object.keys(definition.components.schemas)).toHaveLength(6);

      mock.done();
    });

    it('should validate a YAML path as expected', async () => {
      const o = new OASNormalize(openapiYaml, { enablePaths: true });
      const definition = await o.validate(true);

      expect(definition.openapi).toBe('3.0.0');
      expect(definition.paths['/pet'].post.operationId).toBe('addPet');
      expect(Object.keys(definition.paths)).toHaveLength(14);
      expect(Object.keys(definition.components.schemas)).toHaveLength(6);
    });

    it('should error if a schema is missing', async () => {
      const contents = path.join(__dirname, '__fixtures__', 'invalid', 'openapi.json');
      const o = new OASNormalize(contents, { enablePaths: true });

      await o.validate().catch(err => {
        // eslint-disable-next-line jest/no-conditional-expect
        expect(err.message).toBe('Token "Error" does not exist.');
      });
    });
  });
});

describe('#version', () => {
  it('should detect a swagger definition', async () => {
    expect(await new OASNormalize(swagger).version()).toBe('2.0');
  });

  it('should detect an openapi definition', async () => {
    expect(await new OASNormalize(openapi).version()).toBe('3.0.0');
  });
});
