
/**
 * Setting bush style and other drawing settings.
 *
 * @param DOM Canvas canvas
 * @return None
 * @modify The canvas DOM.
 * @effect Setting drawing settings.
 */
function setMainDrawEnv(canvas)
{
	var context = canvas.getContext("2d");
	context.globalAlpha = 0.7;
	context.shadowBlur = 10;
	context.shadowColor= "#CCCCCC";
	context.strokeStyle = "#FFFFFF";
	context.strokeStyle = "white";
	context.lineJoin = "round"
	context.lineWidth= 13;
}

/**
 * Drawing the canvas element accroding to the passed points.
 *
 * @param DOM Canvas canvas
 * @param Array[Edges] edges
 * @param {x:Number,y:Number} resolution
 * @return None
 * @modify The canvas DOM element.
 * @effect Draw all points in the array.
 */
function redraw(canvas,edges,resolution)
{
	var context = canvas.getContext("2d");

	for(var itr in edges)
	{
		context.beginPath();
		context.moveTo(edges[itr].begin.x / resolution.x , edges[itr].begin.y / resolution.y);
		context.lineTo(edges[itr].end.x / resolution.x , edges[itr].end.y / resolution.y);

		context.closePath();
		context.stroke();
	}
}

/**
 * Capture the drawed "graph" in canvas element and 
 *	"render" it into a PNG file content.
 *
 * @param DOM Canvas canvas
 * @return DOM Img: The generated <IMG> element.
 * @modify None
 * @effect None
 */
function capture(canvas)
{
	var img = document.createElement('img');
	jQuery(img).attr({'src':canvas.toDataURL('image/png')});

	return img;
}

/**
 * Clear the canvas element.
 *
 * @param DOM Canvas canvas
 * @return None
 * @modify None
 * @effect None
 */
function clear(canvas)
{
	canvas.getContext('2d').clearRect (0,0,jQuery(canvas).width(),jQuery(canvas).height() );
}

function blinkMatch(name_glyph,tmb,tme)
{
	var dom_glyph = jQuery('#carousel').children("[gname='"+name_glyph+"']")[0];

	//var orig_bgcolor = jQuery(dom_glyph).css('backgrounColor');
	var orig_opacity = jQuery(dom_glyph).css('opacity');
	
	jQuery(dom_glyph).animate({'opacity':'1.0'},tmb,function()
		{jQuery(dom_glyph).animate({'opacity':orig_opacity},tme)});
}
