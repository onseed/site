
var rule_guide = false;
var wappen_grid = false;
var guide_more = false;

var view_status = "front"; //view_status: front, side, back, top

var zoom_status = false; //zoom status
var panZoom_front; //zoom
var panZoom_side;
var panZoom_back;
var panZoom_top;

var myScroll;

var front_bag_front_url;
var front_bag_strab_url;
var front_bag_back_url;
var front_bag_handle_url;
var front_bag_side_url;
var front_emblem_url;

var side_bag_front_url;
var side_bag_strab_url;
var side_bag_back_url;
var side_bag_handle_url;
var side_bag_side_url;
var side_emblem_url;

var back_bag_front_url;
var back_bag_strab_url;
var back_bag_back_url;
var back_bag_handle_url;
var back_bag_side_url;
var back_emblem_url;

var top_bag_front_url;
var top_bag_strab_url;
var top_bag_back_url;
var top_bag_handle_url;
var top_bag_side_url;
var top_emblem_url;

var side_more_ani; //좌측 more ani 20151113

function load_init(){//loading
	$("#loading_div").fadeOut("fast");
}//end

$(window).resize(function() {
	if(zoom_status==true){//zoom layout change
		$("#custom_layout").css({"height":$(window).height()});
	}
});
$(window).load(function(){
	$('#fabric_wappen, #metal_wappen').flexslider({//사이드 메뉴 와펜 슬라이더1
		animation: "slide",
		slideshow: false,
		controlNav: false,
		animationLoop: false, //20150930 슬라이더 옵션 추가
		start: function(){
			$('#metal_wappen').css("display","none");
		}
	});//end	

	function side_menu_loaded () {//사이드 메뉴 스크롤 
		myScroll = new IScroll('#side_menu_wrap', { scrollX: false, scrollY: true,/* eventPassthrough: true, preventDefault: false, hideScrollbar: false,*/bounce: false, scrollbarClass: 'myScrollbar',  mouseWheel: true, scrollbars: true, click: true});	
	}
	side_menu_loaded();
	//end

	$("#side_menu_wrap").mouseover(function(){//side more ani
		//$('.more_div').fadeOut("fast");  // 20151125 삭제
		//window.clearInterval(side_more_ani); // 20151125 삭제
	});
	side_more_ani = window.setInterval(function(){
				$('#side_more').animate({bottom: 10}, { duration: 500});
				$('#side_more').animate({bottom: 20}, { duration: 500});
	}, 1000); //end
});


