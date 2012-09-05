Raphaël.JSON
============

Convert [Raphaël 2.0](http://raphaeljs.com/) elements on a paper to JSON and back.

This plugin can be used to save the state of a paper for later re-use. It was originally 
forked from Jonathan Spies's [raphael.serialize](https://github.com/jspies/raphael.serialize)
and later rewritten from scratch to work with Raphaël 2.0.
  
*Licensed under the [MIT license](http://www.opensource.org/licenses/mit-license.php).*


Example
-------

```html
<script type="text/javascript" src="raphael-min.js"></script>
<script type="text/javascript" src="raphael.json.js"></script>

<div id="holder"></div>

<script type="text/javascript">
	var paper = Raphael('holder');

	var rect = paper
		.rect(50, 50, 50, 50)
		.attr('fill', '#f00')
		.transform('s2')
		.rotate(10)
		;

	var json = paper.toJSON();

	paper.clear();

	paper = Raphael('holder');

	paper.fromJSON(json);
</script>
```

Callback
--------

A callback function can be used to save and restore custom attributes.

```javascript
var json = paper.toJSON(function(el, data) {
	data.id = el.node.id;

	return data;
});
```

```javascript
paper.fromJSON(json, function(el, data) {
	el.node.id = data.id;

	return el;
});
```

Preserving sets
---------------

```javascript
var paper = Raphael('holder');

// Create a set
var exampleSet = paper.set();

var rect = paper.rect(50, 50, 50, 50)
	.attr({ fill: 'red' })
	;

exampleSet.push(rect);

// Store a unique identifier in each of the set's elements
for ( i in exampleSet ) {
	exampleSet[i].setName = 'exampleSet';
}

// Serialize the paper
var json = paper.toJSON(function(el, data) {
	// Save the set identifier along with the other data
	data.setName = el.setName;

	return data;
});

// Start over
paper.clear();

exampleSet = null;

// Restore the paper to the previous state using serialized data
paper.fromJSON(json, function(el, data) {
	// Recreate the set using the identifier
	if ( !window[data.setName] ) window[data.setName] = paper.set();

	// Place each element back into the set
	window[data.setName].push(el);

	return el;
});

// The set is restored
console.log(exampleSet);
```

Raphaël.JSON and Raphaël.FreeTransform
--------------------------------------

Raphaël.JSON can be used together with 
[Raphaël.FreeTransform](https://github.com/ElbertF/Raphael.FreeTransform) to
save and load drawings.

```javascript
// Save
var json = paper.toJSON(function(el, data) {
    data.ft = {};

    if ( el.freeTransform != null ) {
        data.ft.attrs = el.freeTransform.attrs;

				paper.freeTransform(el).unplug();
    }

    return data;
});

// Start over
paper.clear();

// Load
paper.fromJSON(json, function(el, data) {
    if ( data.ft && data.ft.attrs ) {
        paper.freeTransform(el);

        el.freeTransform.attrs = data.ft.attrs;

        el.freeTransform.apply();
    }

    return el;
});
```

