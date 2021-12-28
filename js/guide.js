
/**  header Element **/
var headHtml = ''; //header inner HTML
	headHtml += '<header class="ui">';
	headHtml += '	<div class="nav_lay">';
	headHtml += '		<a href="index.html" class="logo">';
	headHtml += '			<h1><img src="img/logo.svg" alt="UXTRY"></h1>';
	headHtml += '		</a>';
	headHtml += '		<nav>';
	headHtml += '			<a href="index.html">Basic</a> <a href="module_layer.html">Module</a> <a href="operation.html">Operation</a> <a href="etc.html">Etc</a>';
	headHtml += '		</nav>';
	headHtml += '	</div>';
	headHtml += '</header>';

var subHtml_module = ''; //subHtml_module inner HTML
	subHtml_module += '<section class="subnav">';
	subHtml_module += '	<nav>';
	subHtml_module += '		<a href="module_layer.html">Layer Popup</a> <a href="module_tip.html">Tooltip</a> <a href="module_selectbox.html">SelectBox</a> <a href="module_scroll.html">Scroll View</a>';
	subHtml_module += '		<a href="module_toggle.html">Accodian</a> <a href="module_form.html">Input Type</a>';
	subHtml_module += '	</nav>';
	subHtml_module += '</section>';

var subHtml_oper = ''; //subHtml_etc inner HTML
	subHtml_oper += '<section class="subnav">';
	subHtml_oper += '	<nav>';
	subHtml_oper += '		<a href="operation.html">기간 예약 설정</a>';
	subHtml_oper += '		<a href="operation_chat.html">대화형 상품안내</a>';
	subHtml_oper += '		<a href="operation_bnr.html">콜센터 노출배너</a>';
	subHtml_oper += '		<a href="operation_loading.html">마케팅용 로딩</a>';	
	subHtml_oper += '		<a href="operation_evlist.html">이벤트 목록 썸네일화</a>';
	subHtml_oper += '		<a href="operation_price.html">시세 조회</a>';
	subHtml_oper += '		<a href="operation_ratecal.html">할부금액 계산</a>';
	subHtml_oper += '		<a href="operation_picslider.html">프로모션 슬라이더</a>';	
	subHtml_oper += '	</nav>';
	subHtml_oper += '</section>';

var subHtml_etc = ''; //subHtml_etc inner HTML
	subHtml_etc += '<section class="subnav">';
	subHtml_etc += '	<nav>';
	subHtml_etc += '		<a href="etc.html">일반</a>';
	subHtml_etc += '		<a href="etc_ani.html">애니메이션</a>';
	subHtml_etc += '		<a href="etc_icn.html">아이콘 Slice</a>';
	subHtml_etc += '		<a href="etc_svg_viwer.html">이미지 뷰어</a>';	
	subHtml_etc += '		<a href="etc_svg_matrix.html">SVG ColorMatrix</a>';
	subHtml_etc += '		<a href="etc_localst.html">localStorage Memo</a>';
	subHtml_etc += '		<a href="etc_video.html">Video Player</a>';
	subHtml_etc += '		<a href="etc_jogdial.html">Jog Dial</a>';	
	subHtml_etc += '		<a href="etc_svg.html">SVG Guide</a>';
	subHtml_etc += '		<a href="etc_aria.html">Wai-Aria</a>';		
	subHtml_etc += '	</nav>';
	subHtml_etc += '</section>';

var listViewHtml = '';
	listViewHtml += '<button class="icn_top"><i class="icn"></i></button>';
	listViewHtml += '<div class="project_gude">';	
	listViewHtml += '	<button class="project" onclick="project_open()"><span>Project Guide </span></button>';
	listViewHtml += '	<button class="site1" onclick="site_open1()"><span>iocust</span></button>';
	listViewHtml += '	<button class="site2" onclick="site_open2()"><span>shop UX</span></button>';	
	listViewHtml += '</div>';
	
function project_open(){
	window.open("project_guide/project_list.html");
}
function site_open1(){
	window.open("iocust/");
	//alert("준비중, try!");
}
function site_open2(){
	window.open("viewjs/view1.html");
	//alert("준비중, try!");
}
		
/**  header Element.end **/
	
/**  cookie Element **/	
var ckSkin = '', //design skin
	ckInvert = '', //invert in skin
	ckHueNum = 0; //hueNumber colorizing
	ckInverHueNum = ckHueNum - 180; //invert hueNumber colorizing(인버트된 hue값은 -180일때 정상임, 360도면 제자리)

//console.log("▶ document.cooki = ckSkin: "+ckSkin +", ckInvert: "+ckInvert + ", ckHueNum:"+ckHueNum); // 1. 쿠키에 대한 값이 없다..아래 쿠키값을 읽기전까지는

var isIE = false || !!document.documentMode; //console.log(isIE); ie를 탐지해서 걸러낸다..
var isEdge = (navigator.userAgent.indexOf("Edg") != -1); 


if(window.location.href.indexOf("file:") > -1 && isIE	){//로컬인데 ie로 실행
	alert('익스플로어 로컬(c:/)은 storage작동이 불가하오니 \n익스플로어를 웹서버(http://localhost)나 \n크롬 브라우저로 실행해주세요');	
}
if(window.location.href.indexOf("file:") > -1 && isEdge ){//로컬인데 ie 엣지로 실행
	alert('익스플로어 로컬(c:/)은 storage작동이 불가하오니 \n익스플로어를 웹서버(http://localhost)나 \n크롬 브라우저로 실행해주세요');	
}