$(document).ready(function(){

	//###01.svg total load
	var svg_front_load = $.ajax(svg_front_url);
	var svg_side_load = $.ajax(svg_side_url);
	var svg_back_load = $.ajax(svg_back_url);
	var svg_top_load = $.ajax(svg_top_url);

	$.when(svg_front_load, svg_side_load, svg_back_load, svg_top_load).then(
		function(data1, data2, data3, data4){//load success

			var data = data1[0] + data2[0] + data3[0] + data4[0];
			$('#custom_visual').append(data); //append

			panZoom_front = svgPanZoom('#front_svg');	//add zoom
			panZoom_side = svgPanZoom('#side_svg');
			panZoom_back = svgPanZoom('#back_svg');
			panZoom_top = svgPanZoom('#top_svg');

			$('#side_svg,#back_svg,#top_svg').css("display","none");

			$("#sort_color_tab li").css("backgroundImage","url("+img_url+"color/stephanie_color_small0.jpg)");
			$("#sort_pattern_tab li").css("backgroundImage","url("+img_url+"pattern/stephanie_pattern_small0.jpg)");

			for(i =1; i < limit+1; i++){ //와펜 기본 삭제
				$("#wappen_svg_in"+i).css("display","none");
			}


		 /*20150925 임시 start
			$("#107W3").trigger('click');//1. 와펜 리스트 이미지 클릭
			//alert(wappen_status + " : " + wappen_img);
			wappen_url = img_url + "wappen/wappen_set_"+wappen_status+wappen_num+".png"; //2. 와펜 이미지 주소 생성
			wappen_click_ev(wappen_status, wappen_img);		//3. svg 와펜 클릭이벤트 : 이미지 생성

			$("#108W4").trigger('click');
			//alert(wappen_status + " : " + wappen_img);
			wappen_url = img_url + "wappen/wappen_set_"+wappen_status+wappen_num+".png"; 
			wappen_click_ev(wappen_status, wappen_img);

			$(".wappen_module").css("display","none");//4. wappen 로드후 wappen_module(점 그리드)를 반드시 꺼주세요.
			wappen_grid = false;
		 20150925 임시 end*/

			panZoom_init();//zoom init
			load_skin();	//skin load
			svg_mouse_ev();//svg_mouse_ev

		},
		function(){//load fail
			//alert("svg loading");			
		}
	);//###01.end
		//###02.button_set
	function panZoom_init(){//panZoom 초기화
			panZoom_front.reset().disableMouseWheelZoom().disablePan();
			panZoom_side.reset().disableMouseWheelZoom().disablePan();
			panZoom_back.reset().disableMouseWheelZoom().disablePan();
			panZoom_top.reset().disableMouseWheelZoom().disablePan();
	}
	function zoom_layout_add(){//zoom_layout add
		$("#header").velocity({ height: 0 },{ duration: 500 }); 
		$("#custom_layout").css({"marginRight":"0","height":$(window).height()-1});
		$("#side_menu").css("display","none");
		$(".contentFooter").css("display","none");
		$("#footer").css("display","none");
		$("body").css("background","#fff");
	}
	function zoom_layout_remove(){//zoom_layout remove
		$("#header").velocity({ height: 115 },{ duration: 500 }); 
		$("#custom_layout").css({"marginRight":"276px","height":"916px"});
		$("#side_menu").css("display","block");
		$(".contentFooter").css("display","block");
		$("#footer").css("display","block");
		$("body").css("background","#e1e1e1");
	}
	$("#zoom_layout, #page_preview").click(function(){//zoom_click
		if(view_status=="front"){
			panZoom_init();
			panZoom_front.enableMouseWheelZoom().enablePan().zoomBy(1.3).pan({x:-135,y:-85});
			zoom_layout_add();
		}else if(view_status=="side"){
			panZoom_init();
			panZoom_side.enableMouseWheelZoom().enablePan().zoomBy(1.3).pan({x:-135,y:-85});
			zoom_layout_add();
		}else if(view_status=="back"){
			panZoom_init();
			panZoom_back.enableMouseWheelZoom().enablePan().zoomBy(1.3).pan({x:-135,y:-85});
			zoom_layout_add();
		}else if(view_status=="top"){
			panZoom_init();
			panZoom_top.enableMouseWheelZoom().enablePan().zoomBy(1.3).pan({x:-135,y:-85});
			zoom_layout_add();
		}else{
			return false;
		}
		zoom_status = true;
		$("#view_tool, #btn_custom_page").css("display","none");
		$("#zoom_tool").css("display","block");

		$("#rule_guide").removeClass("on");//rule_guide
		$("#gride_rule1").css("display","none");
		rule_guide = false;

		$(".wappen_module").css("display","none");//wappen_module
		wappen_grid = false;

		$(".btn_guide_more").removeClass('on');//guide_more
		$("#more_info_cont").css("display","none");
		guide_more = false;

		//svg_mouse_ev();//svg mouse event 20151113 삭제처리
		$("#front_svg, #side_svg, #back_svg, #top_svg").css("cursor","move");// 20151113 커서 추가

	});//end. zoom_click
	$("#zoom_close").click(function(){//zoom_close
		if(view_status=="front"){
			panZoom_init();
			panZoom_front.zoomBy(1).pan({x:0,y:0});
			zoom_layout_remove();
		}else if(view_status=="side"){
			panZoom_init();
			panZoom_side.zoomBy(1).pan({x:0,y:0});
			zoom_layout_remove();
		}else if(view_status=="back"){
			panZoom_init();
			panZoom_back.zoomBy(1).pan({x:0,y:0});
			zoom_layout_remove();
		}else if(view_status=="top"){
			panZoom_init();
			panZoom_top.zoomBy(1).pan({x:0,y:0});
			zoom_layout_remove();
		}else{return false;}
		zoom_status = false;
		$("#zoom_tool").css("display","none");
		$("#view_tool, #btn_custom_page").css("display","block");

		//svg_mouse_ev();//svg mouse event 20151113 삭제처리
		$("#front_svg, #side_svg, #back_svg, #top_svg").css("cursor","default");// 20151113 커서 추가
	});//end. zoom_click

	//custom_view_click
	function view_init(){
		$('#front_svg, #side_svg, #back_svg, #top_svg').css("display","none");
	}
	$("#front_view").click(function(){
		if(zoom_status == false){	panZoom_init();	
		}else{	panZoom_front.reset().enableMouseWheelZoom().enablePan().zoomBy(1.3).pan({x:-135,y:-85});	}
		view_init();
		$("#viewport_set span").removeClass("on");
		$(this).addClass("on");
		$('#front_svg').css("display","block");
	});
	$("#side_view").click(function(){
		if(zoom_status == false){	panZoom_init();
		}else{panZoom_side.reset().enableMouseWheelZoom().enablePan().zoomBy(1.3).pan({x:-135,y:-85});}
		view_init();
		$("#viewport_set span").removeClass("on");
		$(this).addClass("on");
		$('#side_svg').css("display","block");

		$(".wappen_module").css("display","none");//wappen_module
		wappen_grid = true;
		
		/*20151125 ie9일때 side 와펜 삭제 -start*/
		var agent = navigator.userAgent.toLowerCase();
		if (agent.indexOf("msie 9.0") != -1) {
			for(i =1; i < limit+1; i++){ //와펜 기본 삭제
				$("#wappen_svg_in_side"+i).css("display","none");
			}			
		}
		/*20151125 ie9일때 side 와펜 삭제 -end*/

	});
	$("#back_view").click(function(){
		if(zoom_status == false){	panZoom_init();
		}else{panZoom_back.reset().enableMouseWheelZoom().enablePan().zoomBy(1.3).pan({x:-135,y:-85});}
		view_init();
		$("#viewport_set span").removeClass("on");
		$(this).addClass("on");
		$('#back_svg').css("display","block");

		$(".wappen_module").css("display","none");//wappen_module
		wappen_grid = true;
	});
	$("#top_view").click(function(){
		if(zoom_status == false){	panZoom_init();
		}else{panZoom_top.reset().enableMouseWheelZoom().enablePan().zoomBy(1.3).pan({x:-135,y:-85});}
		view_init();
		$("#viewport_set span").removeClass("on");
		$(this).addClass("on");
		$('#top_svg').css("display","block");

		$(".wappen_module").css("display","none");//wappen_module
		wappen_grid = true;
	});
	//end. custom_view_click

	//###02.end	 

	//zoom_control
	$("#zoom_control .zoom-in").click(function(){//zoom-in
		if(view_status=="front"){
			panZoom_front.zoomIn();
		}else if(view_status=="side"){
			panZoom_side.zoomIn();
		}else if(view_status=="back"){
			panZoom_back.zoomIn();
		}else if(view_status=="top"){
			panZoom_top.zoomIn();
		}else{return false;}
	});
	$("#zoom_control .zoom-out").click(function(){//zoom-out
		if(view_status=="front"){
			panZoom_front.zoomOut();
		}else if(view_status=="side"){
			panZoom_side.zoomOut();			
		}else if(view_status=="back"){
			panZoom_back.zoomOut();
		}else if(view_status=="top"){
			panZoom_top.zoomOut();
		}else{return false;}
	});
	$("#zoom_control .reset").click(function(){//reset
		if(view_status=="front"){
			panZoom_front.reset().zoomBy(1.3).pan({x:-135,y:-85});
		}else if(view_status=="side"){
			panZoom_side.reset().zoomBy(1.3).pan({x:-135,y:-85});
		}else if(view_status=="back"){
			panZoom_back.reset().zoomBy(1.3).pan({x:-135,y:-85});
		}else if(view_status=="top"){
			panZoom_top.reset().zoomBy(1.3).pan({x:-135,y:-85});
		}else{return false;}
	});
	//end. zoom_control

	$("#rule_guide").click(function(){//rule_guide
		if(rule_guide == false){
			rule_guide = true;
			$(this).addClass("on");
			$("#gride_rule1").css("display","block");
		}else{
			$(this).removeClass("on");
			$("#gride_rule1").css("display","none");
			rule_guide = false;
		}
		$(".wappen_module").css("display","none"); //wappen_module
		wappen_grid = false;
		return false;
	});

	$("#wappen_grid").click(function(){//wappen_grid
		if(wappen_grid == false){
			wappen_grid = true;
			$(".wappen_module").css("display","block");
		}else{
			$(".wappen_module").css("display","none");
			wappen_grid = false;
		}
		$("#rule_guide").removeClass("on");
		$("#gride_rule1").css("display","none");
			rule_guide = false;
		return false;
	});

	$(".btn_guide_more").click(function(){//guide_more
		if(guide_more == false){
			guide_more = true;
			$(".btn_guide_more").addClass('on');
			$("#more_info_cont").css("display","block");
		}else{
			$("#more_info_cont").css("display","none");
			$(".btn_guide_more").removeClass('on');
			guide_more = false;
		}
		return false;
	});

	$("#btn_color_set .select_change").click(function(){//컬러탭
		$("#btn_color_set .select_change").removeClass("on");
		$(this).addClass("on");

		if($(this).hasClass("on")){
			$(this).parent().parent().parent().parent().parent().parent().css("background","#dfdfdf");
		}

		return false;
	});
	$("#btn_pattern_set .select_change").click(function(){	//패턴탭
		$("#btn_pattern_set .select_change").removeClass("on");
		$(this).addClass("on");

		if($(this).hasClass("on")){
			$(this).parent().parent().parent().parent().parent().parent().css("background","#dfdfdf");
		}

		return false;
	});

	$("#sort_emblem_tab .basic").click(function(){	//엠블렘 탭1_ basic 20150916 수정 및 추가
		$("#sort_emblem_tab .glimm").removeClass("on");
		$("#sort_emblem_tab .glimm").css("backgroundImage","none");
		$(this).addClass("on");
		$(this).css("backgroundImage","url("+img_url+"emblem/stephanie_emblem_small"+bag_emblem+".jpg)");
		$("#btn_emblem_set1").css("display","block");
		$("#btn_emblem_set2").css("display","none");

		if($(this).hasClass("on")){//20151113 선택 추가
			$(this).parent().parent().parent().parent().parent().parent().css("background","#dfdfdf");
		}

		bag_glimm = false;
		bag_emblem_url_make(bag_emblem); load_skin();
	});
	$("#sort_emblem_tab .glimm").click(function(){	//엠블렘 탭2_ glimm 20150916 수정 및 추가
		$("#sort_emblem_tab .basic").removeClass("on");
		$("#sort_emblem_tab .basic").css("backgroundImage","none");
		$(this).addClass("on");
		$(this).css("backgroundImage","url("+img_url+"emblem/stephanie_emblem_small"+bag_emblem+".jpg)");

		$("#btn_emblem_set1").css("display","none");
		$("#btn_emblem_set2").css("display","block");

		if($(this).hasClass("on")){//20151113 선택 추가
			$(this).parent().parent().parent().parent().parent().parent().css("background","#dfdfdf");
		}

		bag_glimm = true;
		bag_emblem_url_make(bag_emblem); load_skin();
	});
	$("#btn_emblem_set1 .select_change").click(function(){	//엠블렘 선택1_basic 수정 및 추가
		$("#btn_emblem_set1 .select_change").removeClass("on");
		$(this).addClass("on");

		if($(this).hasClass("on")){//20151113 선택 추가
			$(this).parent().parent().parent().parent().parent().parent().css("background","#dfdfdf");
		}

		$("#sort_emblem_tab .basic").css("backgroundImage","url("+img_url+"emblem/stephanie_emblem_small"+bag_emblem+".jpg)"); //20150916 클래스명 수정
		$("#btn_emblem_set2 .select_change").removeClass("on");
		$("#btn_emblem_set2 .select_change:eq("+bag_emblem+")").addClass("on");
		return false;
	});
	$("#btn_emblem_set2 .select_change").click(function(){	//엠블렘 선택2_glimm 수정 및 추가
		$("#btn_emblem_set2 .select_change").removeClass("on");
		$(this).addClass("on");

		if($(this).hasClass("on")){//20151113 선택 추가
			$(this).parent().parent().parent().parent().parent().parent().css("background","#dfdfdf");
		}

		$("#sort_emblem_tab .glimm").css("backgroundImage","url("+img_url+"emblem/stephanie_emblem_small"+bag_emblem+".jpg)"); //20150916 클래스명 수정
		$("#btn_emblem_set1 .select_change").removeClass("on");
		$("#btn_emblem_set1 .select_change:eq("+bag_emblem+")").addClass("on");
		return false;
	});


	$(".strab_select_set button").click(function(){	//스트랩 선택
		$(".strab_select_set button").removeClass("on");
		$(this).addClass("on");

		if($(this).hasClass("on")){
			$(this).parent().parent().parent().parent().parent().parent().css("background","#dfdfdf");
		}

		return false;
	});


	$("#sort_wappen_tab .fabric").click(function(){//와펜 탭
		$(".metal").removeClass('on');		
		$(this).addClass('on');
		$("#metal_wappen").css("display","none");
		$("#fabric_wappen").css("display","block");	
	});
	$("#sort_wappen_tab .metal").click(function(){
		$(".fabric").removeClass('on');		
		$(this).addClass('on');
		$("#fabric_wappen").css("display","none");
		$("#metal_wappen").css("display","block");	
	});

	$("#section_color_base").click(function(){//컬러 쵸이스 20150914 수정 및 삭제
		custom_status = "color_base";
		tab_default();
		if($(this).hasClass("on")){
			$(this).addClass("on_on")
		}
		$(this).addClass("on");
		return false;
	});
	$("#section_color_side").click(function(){
		custom_status = "color_side";
		tab_default();
		if($(this).hasClass("on")){
			$(this).addClass("on_on")
		}
		$(this).addClass("on");
		return false;
	});	
	$("#section_color_front").click(function(){
		custom_status = "color_front";
		tab_default();
		if($(this).hasClass("on")){
			$(this).addClass("on_on")
		}
		$(this).addClass("on");
		return false;
	});	
	$("#section_color_handle").click(function(){
		custom_status = "color_handle";
		tab_default();
		if($(this).hasClass("on")){
			$(this).addClass("on_on")
		}
		$(this).addClass("on");
		return false;
	});
	function tab_default(){
		$("#section_color_base").removeClass("on_on");
		$("#section_color_side").removeClass("on_on");
		$("#section_color_front").removeClass("on_on");
		$("#section_color_handle").removeClass("on_on");
		if(bag_base == 0){
			$("#section_color_base").removeClass("on");
		}else{
			$("#section_color_base").addClass("on");
		}
		if(bag_side == 0){
			$("#section_color_side").removeClass("on");
		}else{
			$("#section_color_side").addClass("on");
		}
		if(bag_front == 0){
			$("#section_color_front").removeClass("on");
		}else{
			$("#section_color_front").addClass("on");
		}
		if(bag_handle == 0){
			$("#section_color_handle").removeClass("on");
		}else{
			$("#section_color_handle").addClass("on");
		}

	}
	//end	

	$("#section_pattern_body").click(function(){//패턴 쵸이스 20150914 수정 및 삭제
		pattern_status = "pattern_body";
		tab_pt_default();
		if($(this).hasClass("on")){
			$(this).addClass("on_on")
		}
		$(this).addClass("on");
		return false;
	});	
	$("#section_pattern_front").click(function(){
		pattern_status = "pattern_front";
		tab_pt_default();
		if($(this).hasClass("on")){
			$(this).addClass("on_on")
		}
		$(this).addClass("on");
		return false;
	});	
	$("#section_pattern_side").click(function(){
		pattern_status = "pattern_side";
		tab_pt_default();
		if($(this).hasClass("on")){
			$(this).addClass("on_on")
		}
		$(this).addClass("on");
		return false;
	});
	function tab_pt_default(){
		$("#section_pattern_body").removeClass("on_on");
		$("#section_pattern_front").removeClass("on_on");
		$("#section_pattern_side").removeClass("on_on");
		if(bag_back_pattern == 0){
			$("#section_pattern_body").removeClass("on");
		}else{
			$("#section_pattern_body").addClass("on");
		}
		if(bag_front_pattern == 0){
			$("#section_pattern_front").removeClass("on");
		}else{
			$("#section_pattern_front").addClass("on");
		}
		if(bag_side_pattern == 0){
			$("#section_pattern_side").removeClass("on");
		}else{
			$("#section_pattern_side").addClass("on");
		}
	}
	//edn

	//상품 수량 조절 시작
	$('.bt_down_click').click(function(){
		var n = $('.bt_down_click').index(this);
		var num = $(".qty_inputbox:eq("+n+")").val();
		if(num > 1){num = $(".qty_inputbox:eq("+n+")").val(num*1-1); }
		else{num = 1;}
		return false;
	});
	$('.bt_up_click').click(function(){
		var n = $('.bt_up_click').index(this);
		var num = $(".qty_inputbox:eq("+n+")").val();
		num = $(".qty_inputbox:eq("+n+")").val(num*1+1);
		return false;
	});
	//상품 수량 조절 끝
});

