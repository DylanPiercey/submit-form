# Submit-Form
Utility build a form and submit it automatically.
This library will intelegently reuse the same form and perform minimal manipulations for optimum performance.

This module can be required in node (for isomorphic apps) but will error on use.

# Installation

#### Npm
```console
npm install submit-form
```

# Example

```javascript
var submit = require("submit-form");

// Submit a hidden form.
submit("/my-form", {
	method: "POST",
	body: { a: 1 }
});
```

# API Options / Defaults.

```javascript
{
	method: "GET",
	body: {}, // The body will be flattened and inputs created for each value.
	enctype: "application/x-www-form-urlencoded",
	target: "_self"
}
```

### Contributions

* Use gulp to run tests.

Please feel free to create a PR!
