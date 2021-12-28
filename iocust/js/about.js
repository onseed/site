// wheel ===========================================================================
var currentScreen = 0; // 현재영역 순번
var scrollReady = false;
var scrollLocked = false;
var screenAnimationTime = 800; // 이동 속도

// 배열 저장
var screens = new Array( 'area1', 'area2', 'area3', 'area4');

// 마우스휠 스냅
function setupScrollHandler() {
	$("body").bind("mousewheel", function (delta, aS, aQ, deltaY) {
		delta.preventDefault();
		if (deltaY > 0) {
			scrollPrev();
		} else {
			if (deltaY < 0) {
				scrollNext();
			}
		}
		return false;
	});
}
function scrollNext() {
	if( currentScreen < screens.length-1 && scrollReady == true ) {
		currentScreen++;
		performScroll();
	}
}
function scrollPrev() {
	if( currentScreen > 0 && scrollReady == true ) {
		currentScreen--;
		performScroll();
	}
}
function performScroll() {
	scrollReady = false;
	var newYPos = Math.ceil($('.'+screens[currentScreen]).offset().top);
	$("html, body").animate(
		{scrollTop: newYPos },
		screenAnimationTime,
		'easeInOutExpo',
		function() { scrollReady = true;}
	);
}

function preventScroll() {
	var newYPos = Math.ceil($('#'+screens[currentScreen]).offset().top);
	$(window).scrollTop(newYPos);
}

// wheel E =========================================================================



// 컨텐츠 영역 버튼 이동
function goArea(param){
	currentScreen = param - 1; // for wheel

	// 현재 영역 인덱스값 변경
	switch (param) {
		case 1:
			var areaTop = $('#wrapper .area1').offset().top;
			$('html, body').stop().animate({scrollTop: areaTop}, 500);
			break;
		case 2:
			var areaTop = $('#wrapper .area2').offset().top;
			$('html, body').stop().animate({scrollTop: areaTop}, 500);
			break;
		case 3:
			var areaTop = $('#wrapper .area3').offset().top;
			$('html, body').stop().animate({scrollTop: areaTop}, 500);
			break;
		case 4:
			var areaTop = $('#wrapper .area4').offset().top;
			$('html, body').stop().animate({scrollTop: areaTop}, 500);
		default:
			break;
	}
}

// 스크롤 이동 제어
function scrollCheck(){
	var area1 = $('.area1').offset().top;
	var area2 = $('.area2').offset().top;
	var area3 = $('.area3').offset().top;
	var area4 = $('.area4').offset().top;

	locate = $(window).scrollTop();

	//### 1. visual bnr ###
	if(locate >= area1 && locate < area2){ 
		menuOn(0);
		//window.location.hash = '#1';


	//### 2. product bnr ###
	}else if (locate >= area2 && locate < area3){ 
		menuOn(1);
		//window.location.hash = '#2';


	//### 3. mov bnr ###
	}else if (locate >= area3 && locate < area4){
		menuOn(2);
		//window.location.hash = '#3';



	//### 4. content block: end ###
	}else if (locate >= area4){ 
		menuOn(3);
		//window.location.hash = '#4';

	}
}

function menuOn(i){
	$('.quick_Main_menu li').each(function(){
		$(this).removeClass('on');
	});
	$('.quick_Main_menu li').eq(i).addClass('on');
}

$(function(){

	//스크롤 마우스 휠 제어
	scrollReady = true;
	setupScrollHandler();

	//윈도우 리사이즈 딜레이
	var rtime = new Date(1, 1, 2000, 12,00,00);
	var timeout = false;
	var delta = 200;
	$(window).resize(function() {
			rtime = new Date();
			if (timeout === false) {
					timeout = true;
					setTimeout(resizeend, delta);
			}
	});
	
	function resizeend() {
			if (new Date() - rtime < delta) {
					setTimeout(resizeend, delta);
			} else {
					timeout = false;
					performScroll(); // Reset Viewport
			}
	}//윈도우 리사이즈 딜레이 end

	// area1~4 리사이즈
	$(window).resize(function() {
		var wWidth =$(window).width();
		var wHeight =$(window).height();

		$('.area1').height(wHeight);
		$('.area2').height(wHeight);
		$('.area3').height(wHeight);
		$('.area4').height(wHeight);
	});
	$(window).scroll(function() {	
		//Prevent scrolling when scroller is not ready 
		if(scrollLocked) preventScroll();

		scrollCheck();
	});
	$('.quick_Main_menu li a').click(function(){// 화면 이동
		currentScreen = $(this).parent().index();
		$(this).blur();

		currentScreen = currentScreen + 1;
		goArea(currentScreen);

		return false;
	});//end



});


$(window).load(function() {
		var wWidth =$(window).width();
		var wHeight =$(window).height();

		$('.area1').height(wHeight);
		$('.area2').height(wHeight);
		$('.area3').height(wHeight);
		$('.area4').height(wHeight);
});