//선택면 선택
var custom_status = "color_base"; //color_base, color_side, color_front, color_handle
var pattern_status = "pattern_body"; //pattern_body, pattern_front, pattern_side

function check_skin_ev(){//저장된 정보
	console.log("bag_base="+ bag_base + " : " +
	"bag_front="+ bag_front + " : " +
	"bag_back="+ bag_back + " : " +
	"bag_handle="+ bag_handle + " : " +
	"bag_side="+ bag_side + " : " +
	"bag_front_pattern="+ bag_front_pattern + " : " +
	"bag_back_pattern="+ bag_back_pattern + " : " +
	"bag_side_pattern="+ bag_side_pattern + " : " +
	"bag_emblem="+ bag_emblem + " : " +
	"bag_glimm="+ bag_glimm + " : " + //20150914 추가		
	"strab_spec="+ strab_spec			
	);
	for(var i in small_select_num) {
		console.log("small_wappen : " + small_select_num[i]);
		console.log("small_select_Imgnum : " + small_select_Imgnum[i]);
	}
	for(var i in big_select_num) {
		console.log("big_wappen : " + big_select_num[i]);
		console.log("big_select_Imgnum : " + big_select_Imgnum[i]);
	}
}

function bag_color_Img_url_make(num){//color 처리 ev
	if(custom_status == "color_base"){
		bag_base = num; //컬러값 base: strab등 선택
		bag_front = num; //컬러값 front 선택
		bag_back = num; //컬러값 back 선택
		//bag_side = num; //컬러값 side 선택 20150918 삭제
		//bag_handle = num; //컬러값 handle 선택 20150918 삭제

		//$("#sort_color_tab li").css("backgroundImage","url("+img_url+"color/stephanie_color_small"+bag_base+".jpg)"); //20150918 삭제
		$("#sort_color_tab .tab01, #sort_color_tab .tab03").css("backgroundImage","url("+img_url+"color/stephanie_color_small"+bag_base+".jpg)"); //20150918 추가
		if(bag_base == 0){
			//	$("#sort_color_tab li").removeClass("on");//20150918 삭제
			$("#sort_color_tab .tab01, #sort_color_tab .tab03").removeClass("on"); //20150918 추가
			$("#sort_color_tab .tab01").addClass("on");			
		}else{
			//$("#sort_color_tab li").addClass("on"); //20150918 삭제
			$("#sort_color_tab .tab01, #sort_color_tab .tab03").addClass("on"); //20150918 추가
		}
	}else if(custom_status == "color_side"){
		bag_side = num; //컬러값 side 선택
		$("#sort_color_tab .tab02").css("backgroundImage","url("+img_url+"color/stephanie_color_small"+bag_side+".jpg)");

		if(bag_side == 0){
			$("#sort_color_tab .tab02").removeClass("on");
		}else{
			$("#sort_color_tab .tab02").addClass("on");
		}
	}else if(custom_status == "color_front"){
		bag_front = num; //컬러값 front 선택
		$("#sort_color_tab .tab03").css("backgroundImage","url("+img_url+"color/stephanie_color_small"+bag_front+".jpg)");
		if(bag_front == 0){
			$("#sort_color_tab .tab03").removeClass("on");
		}else{
			$("#sort_color_tab .tab03").addClass("on");
		}
	}else if(custom_status == "color_handle"){
		bag_handle = num; //컬러값 handle 선택
		$("#sort_color_tab .tab04").css("backgroundImage","url("+img_url+"color/stephanie_color_small"+bag_handle+".jpg)");
		if(bag_handle == 0){
			$("#sort_color_tab .tab04").removeClass("on");
		}else{
			$("#sort_color_tab .tab04").addClass("on");
		}
	}else{}

	if(bag_base == 0 && bag_side == 0 && bag_front == 0 && bag_handle == 0){
			$("#sort_color_tab .tab01").addClass("on");
			custom_status = "color_base";			
	}

	$(".wappen_module").css("display","none");//wappen_module
	wappen_grid = false;
}

