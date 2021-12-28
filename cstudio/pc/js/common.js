$(document).ready(function(){
	
});

//********* 셀렉트박스 디자인 *********//
jQuery.fn.styledSelect = function(options) {
	//var isFF2 = jQuery.browser.mozilla && jQuery.browser.version.indexOf('1.8.')==0;
	var prefs = {
		coverClass : 'select-replace-cover',
		innerClass : 'select-replace',
		adjustPosition : { top:0, left:0 },
		selectOpacity : 0
		}
	if (options) jQuery.extend(prefs,options);
	return this.each( function() {
		//if (isFF2) return false;
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

/*사이드 메뉴 툴팁 201451113 start*/
$(document).ready(function(){		
	$(".tip_layer").css("display","none");	
	$(".option_tip").hover(
		function(){
			$(this).next(".tip_layer").css("display","block");
		},
		function(){
			$(this).next(".tip_layer").css("display","none");	
		}
	);
});
/*사이드 메뉴 툴팁 201451113 end*/

//테이블 td갯수에 따른 width 분리,조건 4개까지 201451113 start
$(".pop_info_table .sol_tb").each(function(){
	var th_length = $(this).find('.sol_th th').length -1;
	if(th_length == 1){
		$(this).find('.sol_th .th_w').css("width","81%")
	}else if(th_length == 2){
		$(this).find('.sol_th .th_w').css("width","40.5%")
	}else if(th_length == 3){
		$(this).find('.sol_th .th_w').css("width","27%")
	}else if(th_length == 4){
		$(this).find('.sol_th .th_w').css("width","20%")
	}else{return}
});
//테이블 td갯수에 따른 width 분리,조건 4개까지 201451113 end