if(window.location.href.indexOf("file:") > -1 && isIE	){//로컬인데 ie로 실행해???? 심하네
	ckSkin = 'view', //design skin
	ckInvert = 'invert', //invert in skin
	ckHueNum = 0; //hueNumber colorizing
	ckInverHueNum = ckHueNum - 180; //invert hueNumber colorizing(인버트된 hue값은 -180일때 정상임, 360도면 제자리)	
}else if(window.location.href.indexOf("file:") > -1 && isEdge ){//로컬인데 ie 엣지로 실행해???? 심하네
	ckSkin = 'view', //design skin
	ckInvert = 'invert', //invert in skin
	ckHueNum = 0; //hueNumber colorizing
	ckInverHueNum = ckHueNum - 180; //invert hueNumber colorizing(인버트된 hue값은 -180일때 정상임, 360도면 제자리)	
}else{	
	getCookie('view'); //skin mode value load
	getCookie('invert'); //dark mode value load
	getCookie('color'); //dark mode value load	
}
	

//if(ckSkin===''){//first apply Cookie //2. 쿠키값을 읽어봐지만 없다. 처음 방문 확인 후 디폴트 쿠키값을 setCookie로 저장 후 getCookie로 디코딩된 해당값을 변수에 저장하자.

if(ckSkin===null){//first apply Cookie //2. 스토리지값을 읽어봐지만 없다. 처음 방문 확인 후 디폴트 쿠키값을 setCookie로 저장 후 getCookie로 디코딩된 해당값을 변수에 저장하자.
	//setCookie('view','skin','3');//apply skin(text)
	setCookie('view','text','3');//apply skin(text) 20211125 초기값을 스킨에서 텍스트로 지정했다
	setCookie('invert','light','3');//apply light in skin (dark)
	setCookie('color',0,'3');//apply hueNumber (0)
	
	console.log("▶frontUxer visited!");
	
	getCookie('view'); //skin mode value load
	getCookie('invert'); //dark mode value load
	getCookie('color'); //dark mode value load	
}
//console.log("▶ document.cooki = ckSkin: "+ckSkin +", ckInvert: "+ckInvert + ", ckHueNum:"+ckHueNum); //3. 쿠키값을 읽은 후 변수에 값이 저장되었다.
console.log("▶ localStorage = ckSkin: "+ckSkin +", ckInvert: "+ckInvert + ", ckHueNum:"+ckHueNum); //3. 쿠키값을 읽은 후 변수에 값이 저장되었다.

function setCookie(name,value,days){//1.cookie save
	
	/* 쿠키를 쓸때
	var exdate = new Date();
	exdate.setDate(exdate.getDate()+days); //setting date (current date + end date)
	
	var cookieVal = "";
	cookieVal += name + '=' + encodeURIComponent(value) + ';';
	cookieVal += 'Expires=' + exdate.toUTCString() + '';
	
	document.cookie = cookieVal;
	console.log("▶cookieVal: "+cookieVal);
	*/
	
	
	/* 로컬스토리지를 쓸때*/
	//setCookie('view','skin','3');
	localStorage.setItem(name,value); //값을 저장	
	//console.log("▶localStorage: "+localStorage);
		
};//cookie save.end

function getCookie(name){//cookie load
	
	/* 쿠키를 로드 */
//	var cookies = document.cookie.split(';');	
//	for(var i in cookies){
//		if(cookies[i].search(name) != -1){			
//			if(name=='view'){
//				ckSkin = decodeURIComponent(cookies[i].replace(name+"=","").replace(/^\s\s*/,"").replace(/^\s\s*$/,""));
//				if(window.location.href.indexOf("file:///") > -1){//파일클릭으로 접근할때
//					ckSkin = "skin"
//				}
//			}else if(name=='invert'){
//				ckInvert = decodeURIComponent(cookies[i].replace(name+"=","").replace(/^\s\s*/,"").replace(/^\s\s*$/,""));
//			}else if(name=='color'){
//				ckHueNum = decodeURIComponent(cookies[i].replace(name+"=","").replace(/^\s\s*/,"").replace(/^\s\s*$/,""));
//				ckInverHueNum = ckHueNum - 180;
//			}
//		}
//	}
	
	/* 로컬스토리지를 로드*/	
	//localStorage.getItem(name); //값을 저장
	/*
	if(localStorage==undefined){
		alert('익스플로어 로컬(c:/)은 storage작동이 불가하오니 \n익스플로어를 웹서버(http://localhost)나 \n크롬 브라우저로 실행해주세요');
		return false;
	}*/
	
	if(name=='view'){
		ckSkin = localStorage.getItem("view"); //값을 저장
		//console.log(ckSkin);
	}
	if(name=='invert'){
		ckInvert = localStorage.getItem("invert"); //값을 저장
		//console.log(ckInvert);
	}	
	
	if(name=='color'){
		ckHueNum = localStorage.getItem("color"); //값을 저장
		ckInverHueNum = ckHueNum - 180;
		//console.log(ckHueNum);
	}	
	
}//cookie load.emd

/**  cookie Element.end **/

/** layout Initializing **/
//document.body.classList.add('new_mopism');//faste addClass "new_mopism"