function bag_pattrern_Img_url_make(num){//pattern 처리 ev
	if(pattern_status == "pattern_body"){
		bag_front_pattern = num; //패턴값 front 선택
		bag_back_pattern = num; //패턴값 back 선택
		$("#sort_pattern_tab .tab01").css("backgroundImage","url("+img_url+"pattern/stephanie_pattern_small"+bag_front_pattern+".jpg)");
		$("#sort_pattern_tab .tab02").css("backgroundImage","url("+img_url+"pattern/stephanie_pattern_small"+bag_back_pattern+".jpg)");
		$("#sort_pattern_tab .tab01, #sort_pattern_tab .tab02").addClass("on");
		if(bag_front_pattern == 0){
			$("#sort_pattern_tab .tab02").removeClass("on");
		}
	}else if(pattern_status == "pattern_front"){
		bag_front_pattern = num; //패턴값 front 선택
		$("#sort_pattern_tab .tab02").css("backgroundImage","url("+img_url+"pattern/stephanie_pattern_small"+bag_front_pattern+".jpg)");
		if(bag_front_pattern == 0){
			$("#sort_pattern_tab .tab02").removeClass("on");
		}
	}else if(pattern_status == "pattern_side"){
		bag_side_pattern = num; //패턴값 side 선택
		$("#sort_pattern_tab .tab03").css("backgroundImage","url("+img_url+"pattern/stephanie_pattern_small"+bag_side_pattern+".jpg)");
		if(bag_side_pattern == 0){
			$("#sort_pattern_tab .tab03").removeClass("on");
		}
	}else{return false}

	$(".wappen_module").css("display","none");//wappen_module
	wappen_grid = false;
}

