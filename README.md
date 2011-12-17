Raphael.JSON
============

Convert [Raphaël 2.0](http://raphaeljs.com/) elements on a paper to JSON and back.

This plugin can be used to save the state of a paper for later re-use. It was originally 
forked from Jonathan Spies's [https://github.com/jspies/raphael.serialize](raphael.serialize)
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
		.rect(50, 40, 50, 50)
		.attr('fill', '#f00')
		.transform('s2')
		.rotate(10)
		;

	var json = paper.to_json();

	paper.clear();

	paper2 = Raphael('holder');

	paper2.from_json(json);
</script>
```
