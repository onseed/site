/*******************************************************************************
 * 파일명: asuxer.js
 * 설명: 공통 plugin
 * 작성자: asuxer for netive
 * 최종수정일: 2019.11.10
*******************************************************************************/

'use strict';
var ua = navigator.userAgent, //user agent 체크 기타 모듈에서 쓸 수 있도록 전역처리
	ie = ua.match(/(?:msie ([0-9]+)|rv:([0-9\.]+)\) like gecko)/i), //ie 버전 체크. (MSIE 7,7 ~10. ie11 : rv:11.0) like Gecko,,11.0)
	prefix = ['Webkit', 'Moz', 'O'], // 접두사 설정			
	transition = 'transition',
	transform = 'transform',
	requestanimationframe = 'requestAnimationFrame', //requestanimationframe : 스크립트 기반 애니메이션용 타이밍 컨트롤. (https://msdn.microsoft.com/ko-kr/library/windows/apps/hh920765.aspx)
	cancelanimationframe = 'CancelAnimationFrame',
	transforms = {
		translate3d: 'translate3d(0px, 0px, 0px)',
		translate: 'translate(0px, 0px)',
		scale3d: 'scale3d(1, 1, 1)',
		scale: 'scale(1, 1)'
	},
	browser = $.browser, //1.8.x 버전까지 사용. (이후 버전은 jquery-migrate.min.js 추가 후 사용가능)
	isTouch = ('ontouchstart' in window),//터치 여부
	isMobile = ('orientation' in window) || isTouch  === true,//모바일여부	
	support = $.support,
	version, i, div;

var uniqueId = (function() {//unique 아이디 생성
	var id = 0;
	return function() {
		return id++;
	}
})();

$._cookie = {//쿠키 ???????????????????
	set: function(name, value, term, path, domain) {
		var cookieset = name + '=' + value + ';',
			expdate;
		if ( term ) {
			expdate = new Date();
			expdate.setTime( expdate.getTime()+term*1000*60*60*24 ); // term 1 is a day
			cookieset += 'expires=' + expdate.toGMTString() + ';';
		}
		if (path){
			cookieset += 'path=' + path + ';';
		}
		if (domain){
			cookieset += 'domain=' + domain + ';';
		}
		document.cookie = cookieset;
	},
	get: function(name) {
		var match = ( document.cookie || ' ' ).match( new RegExp(name+' *= *([^;]+)') );
		return ( match )? match[1] : null;
	}
};//쿠키 END

