
/**
 * Post new glyph to database.
 *
 * @param Glyph glyph
 * @return None
 * @modify The glyph database.
 * @effect The glyph will be posted to the database.
 *
 */
function postGlyph(glyph)
{
	jQuery.ajax({
		'url' : URL_POST_GLYPH,
		'type': 'POST',
		'data':JSON.stringify(glyph),
		'contentType':'application/json',
		'success' : function(idobj){
//Should lock the glyph list until this callback exec ?
//DEBUG
			var id = idobj.id;
			glyph.id = id;
	console.log(glyph.id);
			sendMessage("新樣板儲存完成");
			updateCarousel(GLYPH);
		}
	});
}

/**
 * Remove a glyph from database.
 *
 * @param String id
 * @return None
 * @modify The glyph database.
 * @effect The glyph will be removed from the database.
 *
 */
function deleteGlyph(id)
{
	jQuery.ajax({
		'url' : URL_DELETE_GLYPH,
		'type': 'POST',
		'data': JSON.stringify({'id':id}),
		'contentType':'application/json',
		'success' : function(data){
//Should lock the glyph list until this callback exec ?
//DEBUG
console.log(data);
		}
	});
}

/**
 * Fetch all usable glyphs in database.
 *
 * @param Function handler: Take reaction when glyph download down.
 * @return None
 * @modify GLYPH
 * @effect Fill the GLYPH up with new glyphs. Same named glyph will be overwritten.
 *
 */
function fetchAllGlyph(handler)
{
	jQuery.ajax({
		'url' : URL_FETCH_ALL_GLYPH,
		'type': 'GET',
		'dataType':'json',
		'success' : function(arr_glyph_plain){
			for(var itr in arr_glyph_plain)
			{
				var current = arr_glyph_plain[itr];
				GLYPH[current.name] = new Glyph(current.name,current.points,current.id);
				GLYPH_COUNT++;
			}
			handler(GLYPH);
		}
	});
}