$(document).ready(function(){//domtree start
	
	$('body').prepend(headHtml);
	$('.contents').prepend(listViewHtml);	
	
	//###########################################################변수 처리된 쿠키값을 읽고 각 상황에 맞게 페이지에 적용한다.
	//ckSkin: skin / text (string)			ckInvert: light / dark (string)			ckHueNum: number	
	
	//스킨 모드 처리
	var colorHtml = '';
		colorHtml += '<div class="ui_guideline">';
		colorHtml += '	<div class="btn_thema">';
		colorHtml += '		<button type="button" id="guideline" title="View">skin</button>'; 
		colorHtml += '		<button type="button" id="invert_mode" title="Invert">light</button>';
		colorHtml += '	</div>';		
		colorHtml += '	<div class="color_slider">';    
		colorHtml += '		<div class="ui_graph">';
		colorHtml += '			<div class="ui_track" id="ui_tracker" title="Colorize"></div>';		
		colorHtml += '		</div>';
		colorHtml += '	</div>';
		colorHtml += '	<button class="skin_reset"><span></span></button>';
		colorHtml += '	<div class="view_sort">';	
		colorHtml += '		<button class="section"><span>Section View</span></button> <button class="list off"><span>List View</span></button>';
		colorHtml += '	</div>';		
		colorHtml += '</div>';
	$('.contents').prepend(colorHtml);	
	
	if(ckSkin=='skin'){//check skin mode
		skinModeEv();
	}else{//check text mode
		textModeEv();
	}
	


function skinModeEv(){	
	$('body').addClass("new_mopism");
	
	if(ckInvert=='light'){//check Invert none
		$('html').css("filter","invert(0)  hue-rotate("+ckHueNum+"deg)");
		$('.sample_box').css("filter","hue-rotate(-"+ckHueNum+"deg)");
		$('.sample_box_unset').css("filter","hue-rotate(-"+ckHueNum+"deg)");
		$('.ui_loading_sec').css("filter","hue-rotate(-"+ckHueNum+"deg)");
		
		$('html').removeClass("dark");
		$(".ui_guideline button#invert_mode").addClass("on");
		$(".ui_guideline button#invert_mode").text('light');
		
		
	}else{//check Invert "dark"
		$('html').css("filter","invert(1) hue-rotate("+ckInverHueNum+"deg)");
		
		if(ckInverHueNum<0){ //음수일때 
			ckInverHueNum = ckInverHueNum * -1;
			$('.sample_box, .mov_video').css("filter","invert(1) hue-rotate("+ckInverHueNum+"deg)");
			$('.ui_loading_sec').css("filter","invert(1) hue-rotate("+ckInverHueNum+"deg)");
		}else{
			$('.sample_box, .mov_video').css("filter","invert(1) hue-rotate(-"+ckInverHueNum+"deg)");
			$('.ui_loading_sec').css("filter","invert(1) hue-rotate(-"+ckInverHueNum+"deg)");
		}
		
		$('html').addClass("dark");
		$(".ui_guideline button#invert_mode").removeClass("on");
		$(".ui_guideline button#invert_mode").text('dark');			
	}
	
	//$('.ui_guideline #invert_mode').css("display","inline-block");
	//$('.ui_guideline .color_slider').css("display","block");
	
	if($("html").hasClass('ie')){//파일클릭이나 ie일때
		$("#invert_mode").css("display","none");
		$('.ui_guideline .color_slider').css("display","none");
		$('.ui_guideline .skin_reset').css("display","none");
	}else{//파일접근만 아니면 실행
		$('.ui_guideline #invert_mode').stop().fadeIn("fast",function(){
			$('.ui_guideline .color_slider').stop().fadeIn("fast",function(){
				$('.ui_guideline .skin_reset').stop().fadeIn();
			});
		});
	}
	
	$(".ui_guideline button#guideline").text(ckSkin);
	$(".ui_guideline button#guideline").addClass("on");
	
}	
function textModeEv(){
	$('body').removeClass("new_mopism");
	
	$('html').css("filter","invert(0)  hue-rotate(0deg)");
	$('html').removeClass("dark");
	
	$('.sample_box').css("filter","hue-rotate(0deg)");
		
	$('.ui_guideline #invert_mode').css("display","none");
	$('.ui_guideline .color_slider').css("display","none");
	$('.ui_guideline .skin_reset').css("display","none");
	
	$('.ui_guideline .color_slider').fadeOut("fast",function(){
		$('.ui_guideline #invert_mode').fadeOut();	
	});		
	
	$(".ui_guideline button#guideline").text(ckSkin);
	$(".ui_guideline button#guideline").removeClass("on");	
}

//ckSkin: skin / text (string)			ckInvert: light / dark (string)			ckHueNum: number

$('#ui_tracker').slider({//슬라이더 작동
    min: 0,
    range: "min",
    step: 1,
    value: ckHueNum, //10 : 쿠키에서 받아온다
    max:360,
  	animate:0,
  	orientation: "horizontal",		
    slide: function( event, ui ) {
    	var mathNum = Math.round(ui.value);
    	var gridNum  = mathNum -1;
    		    	
    },
    slide:function( event, ui ){
    },
    stop: function( event, ui ) {
    	//$(this).slider('value',Math.round(ui.value));    	
    	hue_val = ui.value;
    	ckInverHueNum = -hue_val;
    	setCookie('color',hue_val,'3');//apply hueNumber (0)
    	getCookie('color'); //skin mode value load
    	skinModeEv();//console.log(ckHueNum);
    }
});


	
	$(".ui_guideline button#guideline").on("click",function(){//스킨 버튼 클릭
		$(this).toggleClass("on");
		if($(this).hasClass("on")){
			
			setCookie('view','skin','3');//apply skin(text)
			//setCookie('invert','light','3');//apply light in skin (dark)
			getCookie('view'); //skin mode value load
			//getCookie('invert'); //dark mode value load
			skinModeEv();
			
		}else{
			setCookie('view','text','3');//apply skin(text)
			getCookie('view'); //skin mode value load			
			textModeEv();
			
		}
	});
	
	$(".ui_guideline button#invert_mode").on("click",function(){
		$(this).toggleClass("on");
		
		if($(this).hasClass("on")){
			setCookie('invert','light');//apply light in skin (dark)
			getCookie('invert'); //dark mode value load
			skinModeEv();
			
		}else{
			setCookie('invert','dark');//apply light in skin (dark)
			getCookie('invert'); //dark mode value load
			skinModeEv();
		}
	});	

	$(".ui_guideline button.skin_reset").on("click",function(){
		if(confirm("사이트 스킨설정을 초기화 하겠습니까?\n스킨 초기화 후 새로고침됩니다.") == true){//혹인			
			//localStorage.clear(); //전부 삭제
			setCookie('view','text','3');//apply skin(text) 20211125 초기값을 스킨에서 텍스트로 지정했다
			setCookie('invert','light','3');//apply light in skin (dark)
			setCookie('color',0,'3');//apply hueNumber (0)			
			setTimeout(function(){location.reload()},10);
		}else{//취소
			return false
		}
	});		

	if(window.location.href.indexOf("/module_") > -1){//모듈일때
		$('.contents').prepend(subHtml_module);
	}
	
	if(window.location.href.indexOf("/operation") > -1){//운영일때
		$('.contents').prepend(subHtml_oper);
	}		
	
	if(window.location.href.indexOf("/etc") > -1){//etc일때
		$('.contents').prepend(subHtml_etc);
	}	
	
	$('nav a:eq('+menuArry[0]+')').addClass('current');
	if($('.subnav').length){//메뉴처리
        $('.subnav a:eq('+menuArry[1]+')').addClass('current');        		
	}
	
	/*
	//단독 페이지 처리
	var navParam = "nav"; //메뉴 파라미터
	$('header a, .subnav a').each(function() {//메뉴 파라미터 제공
		var thisHref = $(this).attr("href");
		$(this).attr("href",thisHref+"?"+navParam);//console.log($(this).attr("href"));
	});
    if(window.location.href.indexOf("?"+navParam) > -1){//메뉴제거 페이지만 제공
    	
    }else{
    	$('.ui, .view_sort').remove();
    	$('.subnav').css({"position": "absolute", "top":"-600px"});
    	//$('.subnav').remove();    	
    	$('.contents').css("padding-top","0");
    	$('.ui_guideline').css("margin-top","20px");
    	$('.project_gude').remove();
    }
	//단독 페이지 처리.end 211228 주석처리함
	*/
});	


