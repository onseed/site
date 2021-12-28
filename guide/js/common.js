/*******************************************************************************
 * 파일명: common.js
 * 설명: 사이트 UI 및 모듈 설정
 * 작성자: frontUxer for netive
 * 최종수정일: 2020.10.10
*******************************************************************************/

/************************************ guide용 *******************************************/
if($(".ui_update").length){// 업데이트 날짜
	$(".ui_update em").text("2020.10.21");
}

$('.btn_top').off().on('click', function(e) { //href ="#contents" //맨 위로
	var aHref = $(this).attr('href'),
	hH = $('header').outerHeight();
	e.preventDefault();
	$(this).pageAnchors({
		addTop : hH,
		target : aHref
	});
});//end

var offsetPd = 40;

if($("html").hasClass("mobile")){
	offsetPd = 60;
}

//$('aside nav a[href^="#"]').on('click', function(e) {//좌측 메뉴
$('aside nav a').on('click', function(e) {//좌측 메뉴	
    var aHref = $(this).attr('href'),
    	hH = $('header').outerHeight();
     e.preventDefault();
     $(this).pageAnchors({
         addTop : hH +  offsetPd,
         target : aHref
     });
     $('aside nav a[href^="#"]').removeClass("on");
     $(this).addClass("on");
});//end

$(function($){
	$('aside nav a').eq(0).addClass("on"); //좌측메뉴 1번째 on
});