
/**
 * Dispatch recognized glyph to it's handler.
 *
 * @param String name: The name of glyph.
 * @return None
 * @modify Glyph handlers.
 * @effect Dispatch the glyph accroding to 
 *			the table inside this function.
 *
 */
function glyphDispatch(name)
{
	var handlers = {};
	handlers['play'] = function(name){ gameCommand(); }
	handlers['quit'] = function(name){ quitCommand(); }
	handlers['__']	 = function(name){ defaultCommand(name); }

	if(handlers[name]) { handlers[name](name); }
	else handlers['__'](name);
}

//TODO
function gameCommand()
{
	//TODO
}

function quitCommand()
{
	//TODO
}

/**
 * Execute when other handlers don't handle. 
 *
 * @param String name_glyph
 * @return None
 * @modify The glyph DOM element in #carousel.
 * @effect It will blink once to represent matching.
 */
function defaultCommand(name_glyph)
{
	GNAME_MATCH = name_glyph;
	blinkMatch(name_glyph,300,700);
}
