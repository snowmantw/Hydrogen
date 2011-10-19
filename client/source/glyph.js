

/** 
 * Call other algorithm functions and recognize the "graphic".
 *
 * @param Array[Point] points
 * @param Assoc{'name':Glyph} glyphs
 * @require The glyphs container MUST has at least one existing glyph.
 * @return { name : String (name) , score : Number}
 * @modify None
 * @effect None
 */
function recognize(points,glyphs)
{
	/*
	var newpoints = translateTo ( scaleTo( rotateBy ( resample(points,N) 
											,- indicateAngle( resample(points,N) ) 
									, SQ_WIDTH , SQ_HEIGHT ) ) 
						, new Point(0,0) );
	*/


	function adjust(points)
	{
		var rsm = resample(points,N);
		var ia  = indicateAngle(rsm);
		var rt  = rotateBy(rsm,- ia);
		var sc  = scaleTo(rt,SQ_WIDTH,SQ_HEIGHT);
		var tr  = translateTo(sc,new Point(0,0));
		return tr;
	}
	newpoints = adjust(points);

	var di_min = +Infinity; //Min diff score.
	var name_dimin = "";	//Glyph's name got the min diff score.
	for(var name in glyphs)
	{

		//Glyphs ALSO must be resampled accroding to the current N value.
		var new_g = new Glyph(name,adjust(glyphs[name].points));

		var di_new = distanceAtBestAngle(newpoints,new_g,-ANGLE_RANGE,+ANGLE_RANGE,ANGLE_PRECISION);
		var diff_lt = (di_new < di_min);


		di_min = diff_lt ? di_new : di_min;
		name_dimin = diff_lt ? name : name_dimin;

	}

	return { 'name' : name_dimin , 'score' : 1.0 - di_min / HALF_DIAGONAL }
}

/**
 * Get the target graphic's matching score against the specific glyph 
 *  from the diff score.
 *
 * @param Number di
 * @param Number width: The standard width of the box.
 * @param Number height: The standard height of the box.
 * @return Number
 * @modify None
 * @effect None
 */
/*
function score(di,width,height)
{
	return ( 1 - ( di / (0.5 * Math.sqrt(height*height + width*width))));
}
*/

/**
 * After rotatation and scaling, determine whether 
 *  the "graphic" is fit the Glyph or not.
 *
 * @param Array[Point] points
 * @param Glyph glyph
 * @param Number n: Resampling factor.
 * @return Number: Difference score between the "graphic" and the glyph.
 * @modify None
 * @effect None
 *
 */
function diff(points,glyph,n)
{
	function sumDistance(ps1,ps2)
	{
		var acc = 0.0;
		for(var itr in ps1)
		{
			acc+= distance(ps1[itr],ps2[itr]);
		}

		return acc;
	}

	return ( Math.sqrt( sumDistance( points,glyph.points ) ) / n );
}

/**
 * Add new Glyph to system.
 *
 * @param Glyph glyph
 * @return None
 * @modify The storage of Glyphs
 * @effect Add one new Glyph in system.
 */
function addGlyph(glyph)
{
	GLYPH[glyph.name] = glyph;
	GLYPH_COUNT++;

	postGlyph(glyph);
}

/**
 * Remove a Glyph from system.
 *
 * @param String name
 * @return Glyph : The removed glyph.
 * @modify The storage of Glyphs.
 * @effect Remove a Glyph from system.
 */
function removeGlyph(name)
{
	jQuery('#carousel').children(".glyph[gname='"+name+"']").remove();
	var target = GLYPH[name];
	GLYPH[name] = null;
	delete GLYPH[name];
	
	deleteGlyph(name);
	GLYPH_COUNT --;
	
	return target;
}
