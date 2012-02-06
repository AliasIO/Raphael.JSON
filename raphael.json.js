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

		var elements = new Array;

		for ( var el = paper.bottom; el != null; el = el.next ) {
			elements.push({
				type:      el.type,
				attrs:     el.attrs,
				transform: el.matrix.toTransformString(),
				node:      { id: el.node.id }
				});
		}

		return JSON.stringify(elements);
	}

	Raphael.fn.fromJSON = function(json) {
		var paper = this;

		if ( typeof json === 'string' ) json = JSON.parse(json);

		for ( var i in json ) {
			if ( json.hasOwnProperty(i) ) {
				var element = paper[json[i].type]()
					.attr(json[i].attrs)
					.transform(json[i].transform)
					;

				element.node.id = json[i].node.id;

				paper.set().push(element);
			}
		}
	}
})();
