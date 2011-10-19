	
function startGame()
{
	var arr_glyph = arrayFromObject(GLYPH);

	function random(min,max) {
		var rf = Math.random();
console.log(rf);
		return Math.floor(Math.random()*(max-min+1)+min);
	}

	function cls_ifmatch(gname){
		return function(){
console.log(gname);
			if(!GAME) {return;}
			if(gname == GNAME_MATCH) { sendMessage("遊戲：比對成功！");

				var mainc = jQuery('#main canvas')[0];
				var orig_opacity = jQuery(mainc).css('opacity');
				
				jQuery(mainc).animate({'opacity':'0.4'},300,function()
					{jQuery(mainc).animate({'opacity':orig_opacity},300)});

			}
			else { sendMessage("遊戲：比對失敗！目標："+gname);}
			
			GNAME_MATCH = "None"
		}
	}

	//Clean the canvas.
	clear(jQuery("#main canvas")[0]);

	//Send message.
	sendMessage("遊戲說明：在光芒黯淡前照著指定的圖形跟著描繪。");

	//Random choose glyph.
	var nmg = random(0,GLYPH_COUNT - 1);
	var glyph = arr_glyph[nmg];
	
	//Redraw the glyph and fadeOut it.
	//redraw(jQuery('#main canvas')[0],edgesFromPoints(glyph.points),RESOLUTION);

	//Blink the glyph.
	blinkMatch(jQuery('#carousel .glyph').eq(nmg).attr('gname'),300,3000);

	GAME = true;

	//Count time.
	setTimeout(cls_ifmatch(glyph.name),3000);
	GT = setTimeout(startGame,4300);
}

function endGame()
{
	GAME = false;
	//Clean the canvas.
	clear(jQuery("#main canvas")[0]);
	
	clearTimeout(GT);
	updateCarousel(GLYPH);

	//Send message.
	sendMessage("遊戲結束");
}