function bag_emblem_url_make(num){//엠블렘 처리 ev
	bag_emblem = num; //엠블렘값 선택

	$(".wappen_module").css("display","none");//wappen_module
	wappen_grid = false;
}

function load_skin(){//##커스텀 스킨 로드 20150915 수정처리

	$("#loading_div").css("display","block");

	/*front*/
	front_bag_front_url = base_url+bag_type+"_front_base"+ bag_front+"_"+bag_front_pattern+".jpg"; //bag_front		
	$("#svg_front_front_img").attr("xlink:href", front_bag_front_url);
	$("#unit01_1").attr("fill","url(#svg_front_front)");//몸통 앞판

	front_bag_side_url = base_url+bag_type+"_front_base"+ bag_side+"_"+bag_side_pattern +".jpg"; //front_side		
	$("#svg_front_side_img").attr("xlink:href", front_bag_side_url);
	$("#unit01_3, #unit01_4").attr("fill","url(#svg_front_side)");//왼쪽날개, 오른쪽날개

	front_bag_strab_url = base_url+bag_type+"_front_base"+ bag_base+"_"+bag_front_pattern +".jpg";//bag_strab
	$("#svg_front_strab_img").attr("xlink:href", front_bag_strab_url);
	$("#unit01_2").attr("fill","url(#svg_front_strab)");//스트랩

	front_bag_handle_url = base_url+bag_type+"_front_base"+ bag_handle+"_"+bag_front_pattern +".jpg"; //front_hadle
	$("#svg_front_hadle_img").attr("xlink:href", front_bag_handle_url);
	$("#unit01_5").attr("fill","url(#svg_front_hadle)");//손잡이

	//front_emblem_url = base_url+bag_type+"_front_emblem"+ bag_emblem +".jpg"; //front_emblem 20150918 삭제

	if(bag_glimm==false){//엠블렘 glimm 선택 20150915 추가
		front_emblem_url = base_url+bag_type+"_front_emblem"+ bag_emblem +".jpg"; //front_emblem
	}else{
		front_emblem_url = base_url+bag_type+"_front_glimm_emblem"+ bag_emblem +".jpg"; //front_glimm_emblem
	}
	$("#svg_front_emblem_img").attr("xlink:href", front_emblem_url);
	$("#unit01_6,#unit01_7,#unit01_8,#unit01_9,#unit01_10,#unit01_11").attr("fill","url(#svg_front_emblem)");//엠블렘, 쟈크, 스트랩 장식1, 스트랩 장식2, 왼쪽받침, 오른쪽받칩

	/*side*/
	side_bag_front_url= base_url+bag_type+"_side_base"+ bag_front+"_"+bag_front_pattern+".jpg"; //bag_front		
	$("#svg_side_front_img").attr("xlink:href", side_bag_front_url);
	$("#unit02_1").attr("fill","url(#svg_side_front)");//몸통 앞판

	side_bag_back_url= base_url+bag_type+"_side_base"+ bag_back+"_"+bag_back_pattern+".jpg"; //bag_back	
	$("#svg_side_back_img").attr("xlink:href", side_bag_back_url);
	$("#unit02_12").attr("fill","url(#svg_side_back)");//몸통 뒷판

	side_bag_strab_url = base_url+bag_type+"_side_base"+ bag_base +"_"+bag_front_pattern +".jpg";//bag_strab
	$("#svg_side_strab_img").attr("xlink:href", side_bag_strab_url);
	$("#unit02_2, #unit02_11").attr("fill","url(#svg_side_strab)");//스트랩, 몸통 밑판

	side_bag_side_url = base_url+bag_type+"_side_base"+ bag_side +"_"+bag_side_pattern +".jpg";//bag_side
	$("#svg_side_side_img").attr("xlink:href", side_bag_side_url);
	$("#unit02_3, #unit02_4").attr("fill","url(#svg_side_side)");//왼쪽날개, 오른쪽날개


	if(bag_glimm==false){//엠블렘 glimm 선택 20150915 추가
		side_emblem_url = base_url+bag_type+"_side_emblem"+ bag_emblem +".jpg";//bag_emblem
	}else{
		side_emblem_url = base_url+bag_type+"_side_glimm_emblem"+ bag_emblem +".jpg";//bag_glimm_emblem
	}

	$("#svg_side_emblem_img").attr("xlink:href", side_emblem_url);
	$("#unit02_6, #unit02_7, #unit02_8, #unit02_9, #unit02_10").attr("fill","url(#svg_side_emblem)");//엠블렘, 쟈크, 스트랩 장식1, 왼쪽받침, 오른쪽받칩

	side_bag_handle_url = base_url+bag_type+"_side_base"+ bag_handle +"_"+bag_front_pattern +".jpg";//bag_handl
	$("#svg_side_hadle_img").attr("xlink:href", side_bag_handle_url);
	$("#unit02_5").attr("fill","url(#svg_side_hadle)");//손잡이

	/*back*/
	back_bag_front_url= base_url+bag_type+"_back_base"+ bag_back+"_"+bag_back_pattern+".jpg"; //bag_front		
	$("#svg_back_back_img").attr("xlink:href", back_bag_front_url);
	$("#unit03_1").attr("fill","url(#svg_back_back)");//몸통 뒷판

	back_bag_strab_url = base_url+bag_type+"_back_base"+ bag_base +"_"+bag_front_pattern +".jpg";//bag_strab
	$("#svg_back_strab_img").attr("xlink:href", back_bag_strab_url);
	$("#unit03_2").attr("fill","url(#svg_back_strab)");//스트랩

	back_bag_side_url = base_url+bag_type+"_back_base"+ bag_side +"_"+bag_side_pattern +".jpg";//bag_side
	$("#svg_back_side_img").attr("xlink:href", back_bag_side_url);
	$("#unit03_3, #unit03_4").attr("fill","url(#svg_back_side)");//왼쪽날개, 오른쪽날개

	back_emblem_url = base_url+bag_type+"_back_emblem"+ bag_emblem +".jpg";//bag_emblem
	$("#svg_back_emblem_img").attr("xlink:href", back_emblem_url);
	$("#unit03_6, #unit03_7, #unit03_8, #unit03_9, #unit03_10, #unit03_11").attr("fill","url(#svg_back_emblem)");//엠블렘, 쟈크, 스트랩 장식1, 왼쪽받침, 오른쪽받칩

	back_bag_handle_url = base_url+bag_type+"_back_base"+ bag_handle +"_"+bag_front_pattern +".jpg";//bag_handl
	$("#svg_back_hadle_img").attr("xlink:href", back_bag_handle_url);
	$("#unit03_5").attr("fill","url(#svg_back_hadle)");//손잡이

	/*top*/
	top_bag_strab_url = base_url+bag_type+"_top_base"+ bag_base+"_"+bag_front_pattern+".jpg"; //bag_front(내피는 패턴영향을 받지 않음)
	$("#svg_top_strab_img").attr("xlink:href", top_bag_strab_url);
	$("#unit04_1").attr("fill","url(#svg_top_strab)");//몸통, 내피(스트랩 기본)

	top_bag_back_url = base_url+bag_type+"_top_base"+ bag_back+"_"+bag_back_pattern+".jpg"; //bag_front		
	$("#svg_top_back_img").attr("xlink:href", top_bag_back_url);
	$("#unit04_3").attr("fill","url(#svg_top_back)");//몸통 뒷판

	top_bag_front_url = base_url+bag_type+"_top_base"+ bag_front+"_"+bag_front_pattern+".jpg"; //bag_front		
	$("#svg_top_front_img").attr("xlink:href", top_bag_front_url);
	$("#unit04_2").attr("fill","url(#svg_top_front)");//몸통 앞판

	top_emblem_url = base_url+bag_type+"_top_emblem"+ bag_emblem +".jpg";//bag_emblem
	$("#svg_top_emblem_img").attr("xlink:href", top_emblem_url);
	$("#unit04_6, #unit04_7, #unit04_8").attr("fill","url(#svg_top_emblem)");//자크, 위쪽 단추, 아래쪽 단추

	top_bag_handle_url = base_url+bag_type+"_top_base"+ bag_handle +"_"+bag_front_pattern +".jpg";//bag_handl
	$("#svg_top_hadle_img").attr("xlink:href", top_bag_handle_url);
	$("#unit04_4, #unit04_5").attr("fill","url(#svg_top_hadle)");//위쪽 손잡이, 아래쪽 손잡이

	load_init(); //로딩 걷어냄
}//end ##커스텀 스킨 로드

