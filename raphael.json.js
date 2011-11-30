/*
 * Based on Jonathan Spies's raphael.serialize:
 * https://github.com/jspies/raphael.serialize
 *
 * Licensed under the MIT license:
 * http://www.opensource.org/licenses/mit-license.php
 *
 */

(function() {
	Raphael.fn.toJSON = function() {
		var paper = this;

		var nodes = new Array;

		for ( var node = paper.bottom; node != null; node = node.next ) {
			nodes.push({
				type:      node.type,
				attrs:     node.attrs,
				transform: node.matrix.toTransformString(),
				});
		}

		return JSON.stringify(nodes);
	}

	Raphael.fn.fromJSON = function(json) {
		var paper = this;

		if ( json.constructor === String ) {
			json = JSON.parse(json);
		}

		json.map(function(node) {
			var element = paper[node.type]()
				.attr(node.attrs)
				.transform(node.transform)
				;

			paper.set().push(element);
		});
	}
})();
