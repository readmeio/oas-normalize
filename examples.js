const OAS = require('./oas.js');

var o = new OAS('https://raw.githubusercontent.com/OAI/OpenAPI-Specification/master/examples/v2.0/yaml/petstore-simple.yaml');
var o = new OAS('https://raw.githubusercontent.com/OAI/OpenAPI-Specification/master/examples/v3.0/petstore-expanded.yaml');
var o = new OAS('http://petstore.swagger.io/v2/swagger.json');

const path = require('path');
var contents = path.join(__dirname, 'examples', 'err-v3-petstore-ref.yaml'); //.toString();
var contents = path.join(__dirname, 'examples', 'err-v2-petstore.json'); //.toString();

var o = new OAS(contents, { enablePaths: true });

o.validate(function(err, version) {
  console.log(err, version);
}, true);