/**  list 컨트롤 **/
$(window).load(function(){	
//$(document).ready(function(){
	
	setTimeout(function(){
		$('.start_dim').fadeOut(function(){$(this).remove();});	
	},50);	
	
	if($('html').hasClass('ie')){
		$('.ui_guideline #invert_mode').css("display","none");
		$('.ui_guideline #invert_mode').next('em').css("display","none");
	}	
	
	/* 상단 메뉴 current.end 표시 */
		
	 $('.aws_box .aws_tl').click(function(){//목록 타이틀 클릭시
		 if(!$(this).closest(".aws_box").find('.code_area').is(':visible')){	
			 $(this).closest(".aws_box").find('.code_area').stop().slideDown('fast',function(){
           	 viewlistCheck();
            });
            $(this).css('border-bottom','none');
            $(this).removeClass('open');
            $(this).parent('.aws_box').removeClass('open');
		 }else{
			$(this).closest(".aws_box").find('.code_area').stop().slideUp('fast',function(){
                viewlistCheck();
            });
            $(this).addClass('open');
            $(this).parent('.aws_box').addClass('open');
		 }
	 });//목록 타이틀 클릭시.end
	 
    $('.label').click(function(){//소스 뷰어 클릭시
    	$(this).next('.code-toolbar').addClass('sorce_block');
    	if(!$(this).hasClass('open')){
            $(this).next('.code-toolbar').css('display','block');
            $(this).addClass('open');    
            
        }else{
        	$(this).next('.code-toolbar').css('display','none');
            $(this).removeClass('open');
        }
    	$("html, body").stop().animate({scrollTop: $(this).offset().top-15}, 500, 'swing');
    });//소스 뷰어 클릭시.end
    
    $('.view_sort .section').click(function(){//필터버튼 클릭시
   	 $(this).removeClass('off');
   	 $('.view_sort .list').addClass('off');
        $('.aws_box .aws_tl').closest(".aws_box").find('.code_area').stop().slideDown('fast');                    	 
     	 $('.aws_tl').css('border-bottom','none');
     	 $('.aws_tl').removeClass('open');
     	 $('.aws_box').removeClass('open');  
    });
    $('.view_sort .list').click(function(){
   	 $(this).removeClass('off');
   	 $('.view_sort .section').addClass('off');
        $('.aws_box .aws_tl').closest(".aws_box").find('.code_area').stop().slideUp('fast',function(){ });
        $('.aws_tl').addClass('open');
        $('.aws_box').addClass('open');
    });//필터버튼 클릭시.end

    
	var tl_length = $('.aws_box .aws_tl').length; //console.log(tl_length); 목록 갯수 체크
	
    $('.aws_box .aws_tl').each(function() {    	
    	var thisNum = $('.aws_box .aws_tl').index(this)+1;    	
    	if(tl_length>1){//1개 초과일때만 넘버링
        	$(this).html("<em>"+thisNum +"</em> " + $(this).text());  
        	//$(this).find('em').after(thisNum+' ');    		
    	}else{//1개이하일때
    		$(this).html("<em class='page'></em> " + $(this).text());
    	}
    });    
    
    $('.icn_top').click(function(){//페이지 탑버튼
    	var body = $("html, body");
    	body.stop().animate({scrollTop:0}, 500, 'swing');
    });//페이지 탑버튼.end
    
    function viewlistCheck(){//목록 타이틀 클릭시 필터상태 체크
        var viewlistTotal = $('.aws_box .code_area').length,
        viewlistNum = $('.aws_box .code_area:visible').length;
        
        if (viewlistNum == viewlistTotal){
       	 	$('.view_sort .section').removeClass('off');
       	 	$('.view_sort .list').addClass('off');
        }else if(viewlistNum == 0){
        	$('.view_sort .section').addClass('off');
       		$('.view_sort .list').removeClass('off');
        }else{
        	$('.view_sort .section, .view_sort .list').addClass('off');
        }//console.log('viewlistTotal:'+viewlistTotal+', viewlistNum: '+viewlistNum);
    }//목록 타이틀 클릭시 필터상태 체크.end
    
    

    
    /*###### 메뉴처리 ######*/
    var headerH = $('header.ui').height();
    var menuSpeed = 500;
    $('body').append($('header.ui').clone().addClass('bottom'));
    $('header.ui').eq(1).css("bottom", -$('header.ui').eq(1).height());
    
    function menuFunction(){
		 var poffsetT = $(this).scrollTop();
		 if(headerH < poffsetT){//header bottom
			//$('header.ui').eq(0).css("top", -$('header.ui').eq(0).height());
			$('header.ui').eq(1).stop().animate({"bottom":0},menuSpeed);
			$('.icn_top').stop().animate({"bottom": 65},menuSpeed);
		 }else{//header top
			//$('header.ui').eq(0).css("top", 0);
			$('header.ui').eq(1).stop().animate({"bottom": -$(this).height()},menuSpeed);
			$('.icn_top').stop().animate({"bottom": -50},menuSpeed);			
		 }    	
    }
    
    menuFunction();    
    $(window).on('scroll', function(){    	
    	menuFunction();
    });
    /*###### 메뉴처리.end ######*/
    
});


