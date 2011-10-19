
function Glyph(str_name,arr_points,id)
{
	this.name = str_name;
	this.points = arr_points;
	this.id = id;
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
