const path = require('path');
const OAS = require('../oas');

describe('#validate', () => {
  describe('Swagger', () => {
    it('should validate a URL hosting JSON as expected', done => {
      const o = new OAS('http://petstore.swagger.io/v2/swagger.json');
      o.validate((err, definition) => {
        expect(definition.openapi).toBe('3.0.0');
        expect(Object.keys(definition.paths).length).toBe(14);
        expect(definition.paths['/pet'].post.operationId).toBe('addPet');
        expect(Object.keys(definition.components.requestBodies).length).toBe(2);
        expect(Object.keys(definition.components.securitySchemes).length).toBe(2);
        expect(Object.keys(definition.components.schemas).length).toBe(6);
        done();
      }, true);
    });

    it('should validate a JSON path as expected', done => {
      const contents = path.join(__dirname, 'fixtures', 'swagger', 'petstore.json');
      const o = new OAS(contents, { enablePaths: true });

      o.validate((err, definition) => {
        expect(definition.openapi).toBe('3.0.0');
        expect(Object.keys(definition.paths).length).toBe(14);
        expect(definition.paths['/pet'].post.operationId).toBe('addPet');
        expect(Object.keys(definition.components.requestBodies).length).toBe(2);
        expect(Object.keys(definition.components.securitySchemes).length).toBe(2);
        expect(Object.keys(definition.components.schemas).length).toBe(6);
        done();
      }, true);
    });
  });

  describe('OpenAPI', () => {
    it('should validate a URL hosting YAML as expected', done => {
      const o = new OAS('https://raw.githubusercontent.com/OAI/OpenAPI-Specification/master/examples/v3.0/petstore-expanded.yaml');
      o.validate((err, definition) => {
        expect(definition.openapi).toBe('3.0.0');
        expect(definition.paths['/pets'].post.operationId).toBe('addPet');
        expect(Object.keys(definition.paths).length).toBe(2);
        expect(Object.keys(definition.components.schemas).length).toBe(3);
        done();
      }, true);
    });

    it('should validate a YAML path as expected', done => {
      const contents = path.join(__dirname, 'fixtures', 'openapi', 'petstore.yaml');
      const o = new OAS(contents, { enablePaths: true });

      o.validate((err, definition) => {
        expect(definition.openapi).toBe('3.0.0');
        expect(definition.paths['/pets'].post.operationId).toBe('addPet');
        expect(Object.keys(definition.paths).length).toBe(2);
        expect(Object.keys(definition.components.schemas).length).toBe(3);
        done();
      }, true);
    });

    it('should error if a schema is missing', done => {
      const contents = path.join(__dirname, 'fixtures', 'openapi', 'err-missing-schema.json');
      const o = new OAS(contents, { enablePaths: true });

      o.validate((err) => {
        expect(err.toString()).toEqual(
          expect.stringContaining('Token "Error" does not exist.')
        );

        done();
      }, true);
    });
  });
});
