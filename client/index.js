var parse   = require("parse-form");
var flat    = require("q-flat");
var _inputs = [];

// Form used to submit requests.
var form   = document.createElement("form");
var button = document.createElement("button");
button.type        = "submit";
form.style.display = "none";
form.appendChild(button);
document.body.appendChild(form);

/**
 * Updates the hidden form based on arguments and submits it.
 *
 * @param {String} [action] - the action for the form.
 * @param {Object} [opts] - the form attributes.
 */
function submitForm (action, opts) {
	if (typeof action === "object") {
		// Make action optional.
		opts   = action;
		action = null;
	}
	if (typeof action !== "string") throw new TypeError("Form action must be a string!");

	// Apply default options.
	opts = opts || {};
	form.setAttribute("action", action || window.location.href);
	form.setAttribute("method", (opts.method || "GET").toUpperCase());
	form.setAttribute("enctype", opts.enctype || form.enctype || "application/x-www-form-urlencoded");
	form.setAttribute("target", opts.target || form.target || "_self");

	var body = opts.body;
	buildForm(body && body.nodeName === "FORM"
		? parse(body, true).body
		: flat(body)
	);

	// Trigger form submit in a way that allows submission to be intercepted.
	var event = document.createEvent("Event");
	event.initEvent("click", true, true, window, 1);
	button.dispatchEvent(event);
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
	for (var input, i = _inputs.length; i-- > cur;) {
		input = _inputs[i];
		input.removeAttribute("name");
		input.removeAttribute("value");
	}
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
	input.setAttribute("name", name);
	input.setAttribute("value", value);
}

module.exports = submitForm;