/** 소스코드 컬러 플러그인 **/
var colorSource = {		
		init : function(obj, type) {//소스코드 변환 pure(코드변환만 쓸때)
			var str,
				$obj = document.getElementsByClassName(obj);
			for(i=0;i<$obj.length;i++){		
				str = $obj[i].querySelector('code').innerHTML;
				str = str.replace(/</g, '&lt;');
				str = str.replace(/>/g, '&gt;');
				$obj[i].querySelector('code').innerHTML = str;				
			}
			if(type==undefined||type==null){//타입이 없을때만 타이틀을 붙임
				colorSource.label(obj);
			}			
			return str;
		},
		label :function(obj){//소스종류별 타이틀
			var obj = '.'+obj
			$(obj).each(function(){
				if($(this).find('code').attr('class') == "language-markup"){
					$('<h3 class="label"><strong>HTML</strong> </h3>').insertBefore(this);
				}else if($(this).find('code').attr('class') == "language-javascript"){
					$('<h3 class="label"><strong>SCTIPT</strong> </h3>').insertBefore(this);
				}else if($(this).find('code').attr('class') == "language-css"){
					$('<h3 class="label"><strong>CSS</strong> </h3>').insertBefore(this);
				}
			});
		} 
}
$(function() {
	colorSource.init('codebox'); //바깥소스일때
	colorSource.init('incodebox','pure'); //인소스일때
});