//## svg 오버,클릭처리를 탭바로가기로 변경 및 more처리 20151113 ##//
function svg_mouse_ev(){
	var agent_chk = navigator.userAgent.toLowerCase();
	$(".tab_color a").click(function(){//컬러		
    var top  = $('.color_choice').position().top;
		if (agent_chk.indexOf("msie 9") != -1) {//ie9
			myScroll.scrollBy(0, -top);
		}else{
			myScroll.scrollToElement(".color_choice", "300");			
		}
		tab_option_init();
		$(this).parent().addClass("on");
		return false;
	});
	$(".tab_print a").click(function(){//프린트
    var top  = $('.pattern_choice').position().top - 48;
		if (agent.indexOf("msie 9") != -1) {//ie9
			myScroll.scrollBy(0, -top);
		}else{
			myScroll.scrollBy(0, -top,  "300");
		}
		tab_option_init();
		$(this).parent().addClass("on");
		return false;
	});
	$(".tab_emblem a").click(function(){//엠블렘
    var top  = $('.emblem_choice').position().top - 97;
		if (agent.indexOf("msie 9") != -1) {//ie9
			myScroll.scrollBy(0, -top);
		}else{
			myScroll.scrollBy(0, -top,  "300");
		}
		tab_option_init();
		$(this).parent().addClass("on");
		return false;
	});
	$(".tab_strap a").click(function(){//스트랩
    var top  = $('.strab_choice').position().top - 146;
		if (agent.indexOf("msie 9") != -1) {//ie9
			myScroll.scrollBy(0, -top);
		}else{
			myScroll.scrollBy(0, -top,  "300");
		}
		tab_option_init();
		$(this).parent().addClass("on");
		return false;
	});
	$(".tab_patch a").click(function(){//와펜
    var top  = $('.wappen_choice').position().top - 195;
		if (agent.indexOf("msie 9") != -1) {//ie9
			myScroll.scrollBy(0, -top);
		}else{
			myScroll.scrollBy(0, -top,  "300");
		}
		tab_option_init();
		$(this).parent().addClass("on");
		return false;
	});
}
function tab_option_init(){		
	$(".option_tab li").removeClass("on");
	$(".wappen_module").css("display","none");//wappen_module
	//$('.more_div').fadeOut("fast");// 좌측 more 처리 20151125 삭제
	//window.clearInterval(side_more_ani);// 좌측 more 처리 20151125 삭제
	wappen_grid = false;
}
//## svg 오버,클릭처리를 탭바로가기로 변경 및 more처리 20151113 end##//

