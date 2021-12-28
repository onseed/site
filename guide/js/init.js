/*******************************************************************************
 * 파일명: init.js
 * 설명: 사이트 초기화 및 기본설정
 * 작성자: frontUxer for netive
 * 최종수정일: 2020.10.10
*******************************************************************************/

(function() { //width 체크 및 모바일
	var width = document.documentElement.offsetWidth,
		sizeMode = width > 900 ? 'w1' : width > 768 ? 'w1 w2' : width > 413 ? 'm12 m2' : 'm12 m1',
		html5tags = ['article', 'aside', 'details', 'figcaption', 'figure', 'footer', 'header', 'hgroup', 'nav', 'section', 'summary'],
		i = 0, max = html5tags.length;

	for (i = 0; i < max; i++) {
		document.createElement(html5tags[i]);
	}
	document.documentElement.className += (sizeMode);
})(); //end

var initMobile;
if(navigator.userAgent.match(/Android/i) || navigator.userAgent.match(/webOS/i) || navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPad/i) || navigator.userAgent.match(/iPod/i) || navigator.userAgent.match(/BlackBerry/i) || navigator.userAgent.match(/Windows Phone/i) ){
	initMobile = true;
	document.getElementsByTagName('html')[0].classList.add('mobile');//faste addClass "mobile"
}else{
	document.getElementsByTagName('html')[0].classList.add('desktop');//faste addClass "desktop"
}

if(window.location.href.indexOf("mobile") > -1){//로컬일때
	initMobile = true;
	document.getElementsByTagName('html')[0].classList.add('mobile');//faste addClass "mobile"	
}else{
	document.getElementsByTagName('html')[0].classList.add('desktop');//faste addClass "desktop"
}

/*css 체인지*/
if(initMobile){//모바일인경우 mobile용 css
	/* pc를 없애고 모바일을 적용한다
	$('link[rel=stylesheet]').each(function () {
		if ($(this).attr('href').indexOf('_mobile') < 0) {
			$(this).remove();
		}
	});*/		
	//하지만 우린 pc를 쓰고 그다음에 모바일을 쓰자.
	console.log("모바일 css 추가 사용");
}else{//pc인경우 pc용 css
	$('link[rel=stylesheet][href$="_mobile.css"]').remove();
	console.log("데스크탑 css만 사용");
}
/*css 체인지. END*/

$(document).ready(function(){
	if($("html").hasClass("mobile")){		
		/*상단 메뉴처리*/
		var $navLi = $("header nav ul li");
		var $navUl = $("header nav ul");
		for(i=0; i< $navLi.length; i++){
			var navLiWidth = $navLi.eq(i).width();
			var navUlWidth = $navUl.width(); 
			$navUl.width(navUlWidth+navLiWidth);
		}
		/*상단 메뉴처리.end*/
		
		/*좌측 메뉴처리*/
		var $sideNavLi = $("aside nav ul li");
		var $sideNavUl = $("aside nav ul");
		//$sideNavLi.height($sideNavUl.height()/2 - 20); //페이지 메뉴 높이 
		for(i=0; i< $sideNavLi.length; i++){
			var navLiWidth = $sideNavLi.eq(i).width();
			var navUlWidth = $sideNavUl.width(); 
			$sideNavUl.width(navUlWidth+navLiWidth);
		}
		/*좌측 메뉴처리end*/
		
		/*스크롤 메뉴처리*/
		var headerH = $("header").outerHeight();
		var submenuH = $("#contents aside nav").outerHeight();
		$("#contents").css("margin-top", headerH+ submenuH);
		
		$(window).on('scroll', function(){
			var navOffsetT = $(this).scrollTop();
			 if(navOffsetT > 40){ //80인데..
				 $(".wrap").addClass("scroll");
			 }else{
				 $(".wrap").removeClass("scroll");				 
			 }		
		});
		/*스크롤 메뉴처리.end*/
		
	}	
});	