;(function($){//0.
$.fn.uxAgent = function(opt){//#################### 1.uxAgent ####################  

	var div = document.createElement('div');	

	if (!browser) {// $.browser 지원이 안되면 객체로 생성?
		$.browser = browser = {};
	}
	
	// test 값 true,false 값 적용
	browser.local = !(/^http:\/\//).test(location.href);
	browser.firefox = (/firefox/i).test(ua);
	browser.webkit = (/applewebkit/i).test(ua);
	browser.chrome = (/chrome/i).test(ua);
	browser.opera = (/opera/i).test(ua);
	browser.ios = (/ip(ad|hone|od)/i).test(ua);
	browser.android = (/android/i).test(ua);
	browser.safari = browser.webkit && !browser.chrome;
	
	// 터치가능여부 체크
	support.touch = browser.ios || browser.android || (document.ontouchstart !== undefined && document.ontouchstart !== null);
	browser.mobile = support.touch && ( browser.ios || browser.android );
	
	// browser flase 값 삭제
	for (i in browser) {
		if (!browser[i]) {
			delete browser[i];
		}
	}
	
	// os check
	browser.os = (navigator.appVersion).match(/(mac|win|linux)/i);
	browser.os = (browser.os)? browser.os[1].toLowerCase() : '';
	
	// ios, android version check
	if (browser.ios || browser.android) {
		version = ua.match(/applewebkit\/([0-9.]+)/i);
		if (version && version.length > 1) {
			browser.webkitversion = version[1];
		}
		if (browser.ios) {
			version = ua.match(/version\/([0-9.]+)/i);
			if (version && version.length > 1) {
				browser.ios = version[1];
			}
		}else if (browser.android) {
			version = ua.match(/android ([0-9.]+)/i);
			if (version && version.length > 1) {
				browser.android = parseInt(version[1].replace(/\./g, ''));
			}
		}
	}
	
	// ie 추가
	support.svgimage = true;
	support.pointerevents = true;
	
	// ie version check 및 svgimage, poiterevents 재설정
	if (ie){
		browser.ie = ie = parseInt(ie[1] || ie[2]);
		if (9 > ie) {
			browser.oldie = true;
		} else if (9 == ie){
			prefix.push('ms');
		}
		if (11 > ie){
			support.pointerevents = false;
		}
		if (9 > ie){
			support.svgimage = false;
		}
	}
	
	// window.history.pushState(data, title [, url ] ) https://www.w3.org/TR/2011/WD-html5-20110113/history.html#dom-history-pushstate
	support.pushstate = !!history.pushState;
	support.mediaquery = typeof(window.matchMedia) == 'function' || !browser.oldie;
	
	// placeholder 지원여부
	var ip_test2 = document.createElement('input'),
		ie_ph = ('placeholder' in ip_test2);
	
	// media.canPlayType(type) 재생여부 판단하여 불가능:'', 가능:maybe or probably 반환. ie8은 undefinded
	support.video = document.createElement('video').canPlayType !== undefined;
	
	/*
	$.fn.decideClass = function(classname, condition) {
		return this[condition ? 'addClass' : 'removeClass'](classname);
	}*/
	
	support.awse = {
		// ie8
		isPoorBrowser : $.browser.ie && 9 > $.browser.ie,
		swipeAble : !!(!!$.browser.mobile || window.PointerEvent || window.MSPointerEvent),
		// mobile:flase, pc(ie9이하)제외: transition
		parallaxAble : !($.browser.ie && 9 > $.browser.ie) && !$.browser.mobile && $.support.transition,
		// 초기화
		initialized : false	    
	}// console.log(support.awse.swipeAble)
	
	$(document.documentElement)
		.addClass(browser.os)
		.addClass(browser.chrome ? 'chrome' : browser.firefox ? 'firefox' : browser.opera ? 'opera' : browser.safari ? 'safari' : browser.ie ? 'ie ie'+browser.ie : '')
		.addClass(browser.webkit ? 'webkit' : '')
		.addClass(browser.ie && 8 > browser.ie ? 'ie8' : '')
		.addClass(browser.mobile ? 'mobile' : 'desktop')
		.addClass(browser.ios ? 'ios' : browser.android ? 'android' : '');
	
	if(opt=="full"){
		
		// css3 check
		support.backgroundsize = 'backgroundSize' in div.style;
		if ( support.backgroundsize ) {
			div.style.backgroundSize = 'cover';
			support.backgroundsize = div.style.backgroundSize == 'cover';
		}
	    try {
	        div.style.background = 'rgba(0, 0, 0, 0)';
	        support.rgba = div.style.background == 'rgba(0, 0, 0, 0)';
	    } catch(e) {
	        support.rgba = false;
	    }
	    
	    support.canvas = document.createElement('canvas');
	    support.canvas = support.canvas.getContext && support.canvas.getContext('2d');
	    
	    // transform check : 지원여부에 따라 접두사 추가
	    if (div.style[transform] != undefined) {
	    	support.transform = transform;
	    } else {
	    	transform = 'Transform';
	    	for (i = 0; i < 4; i++) {
	    		if (div.style[prefix[i]+transform] !== undefined) {
	    			support.transform = prefix[i]+transform;
	    			break;
	    		}
	    	}
	    }

	    if (support.transform) {
	    	transform = support.transform;
	    	for (i in transforms) {
	    		div.style[transform] = '';
	    		div.style[transform] = transforms[i];
	    		support[i] = div.style[transform];
	    	}
	        /* if (browser.ie && 10 > browser.ie) { }
	        if ( browser.android && 430 > browser.android ) { }*/
	    }

	    // transition check : 지원여부에 따라 접두사 추가
	    if ( div.style[transition] != undefined ) {
	    	support.transition = transition;
	    } else {
	    	transition = 'Transition';
	    	for (i = 0; i < 4; i++) {
	    		if (div.style[prefix[i]+transition] !== undefined) {
	    			support.transition = prefix[i]+transition;
	    			break;
	    		}
	    	}
	    }
	    
	    // requestanimationframe check : 지원여부에 따라 접두사 추가
	    if (window[requestanimationframe]) {
	    	support.requestanimationframe = true;
	    } else {
	    	requestanimationframe = 'RequestAnimationFrame';
	    	for (i = 0; i < 4; i++) {
	    		if (window[prefix[i]+requestanimationframe] !== undefined) {
	    			window.requestAnimationFrame = window[prefix[i]+requestanimationframe];
	    			window.cancelAnimationFrame = window[prefix[i]+cancelanimationframe];
	    			support.requestanimationframe = true;
	    			break;
	    		}
	        }
	    }
	    
	    // requestanimationframe 지원안하는 브라우저를 위한 function 생성
	    if (!support.requestanimationframe) {
	    	window.requestAnimationFrame = (function() {
	    		var lasttime = 0;
	    		return function(callback) {
	    			var currenttime = gettime(); // gettime() : 시간 값을 밀리초 단위
	    			var timetocall = Math.max(0, 16-(currenttime-lasttime));
	    			lasttime = currenttime+timetocall;
	    			return setTimeout(function() { callback(currenttime+timetocall); }, timetocall);
	    		}
	    	})();
	    	window.cancelAnimationFrame = function(id) {
	    		clearTimeout(id);
	    	}
	    }
	    
	    div = null;
	    
	    $(document.documentElement)
	    	.addClass(support.transition ? 'transition' : 'notransition')
	    	.addClass(support.transform ? 'transform' : 'notransform')
	    	.addClass(support.backgroundsize ? 'backgroundsize' : 'nobackgroundsize')
	    	.addClass(support.rgba ? 'rgba' : 'norgba')
	    	.addClass(support.svgimage ? 'svg' : 'nosvg')
	    	.addClass(support.pointerevents ? 'pointerevents' : 'nopointerevents')
	    	.addClass(support.opacity ? 'opacity' : 'noopacity');
	}
	
	if (!window.console) {
		window.console = {};
		window.scard.log.debug = window.console.table = window.console.error = window.console.clear = function() {};
	}
	if (opt=="full") {
		console.log("uxAgent('full'): Agent 검사");
	}else{
		console.log("uxAgent(): Agent 검사");
	}

};//####################// 1.uxAgent ####################


$.fn.uxIdMake = function(opt){//#################### 2.uxIdMake ####################
	var name = opt;
	for (i = 0; i < this.length; i++) {
		var inputId = name + uniqueId();
		this.eq(i).attr('id', inputId);
  	}
  	console.log("유니크 ID 생성: uxIdMake();");                		
	return this;
};//####################// 2.uxIdMake ####################

var uxLayerPopLength = 0;
$.fn.extend({//#################### 3.uxLayerPop ####################
	uxLayerPop : function(opt) {
		
		if(uxLayerPopLength < 1){ //콘솔 출력을 위한 window객체니 실사용시 삭제
			console.log("uxLayerPop(): 레이어팝업");
		}
		uxLayerPopLength ++; //콘솔 출력을 위한 window객체니 실사용시 삭제.end		
		
		var defaults = {
			maxW : 500,
			maxH : 0,
			auto : false,
			ariaTarget : '.contents, header.ui', //20201105 컨텐츠 셀렉터
			mg : 15,
			popClose : false,
			qspop : false,//모달 중복
			callback:'', //콜백 추가
			ps : '', // 'top', 'bottom'
			hFix : false, // height 고정
			scrlLock : false // 스크롤 막기 옵션
		},
		opt = $.extend(defaults, opt);
		
		return this.each(function(){
			var $this		= $(this),
				$win			= $(window),
				$doc			= $(document),
				$body		= $('body'),
				$wrapper	= $('.wrap'),
				auto			= opt.auto,
				ariaTarget	= opt.ariaTarget, //20201105 aria target
				maxW			= opt.maxW,
				maxH			= opt.maxH,
				mg				= opt.mg,
				popClose		= opt.popClose,
				qspop			= opt.qspop,
				ps				= opt.ps,
				target		= $this.attr('id'),
				$btn			= $('[data-target="' + target + '"]'),
				$modal		= $('#' + target),
				$modal_h	= $modal.children('header'),
				$modal_c	= $modal.children('.cont'),
				$modal_f		= $modal.children('.modal_footer'),
				$modalBtn	= $modal.find('button, a'),
				modalBg		= '<div class="modal_bg"></div>',
				$modalBg	= $('.modal_bg'),
				modalBg2	= '<div class="modal_bg2"></div>',
				$modalBg2	= $('.modal_bg2'),
				mhH			= $modal_h.outerHeight(),
				mcH			= $modal_c.outerHeight(),
				mfH			= $modal_f.outerHeight(),
				winW			= $win.width(),
				layW			= Number(winW - 20),
				layH,
				nPs			= $(document).scrollTop(),
				callback		= opt.callback, //콜백
				scrlLock		= opt.scrlLock, //스크롤 막기 옵션
				hFix			= opt.hFix, //height 고정
				wH;
				
				$this.data('ps', ps);
				
			//ux15 오버플로우 속성 안쓰고, 마우스 스크롤 막기
			// left: 37, up: 38, right: 39, down: 40,
			// spacebar: 32, pageup: 33, pagedown: 34, end: 35, home: 36
			var keys = {37: 1, 38: 1, 39: 1, 40: 1};
	
			function preventDefault(e) {
				e = e || window.event;
				if (e.preventDefault){
					e.preventDefault();
				}
				e.returnValue = false
			}
			
			function preventDefaultForScrollKeys(e) {
				if (keys[e.keyCode]) {
					preventDefault(e);
					return false;
				}
			}
						
			function disableScroll() {//console.log("스크롤 막기");
				if (window.addEventListener){ // older FF
					window.addEventListener('DOMMouseScroll', preventDefault, false);
				}
				//window.onwheel = preventDefault; // asis: modern standard
				window.addEventListener('wheel', preventDefault, {passive:false}); //modern standard 20190917 chrome 패치
				//window.onmousewheel = document.onmousewheel = preventDefault; // older browsers, IE 20190917 삭제(현재 구조와 맞지않음) 
				window.ontouchmove  = preventDefault; // mobile
				document.onkeydown  = preventDefaultForScrollKeys;
			}
			
			function enableScroll() {//console.log("스크롤 풀기");
				if (window.removeEventListener){
					window.removeEventListener('DOMMouseScroll', preventDefault, false);
				}				
				//window.onwheel = null; //  asis: modern standard
			    window.removeEventListener('wheel', preventDefault, {passive:false}); //modern standard 20190917 chrome 추가
			    window.onmousewheel = document.onmousewheel = null; // older browsers, IE 20190917 삭제(현재 구조와 맞지않음)
			    window.ontouchmove = null;  
			    document.onkeydown = null;
			}
			
			var app = {
					
				show : function(target) {
					$modal = $('#' + target);
					$modal.css({
						display : 'block',
						opacity : 0
					});
					
					wH = $win.height();
					winW = $win.width(),
					layW = Number(winW - (mg*2));
					layH = $modal.outerHeight();
					
					var _t	= (wH < layH) ? mg : '50%',
						_w		= 'auto',   //($this.data('ps') === 'top') ? winW : layW,
						_mw	= maxW,
						_l		= mg, //'50%'
						_r		= mg, //'50%'
						_ml	= 0, //($this.data('ps') === 'top') ? 0 : (layW / 2) * -1,
						_mt	= (layH / 1.5) * -1,
						_mt2	= (wH < layH) ? 0 : (layH / 2) * -1 ;
					
					// 모바일 메인 상태진행 배너
					if ($this.data('ps') === 'top') {
						_t = 0,
						_mw = '',
						_l = 0,
						_r = 0,
						_mt = layH * -1,
						_mt2 = 0;
					}
					
					//maxH 있을때
					if(maxH !== 0){
						$modal_c.css({'height':maxH,'overflowY': 'auto'});
						//layH	= $('#' + target).outerHeight();
						layH	= maxH + $('#' + target).children('header').outerHeight() + $('#' + target).children('.modal_footer').outerHeight();
						_t 		= (wH < layH) ? mg : '50%';
						_mt2	= (wH < layH) ? 0 : (layH / 2) * -1 ;
						//console.log(target +', _mt2: '+_mt2 + ' , layH: '+layH + ', modal_footer: ' +$('#' + target).children('.modal_footer').outerHeight());
						
						$modal
							.css({
								width : _w,
								top : _t,
								left : _l,
								right : _r,
								marginLeft : _ml,
								marginTop : _mt,//marginTop : '-500px',
								maxWidth : _mw
							})
							.stop().animate({
								opacity : 1,
								marginTop : _mt2,
							}, 200, function(){
								marginTop : _mt2
							}); //console.log(_mt +', _mt2: '+ _mt2 +' : '+ wH + ' : '+layH);
					} else{
						if ($this.data('ps') === 'bottom') {
							$modal
								.css({
									width : _w,
									bottom : 0,
									opacity : 1,
									left : 0,
									right : 0,
									marginLeft : _ml,
									marginTop : 0,
									marginBottom : _mt,
									maxWidth : '100%'
								})
								.stop().animate({
									opacity : 1,
									marginBottom : 0,
									left : 0,
								}, 200, function(){
									
								});//console.log('_l: '+_l+', _r: '+_r + ', _t:'+_t);
						}else{
							$modal
								.css({
									width : _w,
									top : _t,
									left : _l,
									right : _r,
									marginLeft : _ml,
									marginTop : _mt,
									maxWidth : _mw
								})
								.stop().animate({
									opacity : 1,
									marginTop : _mt2,
								}, 200, function(){
									
								});//console.log('_l: '+_l+', _r: '+_r + ', _t:'+_t);
						}
					}
					
					/*
					if(isMobile !== true){disableScroll();}// 모바일에선 안씀
					if(isMobile == true){// 모바일 스크롤 막기
						$('html').css('overflow','hidden');
						if(scrlLock === true ){//스크롤 막기 옵션 true일때
							disableScroll();//console.log('scrlLock');
						}
					}*/
					

					if(scrlLock === true ){//페이지내 휠스크롤 안쓸때
						disableScroll();
						console.log('scrlLock');
					}
					
					if ($this.data('ps') !== 'top') {
						$(window).resize(function(){
							var layH2   = $modal.outerHeight();
							if (wH < layH || wH < (layH2 + mg*2)) {
								app.overLayer(target);
							}
							if ($modal.outerWidth() >= maxW) {
								var maxW_l = ($win.width() - maxW) / 2;
								$modal.css('left', maxW_l);
							} else {
								$modal.css('left', mg );
							}
	                      }).resize();                
					}
					
					if($('html').hasClass('ios')){ //ios접근성 추가 20201105
						$modalBtn.eq(0).focus();
					}else{
						$modal.attr('tabindex', 0).focus();
					} //ios접근성 추가.end
					
					$(ariaTarget).attr("aria-hidden",true); //arai 접근성 추가 20201105
					$modal.attr("aria-hidden",false); //arai 접근성 추가
					
					setTimeout(function(){//ux15 quick start용 모달위에 뜰경우
						if(qspop === true){
							// return false;
							$body.append(modalBg2);//20190230 "modalBg2"에 대한 패치 추가
							$modalBg2 = $('.modal_bg2');
							$modal.css('z-index', 10003);
							$modalBg2.css('z-index', 10002).css('opacity', 0.5).on('click', function(){
								app.hide();
							});
	                      } else {
	                          $body.append(modalBg);
	                          $modalBg = $('.modal_bg');
	                          $modalBg.css('opacity', 0.7).on('click', function(){
	                              app.hide();
	                          });
	                      }
					},30);
					$modalBtn.off('click.layerPopUp_close').on('click.layerPopUp_close', function() {
						($(this).data('dismiss') === 'modal') ? app.hide() : '';
					});
				},
				
				overLayer : function(){
					$modal = $('#' + target);
					$modal_h = $modal.children('header');
					$modal_c = $modal.children('.cont');
					$modal_f  = $modal.children('.modal_footer');
					
					wH  = $win.height();
					mhH = $modal_h.outerHeight();
					mfH = $modal_f.outerHeight();
					
					$modal.stop().animate({
						opacity:1,
						top : mg,
						marginTop : 0
					},300);
					
					//maxH
					if(maxH !== 0){
						$modal_c.removeAttr('style').css({
							height: maxH, overflowY: 'scroll',
							boxSizing : 'border-box'
						});
					}else{
						$modal_c.removeAttr('style').css({
							height: wH - (mfH + mhH + (mg*2)), overflowY: 'scroll',
							boxSizing : 'border-box'
						});
					}
					
					//$modal_f.css('border-top', '1px solid #d4d4d4');
					console.log("overLayer");
				},
				hide : function() {
					$wrapper.css({
						height : '',
						overflow: ''
					});
					$modal.stop().animate({
						opacity : 0,
						marginTop : (layH / 1.5) * -1
					}, 300, function(){
						$modal.css('display', 'none' ).removeAttr('tabindex').removeAttr('style');
						
						//height fix 옵션
						if(hFix){
							
						} else{
							$modal_c.removeAttr('style');
						}
					});
					
					$modalBg = $('.modal_bg');
					$modalBg2 = $('.modal_bg2');
					//$modalBg.css('opacity', 0).remove();
					//$modalBtn.removeClass('on hover');
					
					//ux15 스크롤 막았던거 품
					enableScroll();
					$('html').removeAttr('style');
					
					if ($btn.length < 1) {
						$('#wrap').attr('tabindex',0).focus();						
					} else {
						$btn.focus();
					}
					$(ariaTarget).attr("aria-hidden",false); //arai 접근성 추가 20201105
					$modal.attr("aria-hidden",true); //arai 접근성 추가					
					
					//ux15 quick start용 모달위에 뜰경우
					if(qspop === true){
						$modalBg2.css('opacity', 0).remove();
						$modalBtn.removeClass('on hover');
					} else {
						$modalBg.css('opacity', 0).remove();
						$modalBtn.removeClass('on hover');
					}
					if ($btn.length < 1) {
						$('#wrap').attr('tabindex',0).focus();
					} else {
						$btn.focus();
					}
				},
				
				imprison : function(){ //웹접근성 탭처리
					var $modalFocus = $modal.find('a, input, button, label');
					
					$modalFocus.eq(0).addClass('fst');
					$modalFocus.eq(-1).addClass('end');
					$modal.on('keydown.modal',function(e){
						if(e.shiftKey && e.keyCode == 9) {
							e.preventDefault();
							$modal.find('.end').focus();
						}
					});
					
					$modal.find('.fst').off('keydown.layerpop').on('keydown.layerpop',function(e){
						$modal.off('keydown.modal');
						if(e.shiftKey && e.keyCode == 9) {
							e.preventDefault();
							$modal.find('.end').focus();
						}
					});
					$modal.find('.end').off('keydown.layerpop').on('keydown.layerpop',function(e){
						$modal.off('keydown.modal');
						if(!e.shiftKey && e.keyCode == 9) {
							e.preventDefault();
							$modal.find('.fst').focus();
						}
					});
				},
				
				eventHandler : function() {
					if (auto) {
						// if (!$._cookie.get(target)) {쿠키적용여부 확인
							app.show(target);
							app.imprison();
						// }
					}
					
					if (popClose) {
						app.hide();
						setTimeout(function(){
							$modalBg.css('opacity', 0).remove();
							$modalBg2.css('opacity', 0).remove();
						},100);
					}
					
					$btn.off('click.layerPopUp_open').on('click.layerPopUp_open', function(e) {
						e.preventDefault();
						target = $(this).data('target');
						
						if (!$(this).data('clicked')) {
							app.show(target);
							app.imprison();
							$(this).data('clicked', true);
						} else {
							app.show(target);
						}
					});
					
					//콜백이 함수면 콜백 호출
					if($.isFunction(callback)){
						callback.call(this);
					}
				}
			}
			app.eventHandler();			   
		});
	}
});//####################// 3.uxLayerPop ####################

var uxTooltipLength = 0;
$.fn.extend({//#################### 4.uxTooltip ####################
	uxTooltip : function(opt) {
		
		if(uxTooltipLength < 1){ //콘솔 출력을 위한 window객체니 실사용시 삭제
			console.log("uxTooltip(): 툴팁");        
		}
		uxTooltipLength ++; //콘솔 출력을 위한 window객체니 실사용시 삭제.end			
		
	        var defaults = {
	                arrow: true, 
	                speed : 0,
	                maxWidth : 500,
	                ariaTarget : '.contents, header.ui'
	            },
	            opt = $.extend(defaults, opt);
	
	        return this.each(function(){
	            var $this = $(this),
	            	$body = $('body'),
	                $close = $this.find('.btn_close, .ui_close'),
	                thisId = $this.attr('id'),
	                $lay = $('#' + thisId),
	                $btn,
	                pst, psl,
	                maxWidth = opt.maxWidth,
	                arrow = opt.arrow,
	                speed = opt.speed,
	                ariaTarget = opt.ariaTarget, //20201105 aria target
	                tip_arrow = 'ui_tooltip_arrow',
	                targetId;
	
	            var app = {
	                i : function() {
	                	
	                    if (!thisId) {
	                        thisId = $this.data('tooltip');
	                        $lay = $('.ui_tool_tip[data-tooltip="' + thisId + '"]');
	                        $close = $this.find('.btn_close');
	                    }
	                    
	                    var lay_w = $this.outerWidth();
	                    
	                    app.e();
	
	                },
	                s : function(targetId) {//layer.open
	                    var $target;
	                                    	
	                      $target = $('.ui_tool_tip[data-tooltip="' + targetId + '"]');
	                      $('[data-target-tooltip]').data('toggle-sta', false).removeClass('on');
	                      //$('[data-target-tooltip="' + targetId + '"]').data('toggle-sta', true).addClass('on');
	                      $target.css('max-width',maxWidth);
	                    
	                    	if(arrow){//화살표 옵션일때
	                    		if($('.'+tip_arrow).length<=0){
	                    			$('<span class="'+tip_arrow+'"></span>').appendTo($('body'));	
	                    		}
	                    		$('.'+tip_arrow).css({
	 	                            	'left': $btn.offset().left + Math.floor($btn.outerWidth()/2) - Math.floor($('.'+tip_arrow).outerWidth()/2),
	 	                             	'top' : $btn.offset().top + $btn.outerHeight() -4,
	 	                             	'display' : 'block'
	 	                        });
	                    	}    
	                    	
	                      var topOffset;
	                      if(arrow){
	                      	topOffset = pst + $btn.outerHeight() + $('.'+tip_arrow).outerHeight() - 5;
	                      }else{
	                      	topOffset = pst + $btn.outerHeight();
	                      }
	                      $target.css({ display : 'block', top : pst}).stop().animate({
	                      	top : topOffset 
	                      },speed,function(){
	                    		//$('.'+tip_arrow).addClass('on');                            	
	                      });          
	                    	
	                    	if (!!$('html.desktop').length) {//데스크탑일때만 툴팁 width 처리
	                        	var tw = $target.outerWidth();                                	  
	                        	if(psl + tw > $(window).width()){//툴팁레이어의 left 위치 처리(툴팁레이어 width가 버튼보다 넘치는 경우)                                		
	                        		var targetLeft =  $(window).width() - tw;
	                        		$target.css('left',targetLeft);//$btn.parent().css("background","red");
	                        		//console.log($target.find('h1').text().trim()+" : " + tw + ", "+"psl:" +psl+ ", "+"$btn.parent().width(): " + $btn.parent().width()+", "+"$target.left: "+ targetLeft+", "+"$(window).width(): " + $(window).width() );
	                        	}else{
	                        		$target.css('left', psl);//$btn.parent().css("background","green");
	                        	}
	                       }
	                    	
    					$(ariaTarget).attr("aria-hidden",true); //arai 접근성 추가 20201105
    					$target.attr("aria-hidden",false); //arai 접근성 추가				                    	
	
	                    if ($close.length) {
	    					if($('html').hasClass('ios')){ //ios접근성 추가 20201105
	    						$target.find('a, button').eq(0).focus();
	    					}else{
	    						$target.attr('tabindex',0).focus();
	    					} //ios접근성 추가.end
	    					
	                    	app.imprison($target);
	                    };
	                },
	                h : function(targetId){//layer.close
	                    var $target;
	                    	
	                        $target = $('.ui_tool_tip[data-tooltip="' + targetId + '"]');
	                        $target.hide();	                            
	                        $('.'+tip_arrow).hide();//팁 화살표 숨김
	                       // pst = $btn.offset().top;
	                       // psl = $btn.offset().left;
	                        $btn.focus();
	                        
	    					$(ariaTarget).attr("aria-hidden",false); //arai 접근성 추가 20201105
	    					$target.attr("aria-hidden",true); //arai 접근성 추가	                        
	                        
	                },
	                imprison : function($target){
	                    var $targetFocus = $target.find('a, button, input, [role="button"], label');
	                    if ($targetFocus.length > 0) {
	
	                    	$targetFocus.eq(0).addClass('fst');
	                      $targetFocus.eq(-1).addClass('end');
	
	
	                      $target.off('keydown.target').on('keydown.target',function(e){
	                          if(e.shiftKey && e.keyCode == 9) {
	                              e.preventDefault();
	                              $target.find('.end').focus();
	                          }
	                      });
	                      $target.find('.fst').off('keydown.layertoggle').on('keydown.layertoggle',function(e){
	                      	$target.off('keydown.target');
	                      	if(e.shiftKey && e.keyCode == 9) {
	                              e.preventDefault();
	                              $target.find('.end').focus();
	                          }
	                      });
	                      $target.find('.end').off('keydown.layertoggle').on('keydown.layertoggle',function(e){
	                      	$target.off('keydown.target');
	                          if(!e.shiftKey && e.keyCode == 9) {
	                              e.preventDefault();
	                              $target.find('.fst').focus();
	                          }
	                      });
	                    }
	                },
	                e : function(){
	                    $('button[data-target-layer="' + thisId + '"], button[data-target-tooltip="' + thisId + '"]')
	                    	.off('click.layertoggle')
	                    	.on('click.layertoggle', function(e){
	                    		e.preventDefault();
	                    		$btn = $(this);
	                    		targetId = $btn.data('target-tooltip');
	                    		pst = $btn.offset().top;
	                    		psl = $btn.offset().left;
	                              
	                          if (!$btn.data('toggle-sta')){
	                              $('[data-tooltip]').hide();
	                              $('[data-target-tooltip]').data('toggle-sta', false).removeClass('on');
	                              app.s(targetId);
	                              $body.data('tgon', true);
	                              $btn.data('toggle-sta', true).addClass('on');
	                          } else {
	                              app.h(targetId);
	                              $btn.data('toggle-sta', false).removeClass('on');
	                              $body.removeData('tgon');
	                              
	                              $('.'+tip_arrow).removeClass('on');
	                          }
	
	                          $close.on('click.layertoggle', function(e){
	                              e.preventDefault();
	                              setTimeout(function(){
	                                  app.h(targetId);
	                                  $btn.data('toggle-sta', false).removeClass('on');
	                                  
	                                  $('.'+tip_arrow).removeClass('on');
	                              },100);
	                          });
	
	                          // 바닥 클릭 시 닫기
	                          $('.ui_toggle_layer, button[data-target-layer], .ui_tool_tip, button[data-target-tooltip]')
	                          	.off('mouseover.layerclose')
	                          	.on('mouseover.layerclose', function(){
	                          		$body.data('tgon', true);
	                          	})
	                          	.off('mouseleave.layerclose')
	                          	.on('mouseleave.layerclose', function(){
	                            	$body.data('tgon', false);
	                            	$(document).off('click.layerclose').on('click.layerclose', function(){
	                        			if ($body.data('tgon') === false){
	                        				//$('.ui_toggle_layer').hide();
	                                        $('[data-target-layer]').data('toggle-sta', false).removeClass('on');
	                                        $('.ui_tool_tip').hide();
	                                        $('[data-target-tooltip]').data('toggle-sta', false).removeClass('on');			                                       
				                            $('.'+tip_arrow).hide(); //팁 화살표 숨김						                            
	                        			}
	                            	});
	                          	});
	                    	});
	                }
	            }
	            app.i();
	        });
	    }	
});//####################// 4.uxTooltip ####################

var uxInputLength = 0;
$.fn.extend({//#################### 5.uxInput ####################
	uxInput : function(opt){
					
		if(uxInputLength < 1){ //콘솔 출력을 위한 window객체니 실사용시 삭제
			console.log('uxInput(): 인풋 타입');	
		}
		uxInputLength ++; //콘솔 출력을 위한 window객체니 실사용시 삭제.end
		
		var defaults = {
			limit : 0,
			allCheck : false,
			addName : ''
		},
		opt = $.extend(defaults,opt);
		
		return this.each(function(){
			var $this		= $(this),
				type			= $this.attr('type'),
				inputId		= $this.attr('id'),
				inputName	= $this.attr('name'),
				$label			= $('label[for="'+ inputId +'"]'),
				$inputName	= $('.' + inputName),
				allCheck		= opt.allCheck,
				addName	= opt.addName,
				limit			= opt.limit,
				allevent		= false,
				allName		= null;	
			
			var app = {
				init : function(){
					(!!inputName) ? $label.addClass('label_' + type + ' ' + inputName) : $label.addClass('label_' + type);
					
					//$this.attr('aria-hidden', true).css('display','none');
					
					($this.prop('checked') === true) ? $label.addClass('on') : '';
					($this.prop('disabled') === true) ? $label.addClass('off') : '';
					
					if (type === 'checkbox') {
						if (allCheck) { //부모 allchkeck의 name과 동일한 name을 갖은 자식들을 컨트롤
							
							$label.addClass('label_all');
							$this.addClass('input_all');
							
							if (!!addName) {//addName 속성 있을때만
								allName = inputName + '_' + addName;
							
								$('input[name="' + addName + '"]').attr('data-all-check', allName);
								$('label.' + addName).attr('data-all-check', allName);
							} else {
								allName = inputName;
							}
							
							$('input[name="' + inputName + '"]').attr('data-all-check', allName);
							$('label.' + inputName).attr('data-all-check', allName);
						}
					}
					
					//$this.data('limit', limit);
					//app.checkLimit();
					app.eventHandle();
					app.objChecked();
				},//init.end
				objChecked : function(allevent){
					if (type === 'radio') {
						$label			= $('label[for="'+ inputId +'"]');
						$inputName	= $('.' + inputName);						
						$label;
						
						if ($this.prop('checked') === true) {
							$inputName.removeClass('on');
							$label.addClass('on');
						}
					}
					
					if (type === 'checkbox') {
						if (!allCheck) { //전체 체크 on,off 설정 
							
							//data-inform-chk속성 개체 이벤트
							if( $this.attr('data-inform-chk') == 'true' ){
								var thisChk = $this.attr('data-inform-check'),
									thisVal = $this.attr('data-eqChk'),
									thisData = $this.attr('data-all-check');
								
								if ($this.prop('checked') !== true) {
									$label.removeClass('on');
									$this.attr('data-eqChk', 'off');
								} else {
									$label.addClass('on');
									$this.attr('data-eqChk', 'on');
								}
								
								//속성이 둘다 off일때 상위 체크박스 끔
								if ( $('input[data-eqChk]').eq(0).attr('data-eqChk') == 'off' && $('input[data-eqChk]').eq(1).attr('data-eqChk') == 'off') {
									$this.parent().parent().find('.label_all_sub, .input_all_sub').prop('checked', false).removeClass('on');
									//맨 상위 체크까지 끔
									$('input[data-all-check="' + thisData + '"].input_all').prop('checked', false);
									$('label[data-all-check="' + thisData + '"].label_all').removeClass('on');
								} else{
									$this.parent().parent().find('.label_all_sub, .input_all_sub').prop('checked', true).removeClass('off').addClass('on');
									//맨 상위 체크까지 켬
									$('input[data-all-check="' + thisData + '"].input_all').prop('checked', false);
									$('label[data-all-check="' + thisData + '"].label_all').addClass('on');
								}
								
								return false;
							}
						
							var thisData = $this.attr('data-all-check'),
							thisAct  = $this.attr('data-enabled-check');
							
							if ($this.prop('checked') !== true) {
								$label.removeClass('on');
								
								if (!!thisAct) {
									$('input[name="' + thisAct + '"]').prop('disabled', true).prop('checked', false);
									$('label.' + thisAct).removeClass('on').addClass('off');
								}
									
								if (!!thisData) {
									$('input[data-all-check="' + thisData + '"].input_all').prop('checked', false);
									$('label[data-all-check="' + thisData + '"].label_all').removeClass('on');
								}
							} else {
								$label.addClass('on');
								
								if (!!thisAct) {									
									$('input[name="' + thisAct + '"]').prop('disabled', false).prop('checked', true);
									$('label.' + thisAct).removeClass('off').addClass('on');
								}
								
								if (!!thisData) {
									var allSum  = Number($('input[data-all-check="' + thisData + '"]').length) - 1,
										allCheckSum = Number($('input[data-all-check="' + thisData + '"]:checked').length),
										disabledSum = Number($('input[data-all-check="' + thisData + '"]:disabled').length);
									
									if ((allSum - disabledSum) === allCheckSum) {
										$('input[data-all-check="' + thisData + '"].input_all').prop('checked', true);
										$('label[data-all-check="' + thisData + '"].label_all').addClass('on');
									}
								}
							}
						} else {
							var $inputDisabled = $('input[data-all-check="'+ allName + '"]'),
								$inputAttrName = $('label[data-all-check="'+ allName + '"]');
							
								if (allCheck) {
									var allSum = Number($inputDisabled.length),
									i;
									
									if ($this.prop('checked')) {
										$('#' + inputId).addClass(inputName + '_all');
										$label.addClass(inputName + '_all');
										i = allSum;
										
										for (i; i--;) {
											var thisAct = $inputDisabled.eq(i).attr('data-enabled-check');
											
											if (!$inputDisabled.eq(i).prop('disabled')) {// disabled 인 경우 전체 체크 제외
												$inputDisabled.eq(i).prop('checked', true);
												$inputAttrName.eq(i).addClass('on').data('allcheck', true);
											}
											
											if (!!thisAct) {
												$('input[name="' + thisAct + '"]').prop('disabled', false).prop('checked', true);
												$('label.' + thisAct).removeClass('off').addClass('on');
											}
										}
									} else {
										$('#' + inputId).removeClass(inputName + '_all');
										$label.removeClass(inputName + '_all');
										
										i = allSum;
										for (i; i--;) {
											var thisAct = $inputDisabled.eq(i).attr('data-enabled-check');
											
											if (!!thisAct) {
												$('input[name="' + thisAct + '"]').prop('disabled', true).prop('checked', false);
												$('label.' + thisAct).removeClass('on').addClass('off');;
											}
										}
										
										if (allevent) {
											$inputDisabled.prop('checked', false);
											$inputAttrName.removeClass('on').data('allcheck', false);;
										}
										
										$inputAttrName.data('allcheck', false);
									}
								}
							}
						}
					}, //objChecked.end 		
					checkLimit : function(current){// 안드로이드 오류 확인 필요.
						var limitSum = Number($this.data('limit'));
					
						if (limitSum > 0) {
							if (limitSum === $('input[name="' + inputName + '"]:checked').length) {
								$('input[name="' + inputName + '"]:not(:checked)').prop('disabled', true);
								$inputName.addClass('off');
								$('.' + inputName + '.on').removeClass('off');
							} else {
								if (!$(current).prop('disabled')) {
									$('input[name="' + inputName + '"]').removeProp('disabled');
									$inputName.removeClass('off');
								}
							}
						}
					}, //checkLimit.end
					eventHandle : function(){
						$this.off('click.uxInput').on('click.uxInput', function(){
							var current = this;
							allevent = ($(this).hasClass('input_all'));
							
							$this.addClass('focus');
							app.objChecked(allevent);
							//app.checkLimit(current);
						});
						$this.off('focus.uxInput').on('focus.uxInput', function(){
							$label.addClass('focus');
							$this.addClass('focus');
						});
						$this.off('blur.uxInput').on('blur.uxInput', function(){
							$this.removeClass('focus');
							$('.label_radio, .label_checkbox').removeClass('focus');
						});
					} //eventHandle.end
				}
			app.init();
		});
	}
});//####################// 5.uxInput ####################

$.fn.extend({//#################### 5-1.uxValueDel ####################
	uxValueDel : function(){
		console.log("uxValueDel(): 인풋value삭제");
		
		var defaults = {
				delStr : "입력내용 삭제"
			},
			opt = $.extend(defaults, opt);
		
		return this.each(function(){
			var $this	= $(this),
				delId		= 'del_' + uniqueId(),
				delStr	= opt.delStr,
				target,
				btn,
				$delBtn,
				btndel_time;
			
			var app = {
				init : function(){
					if($this.attr("type")=="checkbox" || $this.attr("type")=="radio"){//20191030 적용시 radio와 checkbox는 예외처리
						return false
					}
					if (!$this.parent('.inp_wrap').length) {
						if ($this.parent('span').length) {
							$this.parent('span').addClass('inp_wrap');
						}//$this.wrap('<div class="inp_wrap"></div>');
					}
					
					$this.data('del-txt', delId);
					app.eventHandle();
				}, //init.end
				delCheck : function(target){
					var $target = $(target);
					
					btn = '<button type="button" tabindex="-1" aria-hidden="true" del-button="' + delId + '">'+delStr+'</button>';
					(!!$target.val()) ? app.delShow(target) : app.delHide() ;
					$delBtn = $('button[del-button="' + delId + '"]');
				}, //delCheck.end
				delShow : function(target){
					var $target = $(target),
						tW = $target.outerWidth();
					
					($('button[del-button="' + delId + '"]').length < 1) ? $(btn).css('display', 'none').insertAfter($target) : '';
					$target.addClass('del_on').css({ width : tW, paddingRight : 30});
					
					$delBtn = $('button[del-button="' + delId + '"]');
					$delBtn.stop().fadeIn(0);
					$delBtn.on('click', function(){
						$this.val('').focus();
						$target.trigger('change');// 20160720 개발요청 트리거 추가
						$(this).fadeOut(0, function(){
							$(this).remove();
						});
					});
				}, //delShow.end
				delHide : function(){
					(!!$delBtn) ? $delBtn.remove() : '';
					$this.removeClass('del-on').removeAttr('style');
				}, //delHide.end
				delTime : function(target){
					var $target = $(target),
						data_id = $target.data('del-txt');
					btndel_time = setTimeout(function() {
						$('button[del-button="'+ data_id +'"]').remove();
						$(target).data('val', false).removeClass('del_on').removeAttr('style');//20191030 타겟 수정, asis: $('input.del_on')
					},150);
				}, //delTime.end
				eventHandle : function(){
					$this.on('focus keyup', function() {
						target = this;
						app.delCheck(target)
					}).on('focusout', function(){
						target = this;
						app.delTime(target);
					});
				}//eventHandle.end
			}
			if (!$this.data('overlap-valuedelete')) {
				$this.data('overlap-valuedelete', true);
				app.init();
			}
		});
	}					
});//####################// 5-1.uxValueDel ####################

var uxScrollViewLength = 0;
$.fn.extend({//#################### 6.fxScrollView ####################
	uxScrollView : function(opt){
							
		if(uxScrollViewLength < 1){ //콘솔 출력을 위한 window객체니 실사용시 삭제
			console.log("uxScrollView(): 스크롤바");
		}
		uxScrollViewLength ++; //콘솔 출력을 위한 window객체니 실사용시 삭제.end
		
		var defaults = {
			duration: 600,
			speedLimit: 1.2,
			moveThreshold: 100,
			offsetThreshold: 30,
			startThreshold: 5,
			acceleration: 0.1,
			accelerationT: 250,
			watch: true,
			watchInterval: 400,
			preventScroll: true,
			startPosY : 20
		}
		var opt = $.extend(defaults,opt);
		
		return this.each(function(){
			var $this =  $(this),
				$wrapper = $this.find('.ui_scrollarea'), 
				$scroller = $this.find('.ui_scrollarea .ui_content'),
				$vscrollbar = $this.find('.ui_scrollbar');
			
			var app={
				init: function(){
					
					this.maxScrollY = 0;
					this.scrollHeight = 0;
					this.wrapperHeight = 0;
					this.visibleScroll = false;
					
					if ($vscrollbar.size() === 0) {// 스크롤바가 없으면 자동 생성해 준다.
						//$vscrollbar = $('<div class="scroll ui_scrollbar"><span class="bg_mid"></span></div>'); //asis
						$vscrollbar = $('<div class="scroll ui_scrollbar">' +
								'<span class="bg_top"></span><span class="bg_mid"></span>' +
								'<span class="bg_btm"></span></div>'); //2019202 위 아래 el가 있어야 토글등 사이즈변화시 ".bg_mid"의 위치 오류가 없음
						$this.append($vscrollbar);
					}
					
					this.scrollbarStyle = $vscrollbar[0].style;
					this.scrollbarStyle.display = 'none';
					var $inner = $vscrollbar.find('span.bg_mid');
					if ($inner.length) {
						this.scrollbarInnerStyle = $inner[0].style;
						this.scrollbarInnerStyle.paddingBottom = 0;
					}
					
					$this.attr('tabindex', 0);
					app._bindEvents();
				},
				
				_bindEvents: function () {
					var $this = this;
					
					if ($vscrollbar.size()){
						$wrapper.on('scroll', function () {
							var rate = ($this.wrapperHeight - $this.scrollbarHeight) / ($this.scrollHeight - $this.wrapperHeight);
							$this._moveScrollbar($wrapper[0].scrollTop * rate);
						});
						
						if (opt.watch === true) { //사이즈 변화 감시
							var totalTime = 0, dur = opt.watchInterval;
							$this.updateTimer = setInterval(function () {// 40초에 한번씩 dom에서 제거 됐건지 체크해서 타이머를 멈춘다.
								if (totalTime > 40000) {
									totalTime = 0;
									if (!$.contains(document, $wrapper[0])) {
										clearInterval($this.updateTimer);
										$this.updateTimer = null;
										return;
									}
								} else {
									totalTime += dur;// console.log(totalTime);
								}
								$this.update();//console.log("업데이트");
							}, dur);
						} //사이즈 변화 감시.end
                	}
                }, //_bindEvents.end
                  
  				_watchStart: function(){
  					var $this = this;
				},
				
				/**
				* pc에서 상하키로 스크롤할 수 있도록 바인딩
				* @private
				*/
				_bindKeys: function () {
					//var $this = this; //20191202 제거
					
					//$wrapper.on('keydown', function (e) {//asis
					$this.on('keydown', function (e) {//20191202  대상 element를 수정
					var keyCode = e.keyCode || e.which,
						wrapperHeight = $wrapper.innerHeight(),
						scrollTop = $wrapper.prop('scrollTop'),
						maxScrollY = $wrapper.prop('scrollHeight') - wrapperHeight,
						newY;
					
					switch (keyCode) {
						case 38: // up
							e.preventDefault();
							if (scrollTop <= 0) {
								return;
							}
							newY = scrollTop - wrapperHeight;//console.log("업");
							break;
						case 40: // down
							e.preventDefault();
							if (scrollTop >= maxScrollY) {
								return;
							}
							newY = scrollTop + wrapperHeight;//console.log("다운");
							break;
						default:
							return;
					}
					if (newY) {
						$wrapper.stop(true, false).animate(
							{scrollTop: newY},
							{duration: opt.duration});
						}
					});
				},
				
				/**
				* pc에서 스크롤바로 컨텐츠를 스크롤할 수 있도록 바인딩
				* @private
				*/
				_bindScrollbar: function () {
					var $this = this,
					$doc = $(document),
					//isTouch = SSCA.swipeAble,
					isTouch = support.awse.swipeAble, //awse의 browserCheck()내의 support.awse.swipeAble을 사용해야함
					currY, downY, moveY;
					
					function getY(e){
						if (isTouch && e.originalEvent.touches) {
							e = e.originalEvent.touches[0];
						}
						return e.pageY;
					}
					
					$vscrollbar.on('mousedown touchstart', function (e) {
						e.preventDefault();
						if (isTouch) {
							e.stopPropagation();
						}
						
						$this.isMouseDown = true;
						currY = $vscrollbar.position().top;
						downY = getY(e);
						
						$doc.on('mouseup.' + $this.cid + ' mousecancel.' + $this.cid +
							' touchend.' + $this.cid + ' mousemove.' + $this.cid +
							' touchmove.' + $this.cid + ' touchcancel.' + $this.cid, function (e) {
							if (!$this.isMouseDown) {
								$doc.off('.' + $this.cid);
								return;
							}
							
							switch (e.type) {
								case 'mouseup':
								case 'touchend':
								case 'mousecancel':
								case 'touchcancel':
								$this.isMouseDown = false;
								if (!$this.isScrollbarActive) {
									$vscrollbar.removeClass('active');
								}
								moveY = 0;
								$doc.off('.' + $this.cid);
									break;
								case 'mousemove':
								case 'touchmove':
									moveY = getY(e);
									
									var top = currY - (downY - moveY),
										scrollHeight = $this.wrapperHeight - $this.scrollbarHeight,
										y;
									$this.scrollbarStyle.top = (top = Math.max(0, Math.min(top, scrollHeight)));
									y = ($this.scrollHeight - $this.wrapperHeight) * (top / scrollHeight);
									$wrapper.scrollTop(y);
									e.preventDefault();
									break;
							}
						});
						return false;
					}).on('mouseenter mouseleave', function(e) {
						$this.isScrollbarActive = e.type === 'mouseenter';
						$vscrollbar.toggleClass('active', $this.isScrollbarActive || $this.isMouseDown);
					});
				},//_bindEvents.end
				
				/**
				* pc에서 마우스로 스크롤할 수 있도록 바인딩
				* @private
				*/
				_bindWheel: function () {
					var $this = this;
					$wrapper.on('mousewheel DOMMouseScroll wheel', function (ev) {
						var e = ev.originalEvent;
						var delta     = app.getDeltaY(e) * 100,
							scrollTop = $wrapper[0].scrollTop;
						
							$wrapper.scrollTop(scrollTop - delta); // -: down +: up
						if (opt.preventScroll) {
							ev.preventDefault();
							ev.stopPropagation();
						} else {
							if ($wrapper[0].scrollTop != scrollTop) {
								ev.preventDefault();
								ev.stopPropagation();
							}
						}
					});
				},
				
				/**
				* 휠이벤트의 deltaY 추출(위로: 1, 아래로: -1)
				* @param {jQuery#Event}
				* @return {number} deltaY
				* @example
				* $el.on('mousewheel DOMMouseScroll wheel', function (e) {
				*     var deltaY = scui.util.getDeltaY(e);
				* });
				*/
				getDeltaY: function (e) {
					return this.getWheelDelta(e).y;
				},
				
				/**
				* 휠이벤트의 deltaX, deltaY 추출(상: 1, 하: -1, 우: 1, 좌: -1)
				* @param {jQuery#Event}
				* @return {{x:number, y:number}}
				* @example
				* $el.on('mousewheel DOMMouseScroll wheel', function (e) {
				*     var delta = scui.util.getWheelDelta(e);
				*     // delta.x;
				*     // delta.y;
				* });
				*/
				getWheelDelta: function (e) {
					var wheelDeltaX, wheelDeltaY;
					
					e = e.originalEvent || e;
					if ( 'deltaX' in e ) {
						if (e.deltaMode === 1) {
							wheelDeltaX = -e.deltaX;
							wheelDeltaY = -e.deltaY;
						} else {
							wheelDeltaX = -e.deltaX;
							wheelDeltaY = -e.deltaY;
						}
					} else if ( 'wheelDeltaX' in e ) {
						wheelDeltaX = e.wheelDeltaX;
						wheelDeltaY = e.wheelDeltaY;
					} else if ( 'wheelDelta' in e ) {
						wheelDeltaX = wheelDeltaY = e.wheelDelta;
					} else if ( 'detail' in e ) {
						wheelDeltaX = wheelDeltaY = -e.detail;
					} else {
						wheelDeltaX = wheelDeltaY = 0;
					}
					return {
						x: wheelDeltaX === 0 ? 0 : (wheelDeltaX > 0 ? 1 : -1),
						y: wheelDeltaY === 0 ? 0 : (wheelDeltaY > 0 ? 1 : -1)
					};
				},
				
				/**
				* 스크롤바를 움직여주는 함수
				* @param top
				* @param height
				* @private
				*/
				_moveScrollbar: function (top, height) {
					var $this = this;
					
					if (!$this.visibleScroll) { return; }
					if (isNaN(top)) { top = 0; }
					if (height !== undefined && $this.scrollbarHeight != height) {
						height = Math.max(height, 18);
						if ($this.scrollbarInnerStyle){
							var roundSize = $vscrollbar.children().eq(0).height();
							$this.scrollbarInnerStyle.top = roundSize + 'px';
							$this.scrollbarInnerStyle.bottom = roundSize + 'px';
						}
						$this.scrollbarStyle.height = height+'px';
						$this.scrollbarHeight = height;
					} else {
						height = $this.scrollbarHeight;
					}
					if ($this.wrapperHeight < height + top) {
						top = $this.wrapperHeight - height;
					} else {
						$this.scrollbarStyle.top = top + 'px';
					}
				},
				
				/**
				* 사이즈 변화에 따른 UI 갱신
				*/
				update: function (){
					var $this = this,
						wrapperHeight, scrollHeight, visibleScroll, scrollbarHeight, rate;
					
					wrapperHeight = $wrapper[0].offsetHeight;
					if (wrapperHeight === 0){
						$this.wrapperHeight = 0;
						return;
					}
					
					scrollHeight = $wrapper[0].scrollHeight;
					visibleScroll = wrapperHeight < scrollHeight - 1;
					if (visibleScroll && !app._bindedEventOver) {
						app._bindedEventOver = true;
						// 실질적으로 컨텐츠가 래퍼를 오버했을 때만 스크롤을 붙인다.
						if (isMobile) {
							//app._bindContentScroll();
							// scard.log.debug('t');
							return;
						} else {
							// scard.log.debug('e t');
							app._bindScrollbar();
							app._bindKeys();
							app._bindWheel();
						}
					}
					// 영역보다 내용이 작을 경우 스크롤바 감추기
					this.scrollbarStyle.display = visibleScroll ? '' : 'none';
					
					if (visibleScroll !== $this.visibleScroll) {
						$this.visibleScroll = visibleScroll;
						// $this.toggleClass('strack', visibleScroll);
					}
					if (visibleScroll && (scrollHeight !== $this.scrollHeight || wrapperHeight !== $this.wrapperHeight)) {
						$this.wrapperHeight = wrapperHeight;
						$this.scrollHeight = scrollHeight;
						$this.scrollRate = wrapperHeight / scrollHeight;
						rate = ($this.wrapperHeight - $this.scrollbarHeight) / ($this.scrollHeight - $this.wrapperHeight);
						$this._moveScrollbar($wrapper[0].scrollTop * rate, wrapperHeight * $this.scrollRate);
					}
				},
				
				/**
				* scrollTop 설정
				* @param top
				* @returns {*}
				*/
				scrollTop: function (top) {
					var $this = this;
					if (arguments.length > 0) {
						$wrapper.scrollTop(top);
						$this.update();
					} else {
						return $this.$wrapper.scrollTop();
					}
				},
				
				release: function () {
					var $this = this;
					
					$this.updateTimer && (clearInterval($this.updateTimer), $this.updateTimer = null);
					$this.supr();
				}
			}
			app.init();
		});
	}
});//####################// 6.uxerScrollView ####################

var uxAccodianLength = 0;
$.fn.extend({//#################### 7.uxAccodian ####################
	uxAccodian : function(opt){
		
		if(uxAccodianLength < 1){ //콘솔 출력을 위한 window객체니 실사용시 삭제
			console.log("uxAccodian(): 아코디언");
		}
		uxAccodianLength ++; //콘솔 출력을 위한 window객체니 실사용시 삭제.end		
		
		var defaults = {
			toggleCont : false,     // true 전체 닫힘 상태,
			className : 'acco',     //class name class="acco_box"
			baseView : false,       // 1,2,3....., all 전체 열림, false 전체닫힘
			btnText : ["열기","닫기"], //토글상태에 따른 버튼 텍스트
			contFocus : false, // 컨텐츠 자동 포커스 이동
			slideSpeed : 300, // 슬라이드 속도
			inputCheck : true // 체크박스에 대한 접근성 처리
		}
		var opt = $.extend(defaults,opt);
		
		return this.each(function(){
			var $this		= $(this),
				className	= opt.className,
				$wrap		= $this.find('.'+ className + '_wrap'),
				$tit			= $wrap.children('.'+ className + '_tit'),
				$cont			= $wrap.children('.'+ className + '_cont'),
				$btn			= $tit.children('button'),
				btnText		= opt.btnText,
				contFocus	= opt.contFocus,
				slideSpeed	= opt.slideSpeed,
				txt				= $btn.text(),
				$btnTxt		= $btn.children('span').text(), //버튼내  span 상태 텍스트
				toggleCont	= opt.toggleCont,				
				baseView	= opt.baseView,
				inputCheck	= opt.inputCheck;
			
			var app = {
				init: function(){
					$btntxt = $tit.find('button span');
					$btntxt.text(btnText[0]);//디폴트 버튼 상태를 "열기"로 설정함
					
					if (!!baseView) { //baseView일때
						if (baseView === 'all') { //baseView: all 일때
							$cont.show();
							$wrap.data('cont-toggle', true).addClass('on');
							$btnTxt = $wrap.find('> .acco_tit button span').text(btnText[1]); //baseView를 all로 load하기때문에 "닫기"로 상태변경
						} else { //baseView: all이 아닐때
							$wrap.data('cont-toggle', false).removeClass('on');
							$cont.hide();
							
							var $btntxt;
							
							if(!baseView[1]) { //baseView[1]일때
								$wrap.data('cont-toggle', false);
								$wrap.eq(baseView - 1).data('cont-toggle', true).addClass('on').find('> .acco_tit button').data('selected', true);
								$wrap.eq(baseView - 1).children('.acco_cont').show();
								
								$btntxt = $wrap.eq(baseView - 1).find('> .acco_tit button span');
								$btntxt.addClass('on');
								$btntxt.text(btnText[1]); //baseView를 all로 load하기때문에 "닫기"로 상태변경
								//console.log("!baseView[1] 일때 : "+$btntxt.text());
							} else { //!baseView[1] 아닐때
								var viewLen = baseView.length,
									i= 0;
								$wrap.data('cont-toggle', false);
								for (i; i < viewLen; i++) {
									$wrap.eq(baseView[i] - 1).data('cont-toggle', true).addClass('on').find('> .acco_tit button').data('selected', true);
									$wrap.eq(baseView[i] - 1).children('.acco_cont').show();
									$btntxt = $wrap.eq(baseView[i] - 1).find('> .acco_tit button span');
									$btntxt.addClass('on');
									$btntxt.text(btnText[1]); //baseView를 all로 load하기때문에 "닫기"로 상태변경
									//console.log("!baseView[1] 아닐때 : "+$btntxt.text());
								}
							}
						}
					} else { //baseView 아닐때 나머지에 대한 처리
						$wrap.data('cont-toggle', false).removeClass('on');
						$cont.hide();
					}
					app.eventHandler();
					if(inputCheck){//체크박스가 있을때
						app.inputCheck();	
					}
				}, //init.end
				inputCheck: function(current){
					var inputUsed = $wrap.find("input").length;
					if (inputUsed){ //console.log("인풋처리:" + inputUsed);
						var agreeTxt = $tit.find("label").text();
						var BtnTxt = $tit.find("button").html();					
						$tit.find("button").html(agreeTxt + BtnTxt);
						$tit.addClass("inputed");
					}
				}, //inputCheck.end
				accordion: function(current){
					var $current_btn	= $(current),
						$current_tit		= $current_btn.parent('.'+ className + '_tit'),
						$current_wrap	= $current_tit.parent('.'+ className + '_wrap'),
						$current_cont	= $current_wrap.children('.'+ className + '_cont'),
						$cWraps			= $current_wrap.siblings('.'+ className + '_wrap'),
						$cCont			= $current_cont.find('.'+ className + '_cont'),
						$cWrap			= $current_cont.find('.'+ className + '_wrap');
					
					var $this = $(this),
						$wrap = $(current).closest('.'+className+'_wrap').children('.'+className+'_cont'),
						$wrapParent = $(current).closest('.'+className+'_wrap'),
						sc_top= 0;					
					
					if ($current_wrap.data('cont-toggle') === false) {
						if (toggleCont) { //toggleCont일때
							$cWraps.find('.accoin_tit button').removeClass('on').data('btn-open',false);
							$cWraps.data('cont-toggle', false).removeClass('on').find('.'+ className + '_cont').stop().slideUp(slideSpeed);
							$cCont.stop().slideUp(slideSpeed);
							$cWrap.data('cont-toggle', false).removeClass('on');
							$(current).addClass('on');
						}
						
						$current_cont.stop().slideDown(slideSpeed,function(){
							if(contFocus){//자동포커스 옵션일때
								//actopen();
								
		    					if($('html').hasClass('ios')){ //ios접근성 추가 20201105
		    						$wrap.find('a, button').eq(0).focus();
		    					}else{
		    						$wrap.attr('tabIndex',0).focus();
		    					} //ios접근성 추가.end								
								
								sc_top = $wrapParent.offset().top;
								app.scrollMove(sc_top);								
							}
						});
						$current_wrap.data('cont-toggle', true).addClass('on');
					} else {
						$current_cont.stop().slideUp(slideSpeed,function(){
							/* 닫을때는 포커싱을 하지 않는것을 추천
							if(contFocus){//자동포커스 옵션일때		
								sc_top = $current_tit.offset().top;								
								app.scrollMove(sc_top);								
							}*/
						});
						$current_wrap.data('cont-toggle', false).removeClass('on');
					}
				}, //accordion.end
				scrollMove : function(sc_top){//contFocus일때 페이지 스크롤처리
					$('html, body').stop().animate({scrollTop : sc_top});
				},
				eventHandler: function(){
					$btn.off('click.acco').on('click.acco', function(e){//버튼 클릭시
						e.preventDefault();
						var current = this,
							$this = $(this),
							$thisStatus = $(current).closest('.'+className+'_wrap').find('.'+className+'_tit span');
						
						if($this.closest('.'+className+'_wrap').hasClass('on')){//false: 열린상태
							$thisStatus.text(btnText[0]);
						}else{//true: 닫힌 상태
							$thisStatus.text(btnText[1]);
						}//console.log($thisStatus.text());
						
						app.accordion(current);
						
						$('.'+className+'_cont').removeAttr('tabindex');
					});
				}, //eventHandler.end
			}
			app.init();
		});
	}
});//####################// 7.uxAccodian ####################

var uxSelectLength = 0;
$.fn.extend({//#################### 7.uxSelect ####################
	uxSelect : function(opt){//셀렉트 박스 디자인 -start
		
		if (isMobile) {//데스크탑일때만  처리
			return false;
		}
	
		if(uxSelectLength < 1){ //콘솔 출력을 위한 window객체니 실사용시 삭제
			console.log("uxSelect(): 셀렉트 박스");
		}
		uxSelectLength ++; //콘솔 출력을 위한 window객체니 실사용시 삭제.end
		
		var defaults = {
			ieVer : ie,
			mobile : browser.mobile,
			fullsize : true,
			disable : false,
			scrollView : true ,//스크롤뷰 사용시 true
			optHeight : 33//옵션 높이
		},
		opt = $.extend(defaults,opt);
		
		return this.each(function(){
			var $this		= $(this),
				selectId		= $this.attr('id'),
				scrollView	= opt.scrollView;//스크롤뷰 사용시
				
				if (!selectId)  {//id 없으면 id 생성
					selectId = 'ui_select_' + uniqueId();
					$this.attr('id', selectId);
				}
				
				var cloneClass		= $this.data('clone-class'),
					classCopy		= $this.attr('class'),
					selectT			= $this.attr('title'),
					$option			= $this.children('option'),
					optionSum		= $option.length,
					optionTxt		= '',
					optionVal		= '',
					optionSel		= '',
					optionDsb		= '',
					btnDisabled		= '',
					classOn			= '',
					selectW			= $this.outerWidth(),
					cloneId			= selectId + '_clone',
					ieVer				= opt.ieVer,
					disable			= opt.disable,
					fullsize			= opt.fullsize,
					
					$thisClone		= $('#' + cloneId),
					$selectUl		= $thisClone.children('.sel_div'), // selectbox
					$button			= $thisClone.children('button'),
					$selectLi			= $selectUl.children('.opt'),// option
					$btnOption		= $selectLi.find('button'),
					optH				= $btnOption.outerHeight(),
					liSum				= $selectLi.length,
					$optionEq,
					ulH				= opt.optHeight,
					optLen,
					cloneW;
				
					var app = {
						init : function(){
							$this.data('disable', disable);
							$thisClone.remove();
							
							(!selectT) ? selectT = '' : '';
							(!!cloneClass) ? cloneW = '100%;' : cloneW = selectW + 'px' ;
							(!cloneClass) ? cloneClass = '' : '';
							(!classCopy) ? classCopy = '' : '';
							
							var scrollDiv='';							
							if(scrollView){//스크롤뷰 사용시
								scrollDiv = '<div class="ui_scrollview"><div class="ui_scrollarea"><div class="ui_content">'+
            						//스크롤뷰 컨텐츠
            						'</div></div></div>';
                            }
                        	$('<div class="select_clone hidden ' + cloneId + ' ' + cloneClass + ' " id="' + cloneId + '"><button type="button" class="clone" title="' + selectT + ' 선택하세요">선택 <span class="hide">선택됨</span></button>'+
                        			'<div class="sel_div">'+scrollDiv+'</div>'+
                        		'</div>').insertBefore($this); //scroll box 생성:
                            
                            ($this.hasClass('size_s')) ? $('#' + cloneId).addClass('size_s') : '';

                            while (optionSum--) {
                                $optionEq = $option.eq(optionSum)
                                optionTxt = $optionEq.text();
                                optionVal = $optionEq.prop('value');
                                optionDsb = $optionEq.prop('disabled');
                                optionSel = $optionEq.prop('selected');

                                (optionSel === true) ? classOn = 'on' : classOn = '';
                                (optionDsb === true) ? btnDisabled = 'disabled="disabled"' : btnDisabled = '';
                                                               
                                if(scrollView){ //option 생성: 스크롤뷰 사용시
                                	$('#' + selectId + '_clone .sel_div .ui_content').prepend('<span class="opt ' + classOn + '"><button type="button"  class="clone"  ' + btnDisabled + ' value="' + optionVal + '"><span>' + optionTxt + '</span></button></span>'); //.sel_div.opt
                                	
                                }else{//option 생성: 일반스크롤 사용시
                                	$('#' + selectId + '_clone .sel_div').prepend('<span class="opt ' + classOn + '"><button type="button"  class="clone"  ' + btnDisabled + ' value="' + optionVal + '"><span>' + optionTxt + '</span></button></span>'); //.sel_div.opt	
                                }                                
                            };

                            // clone select local var
                            $thisClone		= $('#' + cloneId),
                            $selectUl		= $thisClone.children('.sel_div'); // selectbox
                            $button			= $thisClone.children('button'); 
                            //$selectLi			= $selectUl.children('.opt'); 
                            $selectLi			= $selectUl.find('.opt'); //option
                                                        
                            $btnOption		= $selectLi.children('button');
                            optH				= ulH;//사이즈를 옵션에서 조정
                            optLen			= $selectLi.length;
                            
                          	//$thisClone.children('button').html('<span>' + $selectUl.children('.opt.on').text() + '</span>');
                          	$thisClone.children('button').html('<span>' + $selectUl.find('.on').text() + '</span>');
                            
                            // disabled 값이 있거나 disabled 설정했을때 disabled 처리
                            if($this.prop('disabled') || $this.data('disable') === true){
                                $thisClone.addClass('disabled');
                                $btnOption.prop('disabled', true);
                            }

                            (optH === 0) ? optH = ulH : ''; //1개일때 사이즈 조정
                            if( (optLen < 2) ){        							
                            	ulH = ulH;
                            } else if( optLen > 1 && optLen < 5 ){
    	                        ulH = (optH * optLen);// + 5
                            } else{
    	                        ulH = (optH * 5);// + 5 ;
                            }

                            $('#' + selectId + '_clone .sel_div').css('height',ulH  );
                            $('#' + cloneId).removeClass('hidden');
                            
                            if(scrollView){//스크롤뷰 플러그인 처리
    	                        $thisClone.find('.ui_scrollview').height(ulH);
    	                        $('.ui_scrollview').uxScrollView();                            	
                            }

                            $this.hide();
                            app.eventHandle();
                        },
                        position : function(){
                            var ps = $thisClone.offset().top,
                                st = $(document).scrollTop(),
                                wH =$(window).height();

                            if ((wH + st) - (ps + ulH + optH + 40) < 0) {
                                $thisClone.find('.sel_div').removeClass('ps_top').addClass('ps_btm');
                            } else {
                                $thisClone.find('.sel_div').removeClass('ps_btm').addClass('ps_top');
                            }
                        },
                        eventHandle : function(){
                            $button.on({
                                click : function(){
                                    if ($this.data('disable') === true) {
                                        return;
                                    }
                                    app.position();
                                    $selectUl.css('display', 'block');
                                    if ($thisClone.hasClass('focusOn')){
                                        $thisClone.removeClass('focusOn focusOver');
                                        $this.css('z-index', 0);
                                    } else {
                                        $thisClone.addClass('focusOn');
                                        $this.css('z-index', 100);
                                    }
                                },
                                mouseleave : function(){
                                    ($thisClone.hasClass('focusOn')) ? $thisClone.addClass('focusOut') : '' ;
                                }
                            });

                            ($this.prop('disabled')) ? $button.off() : ''; // disabled 처리
                            /*
                            if($this.attr('disabled')){//disabled 처리
                            	$('#' + cloneId).children('button').attr('disabled', true);
                            }*/                            

                            $btnOption.on({
                                click : function(){
                                    var $btnOption  = $(this),
                                        selectTxt   = $btnOption.text();

                                    $btnOption.parent().addClass('on').siblings().removeClass('on');

    	                            //ux15 ie버튼 눌림 제거 위해 span태그 추가
                                    $thisClone.children('button').html('<span>' + selectTxt + '</span><span class="hide">선택됨</span>').focus();
                                    $selectUl.css('display', 'none');
                                    $('.select_clone').removeClass('focusOn focusOver');
                                    var buttonIdx = $btnOption.parent().index();

                                    $option.prop('selected', false);
                                    $option.eq(buttonIdx).prop('selected', true);

                                    // change event
                                    $option.eq(buttonIdx).change();
                                    /*
                                    var selOnchange = null;
                                    if ($this.attr('onchange')) {
                                        selOnchange = $this.attr('onchange');
                                    }
                                    if (selOnchange) {
                                        $option.eq(buttonIdx).change();
                                    }
                                    */
                                },
                                focus : function(){
                                    $thisClone.addClass('focusOn focusOver');
                                },
                                blur : function(){
                                    $thisClone.removeClass('focusOn focusOver');
                                }
                            });
                            $(document).off('click.select').on('click.select', function(){
                                $('.focusOut').removeClass('focusOn focusOut');
                            });
                           
                        }
                    }
                    app.init(); //console.log(cloneId +' : '+ ieVer +' : '+disable +' : '+fullsize);
                });
            }//셀렉트 박스 디자인 - end
	
});//#################### 7.uxSelect.end ####################

}(jQuery));//0.end

var uxer = {//공통 처리
	'init' : function() {
		$(window).uxAgent();	 //Agent 체크
		
	}
}

uxer.init();