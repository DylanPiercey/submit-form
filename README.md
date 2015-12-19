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

// Submit a different form.
submit("/my-other-form", {
	method: "POST",
	body: document.getElementById("my-form")
});

// Basically the same as clicking a link.
submit("/my-page");

// Alternatively you can submit to the current page.
submit({
	method: "POST",
	body: document.getElementById("my-form")
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
