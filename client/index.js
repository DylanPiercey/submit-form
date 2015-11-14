var flat    = require("q-flat");
var form    = document.createElement("form");
var _inputs = [];

module.exports = submit;

/**
 * Updates the hidden form based on arguments and submits it.
 *
 * @param {String} action - the action for the form.
 * @param {Object} [opts] - the form attributes.
 */
function submit (action, opts) {
	if (typeof action !== "string") throw new TypeError("Form action must be a string!");

	opts         = opts || {};
	form.action  = action;
	form.method  = (opts.method || "GET").toUpperCase();
	form.enctype = opts.enctype || "application/x-www-form-urlencoded";
	form.target  = opts.target || "_self";
	buildForm(opts.body);
	form.submit();
}

/**
 * Utility to append inputs to the form and update there values.
 *
 * @param {Object} [body] - the body of the form. (Will clear inputs without.)
 */
function buildForm (body) {
	body    = flat(body || {});
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