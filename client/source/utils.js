
/** 
 * Convert an array of points to an array of edges.
 * 
 * @param Array[Point] points
 * @require points MUST contain at least TWO points.
 * @return Array[Edge]
 * @modify None
 * @effect None
 *
 */
function edgesFromPoints(points)
{
	var newedges = [];
	for(var itr = 1 ; itr < points.length ; itr++)
	{
		newedges.push(new Edge(points[itr - 1],points[itr]));
	}

	return newedges;
}

function arrayFromObject(obj)
{
	var res = [];
	for(var name in obj)
	{
		res.push(obj[name]);
	}
	return res;
}