/* PrismJS 1.15.0 - 코드소스 컬러링 Plugin
https://prismjs.com/download.html#themes=prism&languages=markup+css+clike+javascript&plugins=line-numbers+toolbar */
var _self="undefined"!=typeof window?window:"undefined"!=typeof WorkerGlobalScope&&self instanceof WorkerGlobalScope?self:{},Prism=function(){var e=/\blang(?:uage)?-([\w-]+)\b/i,t=0,n=_self.Prism={manual:_self.Prism&&_self.Prism.manual,disableWorkerMessageHandler:_self.Prism&&_self.Prism.disableWorkerMessageHandler,util:{encode:function(e){return e instanceof r?new r(e.type,n.util.encode(e.content),e.alias):"Array"===n.util.type(e)?e.map(n.util.encode):e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/\u00a0/g," ")},type:function(e){return Object.prototype.toString.call(e).match(/\[object (\w+)\]/)[1]},objId:function(e){return e.__id||Object.defineProperty(e,"__id",{value:++t}),e.__id},clone:function(e,t){var r=n.util.type(e);switch(t=t||{},r){case"Object":if(t[n.util.objId(e)])return t[n.util.objId(e)];var a={};t[n.util.objId(e)]=a;for(var l in e)e.hasOwnProperty(l)&&(a[l]=n.util.clone(e[l],t));return a;case"Array":if(t[n.util.objId(e)])return t[n.util.objId(e)];var a=[];return t[n.util.objId(e)]=a,e.forEach(function(e,r){a[r]=n.util.clone(e,t)}),a}return e}},languages:{extend:function(e,t){var r=n.util.clone(n.languages[e]);for(var a in t)r[a]=t[a];return r},insertBefore:function(e,t,r,a){a=a||n.languages;var l=a[e];if(2==arguments.length){r=arguments[1];for(var i in r)r.hasOwnProperty(i)&&(l[i]=r[i]);return l}var o={};for(var s in l)if(l.hasOwnProperty(s)){if(s==t)for(var i in r)r.hasOwnProperty(i)&&(o[i]=r[i]);o[s]=l[s]}var u=a[e];return a[e]=o,n.languages.DFS(n.languages,function(t,n){n===u&&t!=e&&(this[t]=o)}),o},DFS:function(e,t,r,a){a=a||{};for(var l in e)e.hasOwnProperty(l)&&(t.call(e,l,e[l],r||l),"Object"!==n.util.type(e[l])||a[n.util.objId(e[l])]?"Array"!==n.util.type(e[l])||a[n.util.objId(e[l])]||(a[n.util.objId(e[l])]=!0,n.languages.DFS(e[l],t,l,a)):(a[n.util.objId(e[l])]=!0,n.languages.DFS(e[l],t,null,a)))}},plugins:{},highlightAll:function(e,t){n.highlightAllUnder(document,e,t)},highlightAllUnder:function(e,t,r){var a={callback:r,selector:'code[class*="language-"], [class*="language-"] code, code[class*="lang-"], [class*="lang-"] code'};n.hooks.run("before-highlightall",a);for(var l,i=a.elements||e.querySelectorAll(a.selector),o=0;l=i[o++];)n.highlightElement(l,t===!0,a.callback)},highlightElement:function(t,r,a){for(var l,i,o=t;o&&!e.test(o.className);)o=o.parentNode;o&&(l=(o.className.match(e)||[,""])[1].toLowerCase(),i=n.languages[l]),t.className=t.className.replace(e,"").replace(/\s+/g," ")+" language-"+l,t.parentNode&&(o=t.parentNode,/pre/i.test(o.nodeName)&&(o.className=o.className.replace(e,"").replace(/\s+/g," ")+" language-"+l));var s=t.textContent,u={element:t,language:l,grammar:i,code:s};if(n.hooks.run("before-sanity-check",u),!u.code||!u.grammar)return u.code&&(n.hooks.run("before-highlight",u),u.element.textContent=u.code,n.hooks.run("after-highlight",u)),n.hooks.run("complete",u),void 0;if(n.hooks.run("before-highlight",u),r&&_self.Worker){var g=new Worker(n.filename);g.onmessage=function(e){u.highlightedCode=e.data,n.hooks.run("before-insert",u),u.element.innerHTML=u.highlightedCode,a&&a.call(u.element),n.hooks.run("after-highlight",u),n.hooks.run("complete",u)},g.postMessage(JSON.stringify({language:u.language,code:u.code,immediateClose:!0}))}else u.highlightedCode=n.highlight(u.code,u.grammar,u.language),n.hooks.run("before-insert",u),u.element.innerHTML=u.highlightedCode,a&&a.call(t),n.hooks.run("after-highlight",u),n.hooks.run("complete",u)},highlight:function(e,t,a){var l={code:e,grammar:t,language:a};return n.hooks.run("before-tokenize",l),l.tokens=n.tokenize(l.code,l.grammar),n.hooks.run("after-tokenize",l),r.stringify(n.util.encode(l.tokens),l.language)},matchGrammar:function(e,t,r,a,l,i,o){var s=n.Token;for(var u in r)if(r.hasOwnProperty(u)&&r[u]){if(u==o)return;var g=r[u];g="Array"===n.util.type(g)?g:[g];for(var c=0;c<g.length;++c){var h=g[c],f=h.inside,d=!!h.lookbehind,m=!!h.greedy,p=0,y=h.alias;if(m&&!h.pattern.global){var v=h.pattern.toString().match(/[imuy]*$/)[0];h.pattern=RegExp(h.pattern.source,v+"g")}h=h.pattern||h;for(var b=a,k=l;b<t.length;k+=t[b].length,++b){var w=t[b];if(t.length>e.length)return;if(!(w instanceof s)){if(m&&b!=t.length-1){h.lastIndex=k;var _=h.exec(e);if(!_)break;for(var j=_.index+(d?_[1].length:0),P=_.index+_[0].length,A=b,x=k,O=t.length;O>A&&(P>x||!t[A].type&&!t[A-1].greedy);++A)x+=t[A].length,j>=x&&(++b,k=x);if(t[b]instanceof s)continue;I=A-b,w=e.slice(k,x),_.index-=k}else{h.lastIndex=0;var _=h.exec(w),I=1}if(_){d&&(p=_[1]?_[1].length:0);var j=_.index+p,_=_[0].slice(p),P=j+_.length,N=w.slice(0,j),S=w.slice(P),C=[b,I];N&&(++b,k+=N.length,C.push(N));var E=new s(u,f?n.tokenize(_,f):_,y,_,m);if(C.push(E),S&&C.push(S),Array.prototype.splice.apply(t,C),1!=I&&n.matchGrammar(e,t,r,b,k,!0,u),i)break}else if(i)break}}}}},tokenize:function(e,t){var r=[e],a=t.rest;if(a){for(var l in a)t[l]=a[l];delete t.rest}return n.matchGrammar(e,r,t,0,0,!1),r},hooks:{all:{},add:function(e,t){var r=n.hooks.all;r[e]=r[e]||[],r[e].push(t)},run:function(e,t){var r=n.hooks.all[e];if(r&&r.length)for(var a,l=0;a=r[l++];)a(t)}}},r=n.Token=function(e,t,n,r,a){this.type=e,this.content=t,this.alias=n,this.length=0|(r||"").length,this.greedy=!!a};if(r.stringify=function(e,t,a){if("string"==typeof e)return e;if("Array"===n.util.type(e))return e.map(function(n){return r.stringify(n,t,e)}).join("");var l={type:e.type,content:r.stringify(e.content,t,a),tag:"span",classes:["token",e.type],attributes:{},language:t,parent:a};if(e.alias){var i="Array"===n.util.type(e.alias)?e.alias:[e.alias];Array.prototype.push.apply(l.classes,i)}n.hooks.run("wrap",l);var o=Object.keys(l.attributes).map(function(e){return e+'="'+(l.attributes[e]||"").replace(/"/g,"&quot;")+'"'}).join(" ");return"<"+l.tag+' class="'+l.classes.join(" ")+'"'+(o?" "+o:"")+">"+l.content+"</"+l.tag+">"},!_self.document)return _self.addEventListener?(n.disableWorkerMessageHandler||_self.addEventListener("message",function(e){var t=JSON.parse(e.data),r=t.language,a=t.code,l=t.immediateClose;_self.postMessage(n.highlight(a,n.languages[r],r)),l&&_self.close()},!1),_self.Prism):_self.Prism;var a=document.currentScript||[].slice.call(document.getElementsByTagName("script")).pop();return a&&(n.filename=a.src,n.manual||a.hasAttribute("data-manual")||("loading"!==document.readyState?window.requestAnimationFrame?window.requestAnimationFrame(n.highlightAll):window.setTimeout(n.highlightAll,16):document.addEventListener("DOMContentLoaded",n.highlightAll))),_self.Prism}();"undefined"!=typeof module&&module.exports&&(module.exports=Prism),"undefined"!=typeof global&&(global.Prism=Prism);
Prism.languages.markup={comment:/<!--[\s\S]*?-->/,prolog:/<\?[\s\S]+?\?>/,doctype:/<!DOCTYPE[\s\S]+?>/i,cdata:/<!\[CDATA\[[\s\S]*?]]>/i,tag:{pattern:/<\/?(?!\d)[^\s>\/=$<%]+(?:\s+[^\s>\/=]+(?:=(?:("|')(?:\\[\s\S]|(?!\1)[^\\])*\1|[^\s'">=]+))?)*\s*\/?>/i,greedy:!0,inside:{tag:{pattern:/^<\/?[^\s>\/]+/i,inside:{punctuation:/^<\/?/,namespace:/^[^\s>\/:]+:/}},"attr-value":{pattern:/=(?:("|')(?:\\[\s\S]|(?!\1)[^\\])*\1|[^\s'">=]+)/i,inside:{punctuation:[/^=/,{pattern:/(^|[^\\])["']/,lookbehind:!0}]}},punctuation:/\/?>/,"attr-name":{pattern:/[^\s>\/]+/,inside:{namespace:/^[^\s>\/:]+:/}}}},entity:/&#?[\da-z]{1,8};/i},Prism.languages.markup.tag.inside["attr-value"].inside.entity=Prism.languages.markup.entity,Prism.hooks.add("wrap",function(a){"entity"===a.type&&(a.attributes.title=a.content.replace(/&amp;/,"&"))}),Prism.languages.xml=Prism.languages.markup,Prism.languages.html=Prism.languages.markup,Prism.languages.mathml=Prism.languages.markup,Prism.languages.svg=Prism.languages.markup;
Prism.languages.css={comment:/\/\*[\s\S]*?\*\//,atrule:{pattern:/@[\w-]+?.*?(?:;|(?=\s*\{))/i,inside:{rule:/@[\w-]+/}},url:/url\((?:(["'])(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1|.*?)\)/i,selector:/[^{}\s][^{};]*?(?=\s*\{)/,string:{pattern:/("|')(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/,greedy:!0},property:/[-_a-z\xA0-\uFFFF][-\w\xA0-\uFFFF]*(?=\s*:)/i,important:/\B!important\b/i,"function":/[-a-z0-9]+(?=\()/i,punctuation:/[(){};:]/},Prism.languages.css.atrule.inside.rest=Prism.languages.css,Prism.languages.markup&&(Prism.languages.insertBefore("markup","tag",{style:{pattern:/(<style[\s\S]*?>)[\s\S]*?(?=<\/style>)/i,lookbehind:!0,inside:Prism.languages.css,alias:"language-css",greedy:!0}}),Prism.languages.insertBefore("inside","attr-value",{"style-attr":{pattern:/\s*style=("|')(?:\\[\s\S]|(?!\1)[^\\])*\1/i,inside:{"attr-name":{pattern:/^\s*style/i,inside:Prism.languages.markup.tag.inside},punctuation:/^\s*=\s*['"]|['"]\s*$/,"attr-value":{pattern:/.+/i,inside:Prism.languages.css}},alias:"language-css"}},Prism.languages.markup.tag));
Prism.languages.clike={comment:[{pattern:/(^|[^\\])\/\*[\s\S]*?(?:\*\/|$)/,lookbehind:!0},{pattern:/(^|[^\\:])\/\/.*/,lookbehind:!0,greedy:!0}],string:{pattern:/(["'])(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/,greedy:!0},"class-name":{pattern:/((?:\b(?:class|interface|extends|implements|trait|instanceof|new)\s+)|(?:catch\s+\())[\w.\\]+/i,lookbehind:!0,inside:{punctuation:/[.\\]/}},keyword:/\b(?:if|else|while|do|for|return|in|instanceof|function|new|try|throw|catch|finally|null|break|continue)\b/,"boolean":/\b(?:true|false)\b/,"function":/\w+(?=\()/,number:/\b0x[\da-f]+\b|(?:\b\d+\.?\d*|\B\.\d+)(?:e[+-]?\d+)?/i,operator:/--?|\+\+?|!=?=?|<=?|>=?|==?=?|&&?|\|\|?|\?|\*|\/|~|\^|%/,punctuation:/[{}[\];(),.:]/};
Prism.languages.javascript=Prism.languages.extend("clike",{"class-name":[Prism.languages.clike["class-name"],{pattern:/(^|[^$\w\xA0-\uFFFF])[_$A-Z\xA0-\uFFFF][$\w\xA0-\uFFFF]*(?=\.(?:prototype|constructor))/,lookbehind:!0}],keyword:[{pattern:/((?:^|})\s*)(?:catch|finally)\b/,lookbehind:!0},/\b(?:as|async|await|break|case|class|const|continue|debugger|default|delete|do|else|enum|export|extends|for|from|function|get|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|set|static|super|switch|this|throw|try|typeof|var|void|while|with|yield)\b/],number:/\b(?:(?:0[xX][\dA-Fa-f]+|0[bB][01]+|0[oO][0-7]+)n?|\d+n|NaN|Infinity)\b|(?:\b\d+\.?\d*|\B\.\d+)(?:[Ee][+-]?\d+)?/,"function":/[_$a-zA-Z\xA0-\uFFFF][$\w\xA0-\uFFFF]*(?=\s*\(|\.(?:apply|bind|call)\()/,operator:/-[-=]?|\+[+=]?|!=?=?|<<?=?|>>?>?=?|=(?:==?|>)?|&[&=]?|\|[|=]?|\*\*?=?|\/=?|~|\^=?|%=?|\?|\.{3}/}),Prism.languages.javascript["class-name"][0].pattern=/(\b(?:class|interface|extends|implements|instanceof|new)\s+)[\w.\\]+/,Prism.languages.insertBefore("javascript","keyword",{regex:{pattern:/((?:^|[^$\w\xA0-\uFFFF."'\])\s])\s*)\/(\[[^\]\r\n]+]|\\.|[^\/\\\[\r\n])+\/[gimyu]{0,5}(?=\s*($|[\r\n,.;})\]]))/,lookbehind:!0,greedy:!0},"function-variable":{pattern:/[_$a-z\xA0-\uFFFF][$\w\xA0-\uFFFF]*(?=\s*[=:]\s*(?:function\b|(?:\([^()]*\)|[_$a-z\xA0-\uFFFF][$\w\xA0-\uFFFF]*)\s*=>))/i,alias:"function"},constant:/\b[A-Z][A-Z\d_]*\b/}),Prism.languages.insertBefore("javascript","string",{"template-string":{pattern:/`(?:\\[\s\S]|\${[^}]+}|[^\\`])*`/,greedy:!0,inside:{interpolation:{pattern:/\${[^}]+}/,inside:{"interpolation-punctuation":{pattern:/^\${|}$/,alias:"punctuation"},rest:Prism.languages.javascript}},string:/[\s\S]+/}}}),Prism.languages.markup&&Prism.languages.insertBefore("markup","tag",{script:{pattern:/(<script[\s\S]*?>)[\s\S]*?(?=<\/script>)/i,lookbehind:!0,inside:Prism.languages.javascript,alias:"language-javascript",greedy:!0}}),Prism.languages.js=Prism.languages.javascript;
!function(){if("undefined"!=typeof self&&self.Prism&&self.document){var e="line-numbers",t=/\n(?!$)/g,n=function(e){var n=r(e),s=n["white-space"];if("pre-wrap"===s||"pre-line"===s){var l=e.querySelector("code"),i=e.querySelector(".line-numbers-rows"),a=e.querySelector(".line-numbers-sizer"),o=l.textContent.split(t);a||(a=document.createElement("span"),a.className="line-numbers-sizer",l.appendChild(a)),a.style.display="block",o.forEach(function(e,t){a.textContent=e||"\n";var n=a.getBoundingClientRect().height;i.children[t].style.height=n+"px"}),a.textContent="",a.style.display="none"}},r=function(e){return e?window.getComputedStyle?getComputedStyle(e):e.currentStyle||null:null};window.addEventListener("resize",function(){Array.prototype.forEach.call(document.querySelectorAll("pre."+e),n)}),Prism.hooks.add("complete",function(e){if(e.code){var r=e.element.parentNode,s=/\s*\bline-numbers\b\s*/;if(r&&/pre/i.test(r.nodeName)&&(s.test(r.className)||s.test(e.element.className))&&!e.element.querySelector(".line-numbers-rows")){s.test(e.element.className)&&(e.element.className=e.element.className.replace(s," ")),s.test(r.className)||(r.className+=" line-numbers");var l,i=e.code.match(t),a=i?i.length+1:1,o=new Array(a+1);o=o.join("<span></span>"),l=document.createElement("span"),l.setAttribute("aria-hidden","true"),l.className="line-numbers-rows",l.innerHTML=o,r.hasAttribute("data-start")&&(r.style.counterReset="linenumber "+(parseInt(r.getAttribute("data-start"),10)-1)),e.element.appendChild(l),n(r),Prism.hooks.run("line-numbers",e)}}}),Prism.hooks.add("line-numbers",function(e){e.plugins=e.plugins||{},e.plugins.lineNumbers=!0}),Prism.plugins.lineNumbers={getLine:function(t,n){if("PRE"===t.tagName&&t.classList.contains(e)){var r=t.querySelector(".line-numbers-rows"),s=parseInt(t.getAttribute("data-start"),10)||1,l=s+(r.children.length-1);s>n&&(n=s),n>l&&(n=l);var i=n-s;return r.children[i]}}}}}();
!function(){if("undefined"!=typeof self&&self.Prism&&self.document){var t=[],e={},n=function(){};Prism.plugins.toolbar={};var a=Prism.plugins.toolbar.registerButton=function(n,a){var o;o="function"==typeof a?a:function(t){var e;return"function"==typeof a.onClick?(e=document.createElement("button"),e.type="button",e.addEventListener("click",function(){a.onClick.call(this,t)})):"string"==typeof a.url?(e=document.createElement("a"),e.href=a.url):e=document.createElement("span"),e.textContent=a.text,e},t.push(e[n]=o)},o=Prism.plugins.toolbar.hook=function(a){var o=a.element.parentNode;if(o&&/pre/i.test(o.nodeName)&&!o.parentNode.classList.contains("code-toolbar")){var r=document.createElement("div");r.classList.add("code-toolbar"),o.parentNode.insertBefore(r,o),r.appendChild(o);var i=document.createElement("div");i.classList.add("toolbar"),document.body.hasAttribute("data-toolbar-order")&&(t=document.body.getAttribute("data-toolbar-order").split(",").map(function(t){return e[t]||n})),t.forEach(function(t){var e=t(a);if(e){var n=document.createElement("div");n.classList.add("toolbar-item"),n.appendChild(e),i.appendChild(n)}}),r.appendChild(i)}};a("label",function(t){var e=t.element.parentNode;if(e&&/pre/i.test(e.nodeName)&&e.hasAttribute("data-label")){var n,a,o=e.getAttribute("data-label");try{a=document.querySelector("template#"+o)}catch(r){}return a?n=a.content:(e.hasAttribute("data-url")?(n=document.createElement("a"),n.href=e.getAttribute("data-url")):n=document.createElement("span"),n.textContent=o),n}}),Prism.hooks.add("complete",o)}}();
