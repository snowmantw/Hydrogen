/**
 * Print a help message.
 *
 * @param  None
 * @return None
 * @modify The infobar.
 * @effect Put the help message ( text or HTML ) to the bar.
 */
function handleHelp()
{
	sendMessage(HELP);
}

/**
 * Start the game.
 *
 * @param  None
 * @return None
 * @modify The infobar and the carousel.
 * @effect Many visual and animated effects.
 */
function handleGame()
{
	startGame();
}

/**
 * End the game.
 *
 * @param  None
 * @return None
 * @modify The infobar and the carousel.
 * @effect Restore them to original state.
 */
function handleQuit()
{
	endGame();
}

/**
 * Add new glyph.
 *
 * @param  None
 * @return None
 * @modify Database and the carousel.
 * @effect Save the glyph data and show in carousel.
 */
function handleAdd()
{	
	sendMessage("請輸入新 Glyph 名稱後按 Enter：");

	var input_gname = document.createElement('input');
	jQuery(input_gname)
		.attr('width','10')
		.css({'background-color':'#222222'
			,'font-size':'14pt'
			,'color':'white'
			,'font-family':'monospace'
			,'width':'10em'
			,'padding':'0 1em'
			,'border-top':'0px'
			,'border-bottom':'0px'
			,'border-left':'white 2px solid'
			,'border-right':'white 2px solid'})
		.keypress(function(event){
			if(event.which == 13)
			{
				var gname = jQuery(this).val();;

				addGlyph(new Glyph(gname,GLYPH_CURRENT.points));
			} })
		.appendTo("#infobar");
}

/**
 * Remove a glyph after user click any glyph in carousel.
 *
 * @param  None
 * @return None
 * @modify Database , the carousel and infobar (message).
 * @effect Remove the glyph in database and carousel DOM.
 *
 */
function handleRemove()
{
	sendMessage("移動滑鼠到要刪除的 Glyph 上，然後點選以刪除之。"
		+"若要放棄，再點選一次刪除按鈕");

	FLAG_RM_GLYPH = true;
	jQuery("#carousel .glyph").css('cursor','crosshair')

	jQuery("#carousel .glyph").click(function(){
		removeGlyph(jQuery(this).attr('gname'));
	});
	
	jQuery("#remove").unbind('click')
		.toggle(
			function(){
				FLAG_RM_GLYPH = false;
				jQuery("#carousel .glyph").css('cursor','default').unbind('click');
			},
			function(){
				FLAG_RM_GLYPH = true;
				jQuery("#carousel .glyph").css('cursor','crosshair').click(
					function(){
						removeGlyph(jQuery(this).attr('gname'));
					});
			});
}

/**
 * Add the resample factor N.
 *
 * @param  None
 * @return None
 * @modify Global var N and the infobar.
 * @effect Increase N ( hold to increase continuously ) 
 *		    and send the help.
 *
 */
function handleIncreaseN()
{
	FLAG_ICONTINUE = true;
	jQuery("#increase").mouseup(function(){
		FLAG_ICONTINUE = false;
	});

	function doIncrease()
	{	
		if(! FLAG_ICONTINUE) { return; }	//Prevent the last executing after canceling.

		sendMessage("增加重新取樣率：按住 'N' 以持續增加。目前值："+N);
	   
		N++;
		if(FLAG_ICONTINUE){ setTimeout(doIncrease,400) }
	}
	doIncrease();
}

/**
 * Sub the resample factor N.
 *
 * @param  None
 * @return None
 * @modify Global var N and the infobar.
 * @effect Discrease N ( hold to descrease continuously ) 
 *		    and send the help.
 *
 */
function handleDescreaseN()
{
	FLAG_DCONTINUE = true;
	jQuery("#descrease").mouseup(function(){
		FLAG_DCONTINUE = false;
	});

	function doDescrease()
	{	
		if(! FLAG_DCONTINUE) { return; }	//Prevent the last executing after canceling.

		sendMessage("增加重新取樣率：按住 'n' 以持續減少。目前值："+N);
		if(0 == N) {return; }
	   
		N--;
		if(FLAG_DCONTINUE){ setTimeout(doDescrease,400) }
	}
	doDescrease();
}

/**
 * Handle events that recognizing done.
 *
 * @param String name
 * @param Number score
 * @return
 * @modify None
 * @effect None
 *
 */
function handleRecognizeDone(name,score)
{
	sendMessage("最匹配者：<i>"+name+"</i>；分數：<i>"+score+"</i>");
	glyphDispatch(name);
}
