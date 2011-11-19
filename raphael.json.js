/*
 * Depends on Douglas Crockford's cycle.js:
 * https://github.com/douglascrockford/JSON-js
 *
 * Based on Jonathan Spies's raphael.serialize:
 * https://github.com/jspies/raphael.serialize
 *
 * Licensed under the MIT license:
 * http://www.opensource.org/licenses/mit-license.php
 *
 */

Raphael.fn.to_json = function() {
	if ( typeof JSON.decycle == 'undefined' ) {
		return;
	}

	return JSON.decycle(this);
}

Raphael.fn.from_json = function(json) {
	if ( typeof JSON.retrocycle == 'undefined' ) {
		return this;
	}

	if ( json.constructor === String ) {
		json = JSON.parse(json);
	}

	var paper = JSON.retrocycle(json);

	for ( var node = paper.bottom; node != null; node = node.next ) {
		var element = this[node.type]()
			.transform(node._.transform)
			.attr(node.attrs)
			;

		this.set().push(element);
	}

	return this;
}
