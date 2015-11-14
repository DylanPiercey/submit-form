var _inputs = [];

// Form used to submit requests.
var form   = document.createElement("form");
var button = document.createElement("button");

// Hide form.
button.type        = "submit";
form.style.display = "none";

// Add to dom.
form.appendChild(button);
document.body.appendChild(form);

/**
 * Updates the hidden form based on arguments and submits it.
 *
 * @param {String} action - the action for the form.
 * @param {Object} [opts] - the form attributes.
 */
function submitForm (action, opts) {
	if (typeof action !== "string") throw new TypeError("Form action must be a string!");

	// Apply default options.
	opts         = opts || {};
	form.action  = action;
	form.method  = (opts.method || "GET").toUpperCase();
	form.enctype = opts.enctype || form.enctype;
	form.target  = opts.target || form.target;
	buildForm(opts.body);

	// Trigger form submit in a way that allows submission to be intercepted.
	button.dispatchEvent(new MouseEvent("click", {
		bubbles: true,
		cancelable: true,
		view: window
	}));
}

/**
 * Utility to append inputs to the form and update there values.
 *
 * @param {Object} [body] - the body of the form. (Will clear inputs without.)
 */
function buildForm (body) {
	body    = body || {};
	var cur = 0;
	// Create inputs for each value.
	for (var key in body) if (body[key] != null) buildInput(cur++, key, body[key]);
	// Clear out unused inputs.
	for (var i = _inputs.length; i-- > cur;) _inputs[i].name = undefined;
}

/**
 * Lazily create an input element and set its name/value.
 *
 * @param {Number} i - the current index for the input.
 * @param {String} name - the name for the input.
 * @param {*} value - the value for the input.
 */
function buildInput (i, name, value) {
	var input   = _inputs[i] || form.appendChild(_inputs[i] = document.createElement("input"));
	input.name  = name;
	input.value = value;
}

module.exports = submitForm;