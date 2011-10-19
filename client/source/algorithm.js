
/**
 * Resample points.
 * 
 * @param Array[Point] points: The graphic "path".
 * @param Number n: The resample rate.
 * @require n MUST be even or the result is UNEXPECTED.
 * @return Array[Point]
 * @modify None
 * @effect None
 *
 */
function resample(points,n)
{
	//Interval Length.
	var ilength = pathLength(points) / (n - 1);
	var D = 0.0;
	var newpoints = [points[0]];

	for(var itr = 1; itr < points.length; itr++)
	{
		var d = distance(points[itr - 1], points[itr]);
		if( (d + D) >= ilength)
		{
			var qx = points[itr - 1].x + ((ilength - D) / d) * (points[itr].x - points[itr - 1].x);
			var qy = points[itr - 1].y + ((ilength - D) / d) * (points[itr].y - points[itr - 1].y);
			var qpoint = new Point(qx,qy)
			newpoints.push(qpoint);

			//Insert qpoint at position itr so that the qpoint will be the next itr.
			points.splice(itr,0,qpoint);	
			D = 0.0;
		}
		else D += d;
	}

	//If the last point didn't be added.
	if(newpoints.length == n - 1)
	{
		newpoints.push(new Point(points[points.length - 1].x,points[points.length - 1].y));
	}
	return newpoints;
}

/**
 * Get the boundbox.
 *
 * @param Array[Point] points
 * @return Rectangle 
 * @modify None
 * @effect None
 */
function boundingbox(points)
{
	var minX = +Infinity, maxX = -Infinity, minY = +Infinity, maxY = -Infinity;
	for (var i = 0; i < points.length; i++)
	{
		if (points[i].x < minX)
			minX = points[i].x;
		if (points[i].x > maxX)
			maxX = points[i].x;
		if (points[i].y < minY)
			minY = points[i].y;
		if (points[i].y > maxY)
			maxY = points[i].y;
	}
	return new Retangle(new Point(minX, minY), maxX - minX, maxY - minY);

}

/**
 * Indicate the angle of the "graphic".
 *
 * @param Array[Point] points
 * @return Number
 * @modify None
 * @effect None
 */
function indicateAngle(points)
{
	return Math.atan2(centroid(points).y - points[0].y
		,centroid(points).x - points[0].x);
}

/**
 * Translate the "graphic" to the centroid.
 *
 * @param Array[Point] points
 * @param Point newcent
 * @return Array[Point] points
 * @modify None
 * @effect None
 *
 */
function translateTo(points,newcent)
{
	var c = centroid(points);
	var newpoints = new Array();
	for (var i = 0; i < points.length; i++)
	{
		var qx = points[i].x + newcent.x - c.x;
		var qy = points[i].y + newcent.y - c.y;
		newpoints[newpoints.length] = new Point(qx, qy);
	}
	return newpoints;
}

/**
 * Rotate the "graphic" around centroid.
 *
 * @param Array[Point] points
 * @param Number radians
 * @return Array[Point]
 * @modify None
 * @effect None
 */
function rotateBy(points,radians)
{
	var c = centroid(points);
	var cos = Math.cos(radians);
	var sin = Math.sin(radians);
	
	var newpoints = [];
	for (var i = 0; i < points.length; i++)
	{
		var qx = (points[i].x - c.x) * cos - (points[i].y - c.y) * sin + c.x;
		var qy = (points[i].y - c.x) * sin + (points[i].y - c.y) * cos + c.y;
		newpoints[newpoints.length] = new Point(qx, qy);
	}
	return newpoints;
}

/**
 * Scale the "graphic" to the specific size.
 *
 * @param Array[Point] points
 * @param Number width
 * @param Number height
 * @return Array[Point]
 * @modify None
 * @effect None
 * 
 */
function scaleTo(points,width,height)
{
	var newpoints = [];
	var bbox = boundingbox(points);
	for(var itr in points)
	{
		var qx = points[itr].x * (width / bbox.width);
		var qy = points[itr].y * (height / bbox.height);
		newpoints.push(new Point(qx,qy));
	}
	return newpoints;
}

/**
 * Get the centroid of the graphic.
 *
 * @param Array[Point] points
 * @return Point
 * @modify None
 * @effect None
 */
function centroid(points)
{
	var x = 0.0, y = 0.0;
	for (var i = 0; i < points.length; i++)
	{
		x += points[i].x;
		y += points[i].y;
	}
	x /= points.length;
	y /= points.length;
	return new Point(x, y);
}

function distanceAtAngle(points, glyph, radians)
{
	var newpoints = rotateBy(points, radians);
	return  pathDistance(newpoints, glyph.points);
}

function distanceAtBestAngle(points, glyph, a, b, threshold)
{
	var x1 = PHI * a + (1.0 - PHI) * b;
	var f1 = distanceAtAngle(points, glyph, x1);
	var x2 = (1.0 - PHI) * a + PHI * b;
	var f2 = distanceAtAngle(points, glyph, x2);
	while (Math.abs(b - a) > threshold)
	{
		if (f1 < f2)
		{
			b = x2;
			x2 = x1;
			f2 = f1;
			x1 = PHI * a + (1.0 - PHI) * b;
			f1 = distanceAtAngle(points, glyph, x1);
		}
		else
		{
			a = x1;
			x1 = x2;
			f1 = f2;
			x2 = (1.0 - PHI) * a + PHI * b;
			f2 = distanceAtAngle(points, glyph, x2);
		}
	}
	return Math.min(f1, f2);
}

/**
 * Calculate two point's distance.
 *
 * @param Point p1
 * @param Point p2
 * @return Number
 * @modify None
 * @effect None
 *
 */
function distance(p1,p2)
{
	return Math.sqrt( Math.pow(p1.x - p2.x,2) + 
					  Math.pow(p1.y - p2.y,2) );
}

/**
 * Get the path's length.
 *
 * @param Array[Point] path
 * @return Number
 * @modify None
 * @effect None
 */
function pathLength(points)
{
	var acc = 0.0;
	for(var itr = 1; itr < points.length; itr++)
	{
		acc += distance(points[itr - 1],points[itr]);
	}
	return acc;
}

function pathDistance(pts1,pts2)
{
	var d = 0.0;
	for (var i = 0; i < pts1.length; i++) // assumes pts1.length == pts2.length
	{
		d += distance(pts1[i], pts2[i]);
	}
	return d / pts1.length;
}

function deg2Rad(d) { return (d * Math.PI / 180.0); }
function rad2Deg(r) { return (r * 180.0 / Math.PI); }