//*************팝업 시작
function pop_vertical(){//팝업 센터 정렬
	var pop_height = $('.layer_popup .popup').outerHeight();
	var pop_height_device = -1 * (pop_height / 2);

	if (pop_height > $(window).height())
	{
		$('.layer_popup .popup').css("paddingTop", $(window).scrollTop());
	} else {		
		$('.layer_popup .popup').css("paddingTop", ($(window).height()/2) + pop_height_device + $(window).scrollTop());
	}
}

//팝업 닫기
function pop_close(){
	$('.layer_popup, .layer_bg').fadeOut('fast');
	$('#movPlayer').attr("src","about:blank"); //20151113 추가
}

function color_layer_open(num){//COLOR detail 슬라이더
	var link_slide = Number(num)-1;
	$('#color_layer, .layer_bg').fadeIn("fast",function(){
		pop_vertical();
		$('#baseColorSlider').flexslider({animation: "slide",slideshow: false, controlNav: false, animationSpeed:200});
		$('#baseColorSlider').flexslider(link_slide);
	});	
}

function print_layer_open(num){//PRINT detail 슬라이더
	var link_slide = Number(num)-1;
	$('#print_layer, .layer_bg').fadeIn("fast",function(){
		pop_vertical();
		$('#imagePrintSlider').flexslider({animation: "slide",slideshow: false, controlNav: false, animationSpeed:200});
		$('#imagePrintSlider').flexslider(link_slide);
	});	
}

