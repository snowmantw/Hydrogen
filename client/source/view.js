
/**
 * Set the thumb canvas drawing env setting.
 *
 * @param DOM Canvas
 * @return None
 * @modify The DOM canvas
 * @effect It's inner env setting.
 */
function setThumbDrawEnv(canvas)
{
	var context = canvas.getContext("2d");
	context.globalAlpha = 0.7;
	context.shadowBlur = 10 / RESOLUTION_GLYPH.x ; // / RESOLUTION_GLYPH.y;
	context.shadowColor= "#CCCCCC";
	context.strokeStyle = "#FFFFFF";
	context.strokeStyle = "white";
	context.lineJoin = "round"
	context.lineWidth= 13 / RESOLUTION_GLYPH.x ; // / RESOLUTION_GLYPH.y;
}

/** 
 * Render a new glyph.
 *
 * @param Glyph glyph
 * @return DOM: The rendered DOM glyph element. 
 * @modify None
 * @effect None
 */
function renderGlyph(glyph)
{
	var dom_wrapped = document.createElement('div');
	var dom_canvas = document.createElement('canvas');
	setThumbDrawEnv(dom_canvas);
	
	//Resolution depends on the size of "origin" glyph and this new canvas.
	redraw(dom_canvas,edgesFromPoints(glyph.points),RESOLUTION_GLYPH);

	//return dom_canvas;

	//Or PNG way is better ?
	var dom_img = capture(dom_canvas);
	jQuery(dom_wrapped).addClass(CLASS_GLYPH)
		.attr({'gname':glyph.name,'title':glyph.name}).append(capture(dom_canvas));

	return dom_wrapped;
}

/**
 * Update the #carousel: remake all passed Glyphs' DOM and show them.
 *
 * @param Array[Glyph]
 * @return None
 * @modify The #carousel DOM element.
 * @effect Add rendered element into #carousel
 */
function updateCarousel(glyphs)
{
	jQuery('#carousel').hide().empty();
	var buff = document.createDocumentFragment();
	for(var itr in glyphs)
	{
		buff.appendChild(renderGlyph(glyphs[itr]));
	}
	
	jQuery('#carousel')[0].appendChild(buff);
	jQuery('#carousel').fadeIn('fast');
}

/**
 * Send message to the info bar.
 *
 * @param HTML html_message
 * @return None
 * @modify The info bar DOM.
 * @effect Put the text into the info bar DOM.
 *
 */
function sendMessage(html_message)
{
	//Not use `hide()` because element moving problem.
	jQuery('#infobar').empty().css('opacity',0.0)
		.html(html_message).animate({'opacity':1.0},200);
}
