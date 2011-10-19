
N = 64;		  //Resample Rate.
SQ_WIDTH = 150; //Retagle width for glyphs.
SQ_HEIGHT = 112; //Retagle height for glyphs.
GLYPH = {};   //Glyph table.
GLYPH_COUNT = 0;
HELP = "？:說明；G:開始遊戲；Q:結束遊戲；+:增樣板；"
		+"-:刪樣板；N:增加取樣率；n:減少取樣率；"
		+"A:作者資訊；"
		+"滑鼠移到樣板上可見其名";

WIDTH_MAIN = 600;
HEIGHT_MAIN = 450;
WIDTH_GLYPH = SQ_WIDTH;
HEIGHT_GLYPH = SQ_HEIGHT;

//IMPORTANT: Canvas is resolution-depent!
//IF the size in CSS DON'T match the size defined in attr,
// WILL CAUSE RESOLUTION PROGLEM ( NOT 1:1 ).
RESOLUTION = {'x':1,'y':1};

//Small glyph resolution depends the size of main canvas.
RESOLUTION_GLYPH = {'x':WIDTH_MAIN / WIDTH_GLYPH , 'y':HEIGHT_MAIN / HEIGHT_GLYPH};

URL_POST_GLYPH = '/postGlyph';
URL_DELETE_GLYPH = '/deleteGlyph';
URL_FETCH_ALL_GLYPH = '/fetchAllGlyph';

CLASS_GLYPH = "glyph"

GLYTH_CURRENT = null;
GNAME_MATCH = "None";
GOPACITY = 0.4;
AUTHOR = "100753039 資科碩一 翁宸暉 snowmantw@gmail.com";

FLAG_DCONTINUE = false;
FLAG_ICONTINUE = false;
FLAG_TOOGLE	   = false;
FLAG_RM_GLYPH  = false;

GAME = false;

PHI = 0.5 * (-1.0 + Math.sqrt(5.0));
DIAGONAL = Math.sqrt(Math.pow(SQ_WIDTH,2),Math.pow(SQ_HEIGHT,2));
HALF_DIAGONAL = 0.5 * DIAGONAL;
ANGLE_RANGE = deg2Rad(45.0);
ANGLE_PRECISION = deg2Rad(2.0);