function emblem_layer1_open(num){//EMBLEM detail 슬라이더1
	$('#emblem_layer1, .layer_bg').fadeIn("fast",function(){
		pop_vertical();
		$('#emblemSlider1').flexslider({animation: "slide",slideshow: false, controlNav: false, animationSpeed:200});
		$('#emblemSlider1').flexslider(num);
	});	
}
function emblem_layer2_open(num){//EMBLEM detail 슬라이더2
	$('#emblem_layer2, .layer_bg').fadeIn("fast",function(){
		pop_vertical();
		$('#emblemSlider2').flexslider({animation: "slide",slideshow: false, controlNav: false, animationSpeed:200});
		$('#emblemSlider2').flexslider(num);
	});	
}
function wappen_layer1_open(num){//WAPPEN detail 슬라이더1
	$('#wappen_layer1, .layer_bg').fadeIn("fast",function(){
		pop_vertical();
		$('#wappenSlider1').flexslider({animation: "slide",slideshow: false, controlNav: false, animationSpeed:200});
		$('#wappenSlider1').flexslider(num);
	});	
}
function wappen_layer2_open(num){//WAPPEN detail 슬라이더2
	$('#wappen_layer2, .layer_bg').fadeIn("fast",function(){
		pop_vertical();
		$('#wappenSlider2').flexslider({animation: "slide",slideshow: false, controlNav: false, animationSpeed:200});
		$('#wappenSlider2').flexslider(num);
	});	
}
function sns_popup_open(){//sns popup
	$('#sns_layer, .layer_bg').fadeIn("fast",function(){
		pop_vertical();
	});	
}
function login_popup_open(){//login popup
	$('#login_layer, .layer_bg').fadeIn("fast",function(){
		pop_vertical();
	});	
}
function not_member_popup_open(){//not_member_layer popup
	$('#not_member_layer, .layer_bg').fadeIn("fast",function(){
		pop_vertical();
	});	
}
function save_design_popup_open(){//save_design popup
	$('#save_design, .layer_bg').fadeIn("fast",function(){
		pop_vertical();
	});	
}
function add_cart_popup_open(){//add_cart popup 20150924 추가
	$('#addcart_layer, .layer_bg').fadeIn("fast",function(){
		pop_vertical();
	});	
}
function soldout_popup_open(){//soldout popup 20151113 추가
	$('#soldout_layer, .layer_bg').fadeIn("fast",function(){
		pop_vertical();
	});	
}

function glimme_popup_open(){//glimme_popup_open 20151214 동영상 변수추가
	$('#glime_detail, .layer_bg').fadeIn("fast",function(){
		$('#movPlayer').attr("src","http://www.youtube.com/embed/zXRRArarjVc?autoplay=1&amp;theme=light&amp;controls=0&amp;showinfo=0&amp;wmode=opaque&amp;rel=0");
		pop_vertical();
	});	
}
//*************팝업 끝

