$(document).ready(function(){
	/*$(window).scroll(function(){//top버튼
		if ($(this).scrollTop() >= ($(document).height() - $(this).height() - $('.footerArea').height())){
			$('#btnGoTop').css({position: 'absolute', bottom: 'auto', top: ($(document).height() - $('.footerArea').height() - 10 - $('#btnGoTop').outerHeight())});
		} else {
			$('#btnGoTop').css({position: 'fixed', bottom: 10, top: 'auto'});
		}
	});*/
});
$(window).load(function(){
});

//********* 셀렉트박스 디자인 *********//
jQuery.fn.styledSelect = function(options) {
	//var isFF2 = jQuery.browser.mozilla && jQuery.browser.version.indexOf('1.8.')==0;//jquery 버전과 충돌해서 주석처리함
	var prefs = {
		coverClass : 'select-replace-cover',
		innerClass : 'select-replace',
		adjustPosition : { top:0, left:0 },
		selectOpacity : 0
		}
	if (options) jQuery.extend(prefs,options);
	return this.each( function() {
		//if (isFF2) return false;//jquery 버전과 충돌해서 주석처리함
		var selElm = jQuery(this);
		selElm.wrap('<span><'+'/span>');
		selElm.after('<span><'+'/span>');
		var selReplace = selElm.next();
		var selCover = selElm.parent();
		selElm.css({
			'opacity':prefs.selectOpacity,
			'visibility':'visible',
			'position':'absolute',
			'top':0,
			'left':0,
			'display':'inline',
			'z-index':1
			});
		selCover.addClass(prefs.coverClass).css({
			'display':'inline-block',
			'position':'relative',
			'top':prefs.adjustPosition.top,
			'left':prefs.adjustPosition.left,
			'z-index':0,
			'vertical-align':'middle',
			'text-align':'left'
			});
		selReplace.addClass(prefs.innerClass).css({
			'display':'block',
			'white-space':'nowrap'
			});

		selElm.bind('change',function() {
			jQuery(this).next().text(this.options[this.selectedIndex].text);
			}).bind('resize',function() {
				//jQuery(this).parent().width( jQuery(this).width()+'px' );
				jQuery(this).parent().width( 100+'%' );
			});
		selElm.trigger('change').trigger('resize');
		});
	}

/*하루 한번만 보기 201451113 start*/
function setCookie( name, value, expiredays ) { 
	var todayDate = new Date(); 
	todayDate.setDate( todayDate.getDate() + expiredays ); 
	document.cookie = name + "=" + escape( value ) + "; path=/; expires=" + todayDate.toGMTString() + ";" 
}
function closeGuide_cookie(){ 	
	setCookie( "guide_ui", "done" , 7 ); //하루면 1	
	$(".ui_guide_layer").fadeOut("fast");
	play360 = true;
	init_360();
}
function closeGuide(){ 	
	$(".ui_guide_layer").fadeOut("fast");
	play360 = true;
	init_360();
}
/*하루 한번만 보기 end*/

$(document).ready(function(){

	//테이블 td갯수에 따른 width 분리,조건 4개까지 20150318  start
	$(".pop_info_table .sol_tb").each(function(){
		var th_length = $(this).find('.sol_th th').length;
		if(th_length == 1){
			$(this).find('.sol_th .th_w').css("width","100%");
		}else if(th_length == 2){
			$(this).find('.sol_th .th_w').css("width","78%");
		}else if(th_length == 3){
			$(this).find('.sol_th .th_w').css("width","36%"); //22
		}else if(th_length == 4){
			$(this).find('.sol_th .th_w').css("width","26%");
		}else{return}
	});
	//테이블 td갯수에 따른 width 분리,조건 4개까지 20150318 end

});