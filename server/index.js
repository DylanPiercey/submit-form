module.exports = submit;

/**
 * Don't allow navigation in a nodejs server.
 */
function submit () {
	throw new Error("Cannot submit forms in node js!");
}