
function Glyph(str_name,arr_points)
{
	this.name = str_name;
	this.points = arr_points;
}

function Point(x,y)
{
	this.x = x;
	this.y = y;
}

function Edge(begin,end)
{
	this.begin = begin;
	this.end = end;
}

function Retangle(top_left,width,height)
{
	this.top_left = top_left;
	this.width = width;
	this.height = height;
}
