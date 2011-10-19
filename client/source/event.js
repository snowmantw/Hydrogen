
/**
 * Setting all mouse events relative with the canvas element.
 * 
 * @param None
 * @return None
 * @modify The POINTS array , PAINTING flag and the canvas DOM.
 * @effect Will push the init and other points into the array, 
 *			and redraw the canvas DOM element.
 */
function initEventDraw()
{
	var canvas = jQuery("#main canvas")[0];
	var points = [];
	var painting = false;

	jQuery("#main canvas").mousedown(function(event){
		clear(canvas);

		painting = true;
		points[0] = relPoint(new Point(event.pageX,event.pageY)
						,this.offsetLeft,this.offsetTop);
	});

	jQuery("#main canvas").mousemove(function(event){
		if(!painting) { return; }
		
		var pt_last = points[points.length - 1];
		var pt_current = relPoint(new Point(event.pageX,event.pageY)
						,this.offsetLeft,this.offsetTop);

		points.push(pt_current);

		//Only redraw the last edge.
		redraw(canvas,[new Edge(pt_last,pt_current)],RESOLUTION);
	});

	jQuery("#main canvas").mouseup(function(event){
		if(!painting) { return; }

		painting = false;
		recordDone(points);
		points = [];
	});

	jQuery("#main canvas").mouseleave(function(event){
		if(!painting) { return; }

		painting = false;
		recordDone(points);
		points = [];
	});
}

/**
 * Init the toolbar tools.
 *
 * @param None
 * @return None
 * @modify Tool buttons in the toolbar.
 * @effect Bind events to corresponding tools.
 *
 */
function initEventTools()
{
	jQuery("#help").click(handleHelp);
	jQuery("#game").click(handleGame);
	jQuery("#quit").click(handleQuit);
	jQuery("#add").click(handleAdd);
	jQuery("#remove").click(handleRemove);
	jQuery("#increase").mousedown(handleIncreaseN);
	jQuery("#descrease").mousedown(handleDescreaseN);
	jQuery("#author").click(handleAuthor);
}

/**
 * Return a relative coordinate point of the mouse in canvas.
 *
 * @param Point pt_abs: Point use absolute position
 * @param Number left : Offset of the canvas
 * @param Number top  : Offset of the canvas 
 * @return Point
 * @modify None
 * @effect None
 */
function relPoint(pt_abs,left,top)
{
	return new Point(pt_abs.x - left, pt_abs.y - top);
}

/**
 * Send data to recognize and dispatch the result to the handler.
 * 
 * @param Array[Point] points
 * @return None
 * @modify GLYPH_CURRENT and the recognizing workflow.
 * @effect Assign it a new Glypth name '__current' 
 *			and doing recognizing.
 */
function recordDone(points)
{
DEBUG = points;
	GLYPH_CURRENT = new Glyph('__current',points);

	if(0 == GLYPH_COUNT) { 
		handleRecognizeDone("None",0); 
	}
	else {
		var gr = recognize(points,GLYPH);
		handleRecognizeDone(gr.name,gr.score);
	}

	
}

