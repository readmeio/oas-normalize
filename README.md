Swagger 2 or OAS 3? YAML or JSON? URL, path, string or object? Who cares! It just works.

This module uses a bunch of other great modules to do the heavy lifting, and normalizes everything!

[![](https://cl.ly/1h271F1M1e2T/Untitled-2.png)](http://readme.io)

# Install

```bash
npm install oas-normalize --save
```

# Usage

It's pretty simple:

```javascript
const OAS = require('oas-normalize');

const oas = new OAS('https://raw.githubusercontent.com/OAI/OpenAPI-Specification/master/examples/v3.0/petstore-expanded.yaml'); // Or a string, pathname, JSON blob, whatever
oas.validate((err, spec) => {
  if (err) {
    console.log(err.errors);
    return;
  }
  console.log(spec); // spec will always be JSON, and valid
});
```

# Helper functions

If you want some more functionality, you can do anything here:

| Function       | What it does                                                   |   |   |   |
|----------------|----------------------------------------------------------------|---|---|---|
| oas.load(cb)      | Just load the file, valid or not, as JSON                      |   |   |   |
| oas.bundle(cb)    | Bring together all files into one JSON blob (but keep `$refs`) |   |   |   |
| oas.deref(cb)     | Resolve `$refs`                                                |   |   |   |
| oas.validate(cb, [convertToLatest?]))  | Validate the whole thing!                |   |   |   |

# Always return OAS 3

If you want `.validate` to always return a OAS 3 document, include a `true` as the second param:

```javascript
oas.validate(action, true);
```
