var rule_guide = false;
var wappen_grid = false;
var guide_more = false;

var view_status = "front"; //view_status: front, side, back, top

var page_menu_toggle = false;

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

function load_init(){//loading
	$("#loading_div").fadeOut("fast");
}//end

$(window).load(function(){
	function side_menu_loaded () {//color 메뉴 스크롤
		var sort_tab_color = 65 * $("#btn_color_set li").length + 10; //컬러탭
		$("#btn_color_set").width(sort_tab_color);
		myScroll_color = new IScroll('#sort_wrap_color', { scrollX: true, scrollY: false,/* eventPassthrough: true, preventDefault: false,*/ freeScroll: true,mouseWheel: false, scrollbars: false, click: true });
	}
	side_menu_loaded();
	//end
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

			$('#side_svg,#back_svg,#top_svg').css("display","none");

			$("#sort_color_tab .tab01").css("backgroundImage","url("+img_url+"color/stephanie_color_small0.jpg)");
			$("#sort_color_tab .tab01").addClass("on");

			$("#sort_pattern_tab .tab01").css("backgroundImage","url("+img_url+"pattern/stephanie_pattern_small0.jpg)");
			$("#sort_pattern_tab .tab01").addClass("on");

			$("#sort_emblem_tab .tab01").css("backgroundImage","url("+img_url+"emblem/stephanie_emblem_small0.jpg)");
			$("#sort_emblem_tab .tab01").addClass("on");


			for(i =1; i < limit+1; i++){ //와펜 기본 삭제
				$("#wappen_svg_in"+i).css("display","none");
			}

			load_skin();	//skin load

		},
		function(){//load fail
			//alert("svg loading");			
		}
	);//###01.end

	//custom_view_click
	function view_init(){
		$('#front_svg, #side_svg, #back_svg, #top_svg').css("display","none");
	}
	$("#front_view").click(function(){
		view_init();
		$("#viewport_set span").removeClass("on");
		$(this).addClass("on");
		$('#front_svg').css("display","block");
	});
	$("#side_view").click(function(){
		view_init();
		$("#viewport_set span").removeClass("on");
		$(this).addClass("on");
		$('#side_svg').css("display","block");

		$(".wappen_module").css("display","none");//wappen_module
		wappen_grid = true;
	});
	$("#back_view").click(function(){
		view_init();
		$("#viewport_set span").removeClass("on");
		$(this).addClass("on");
		$('#back_svg').css("display","block");

		$(".wappen_module").css("display","none");//wappen_module
		wappen_grid = true;
	});
	$("#top_view").click(function(){
		view_init();
		$("#viewport_set span").removeClass("on");
		$(this).addClass("on");
		$('#top_svg').css("display","block");

		$(".wappen_module").css("display","none");//wappen_module
		wappen_grid = true;
	});
	//end. custom_view_click

	//###02.end	 

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

		return false;
	});
	$("#btn_pattern_set .select_change").click(function(){	//패턴탭
		$("#btn_pattern_set .select_change").removeClass("on");
		$(this).addClass("on");

		return false;
	});

	$("#sort_emblem_tab .tab01").click(function(){	//엠블렘 탭1_ basic
		$("#sort_emblem_tab .tab02").removeClass("on");
		$("#sort_emblem_tab .tab02").css("backgroundImage","none");
		$(this).addClass("on");
		$(this).css("backgroundImage","url("+img_url+"emblem/stephanie_emblem_small"+bag_emblem+".jpg)");
		$("#sort_wrap_emblem1").css("display","block");
		$("#sort_wrap_emblem2").css("display","none");

		bag_glimm = false;
		bag_emblem_url_make(bag_emblem); load_skin();
	});
	$("#sort_emblem_tab .tab02").click(function(){	//엠블렘 탭2_ glimm
		$("#sort_emblem_tab .tab01").removeClass("on");
		$("#sort_emblem_tab .tab01").css("backgroundImage","none");
		$(this).addClass("on");
		$(this).css("backgroundImage","url("+img_url+"emblem/stephanie_emblem_small"+bag_emblem+".jpg)");

		$("#sort_wrap_emblem1").css("display","none");
		$("#sort_wrap_emblem2").css("display","block");

		var sort_tab_emblem2 = 65 * $("#btn_emblem_set2 li").length + 10; //엠블렘2 탭
		$("#btn_emblem_set2").width(sort_tab_emblem2);
		myScroll_emblem2 = new IScroll('#sort_wrap_emblem2', { scrollX: true, scrollY: false,/* eventPassthrough: true, preventDefault: false,*/ freeScroll: true,mouseWheel: false, scrollbars: false, click: true });

		bag_glimm = true;
		bag_emblem_url_make(bag_emblem); load_skin();
	});
	$("#btn_emblem_set1 .select_change").click(function(){	//엠블렘 선택1_basic
		$("#btn_emblem_set1 .select_change").removeClass("on");
		$(this).addClass("on");

		$("#sort_emblem_tab .tab01").css("backgroundImage","url("+img_url+"emblem/stephanie_emblem_small"+bag_emblem+".jpg)");
		$("#btn_emblem_set2 .select_change").removeClass("on");
		$("#btn_emblem_set2 .select_change:eq("+bag_emblem+")").addClass("on");
		return false;
	});
	$("#btn_emblem_set2 .select_change").click(function(){	//엠블렘 선택2_glimm
		$("#btn_emblem_set2 .select_change").removeClass("on");
		$(this).addClass("on");

		$("#sort_emblem_tab .tab02").css("backgroundImage","url("+img_url+"emblem/stephanie_emblem_small"+bag_emblem+".jpg)");
		$("#btn_emblem_set1 .select_change").removeClass("on");
		$("#btn_emblem_set1 .select_change:eq("+bag_emblem+")").addClass("on");
		return false;
	});

	$(".strab_select_set button").click(function(){	//스트랩 선택
		$(".strab_select_set button").removeClass("on");
		$(this).addClass("on");

		return false;
	});
	$("#sort_wappen_tab .tab01").click(function(){//와펜 탭
		$("#sort_wappen_tab .tab02").removeClass('on');		
		$(this).addClass('on');
		$("#sort_wrap_wappen2").css("display","none");
		$("#sort_wrap_wappen1").css("display","block");	
	});
	$("#sort_wappen_tab .tab02").click(function(){
		$("#sort_wappen_tab .tab01").removeClass('on');		
		$(this).addClass('on');

		$("#sort_wrap_wappen2").css("display","block");
		$("#sort_wrap_wappen1").css("display","none");

		var sort_tab_wappen2 = 65 * $("#btn_wappen_set2 li").length + 10; //와펜2 탭
		$("#btn_wappen_set2").width(sort_tab_wappen2);
		myScroll_wappen2 = new IScroll('#sort_wrap_wappen2', { scrollX: true, scrollY: false,/* eventPassthrough: true, preventDefault: false,*/ freeScroll: true,mouseWheel: false, scrollbars: false, click: true });
	});

	$("#sort_color_tab .tab01").click(function(){//컬러 쵸이스
		custom_status = "color_base";
		tab_default();
		if($(this).hasClass("on")){
			$(this).addClass("on_on")
		}
		$(this).addClass("on");
		return false;
	});
	$("#sort_color_tab .tab02").click(function(){
		custom_status = "color_side";
		tab_default();
		if($(this).hasClass("on")){
			$(this).addClass("on_on")
		}
		$(this).addClass("on");
		return false;
	});	
	$("#sort_color_tab .tab03").click(function(){
		custom_status = "color_front";
		tab_default();
		if($(this).hasClass("on")){
			$(this).addClass("on_on")
		}
		$(this).addClass("on");
		return false;
	});	
	$("#sort_color_tab .tab04").click(function(){
		custom_status = "color_handle";
		tab_default();
		if($(this).hasClass("on")){
			$(this).addClass("on_on")
		}
		$(this).addClass("on");
		return false;
	});
	function tab_default(){
		$("#sort_color_tab .tab01").removeClass("on_on");
		$("#sort_color_tab .tab02").removeClass("on_on");
		$("#sort_color_tab .tab03").removeClass("on_on");
		$("#sort_color_tab .tab04").removeClass("on_on");
		if(bag_base == 0){
			$("#sort_color_tab .tab01").removeClass("on");
		}else{
			$("#sort_color_tab .tab01").addClass("on");
		}
		if(bag_side == 0){
			$("#sort_color_tab .tab02").removeClass("on");
		}else{
			$("#sort_color_tab .tab02").addClass("on");
		}
		if(bag_front == 0){
			$("#sort_color_tab .tab03").removeClass("on");
		}else{
			$("#sort_color_tab .tab03").addClass("on");
		}
		if(bag_handle == 0){
			$("#sort_color_tab .tab04").removeClass("on");
		}else{
			$("#sort_color_tab .tab04").addClass("on");
		}

	}
	//end	

	$("#sort_pattern_tab .tab01").click(function(){//패턴 쵸이스
		pattern_status = "pattern_body";
		tab_pt_default();
		if($(this).hasClass("on")){
			$(this).addClass("on_on")
		}
		$(this).addClass("on");
		return false;
	});	
	$("#sort_pattern_tab .tab02").click(function(){
		pattern_status = "pattern_front";
		tab_pt_default();
		if($(this).hasClass("on")){
			$(this).addClass("on_on")
		}
		$(this).addClass("on");
		return false;
	});	
	$("#sort_pattern_tab .tab03").click(function(){
		pattern_status = "pattern_side";
		tab_pt_default();
		if($(this).hasClass("on")){
			$(this).addClass("on_on")
		}
		$(this).addClass("on");
		return false;
	});
	function tab_pt_default(){
		$("#sort_pattern_tab .tab01").removeClass("on_on");
		$("#sort_pattern_tab .tab02").removeClass("on_on");
		$("#sort_pattern_tab .tab03").removeClass("on_on");
		if(bag_back_pattern == 0){
			$("#sort_pattern_tab .tab01").removeClass("on");
		}else{
			$("#sort_pattern_tab .tab01").addClass("on");
		}
		if(bag_front_pattern == 0){
			$("#sort_pattern_tab .tab02").removeClass("on");
		}else{
			$("#sort_pattern_tab .tab02").addClass("on");
		}
		if(bag_side_pattern == 0){
			$("#sort_pattern_tab .tab03").removeClass("on");
		}else{
			$("#sort_pattern_tab .tab03").addClass("on");
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

	//커스터마이징 탭
	$('#custom_navi li').click(function(){
		$('#custom_navi li').removeClass("on");
		$(this).addClass("on");
		custom_offset();
		custom_div_init();
		if($("#custom_navi .color").hasClass("on")){
			$('#choice_box_color').css("display","block");
		}else if($("#custom_navi .print").hasClass("on")){
			$('#choice_box_pattern').css("display","block");

			var sort_tab_pattern = 65 * $("#btn_pattern_set li").length + 10; //패턴탭
			$("#btn_pattern_set").width(sort_tab_pattern);
			myScroll_pattern = new IScroll('#sort_wrap_pattern', { scrollX: true, scrollY: false,/* eventPassthrough: true, preventDefault: false,*/ freeScroll: true,mouseWheel: false, scrollbars: false, click: true });

			$('.custom_info .print_info').css("display","block");

		}else if($("#custom_navi .emblem").hasClass("on")){
			$('#choice_box_emblem').css("display","block");

			var sort_tab_emblem1 = 65 * $("#btn_emblem_set1 li").length + 10; //엠블렘1 탭
			$("#btn_emblem_set1").width(sort_tab_emblem1);
			myScroll_emblem1 = new IScroll('#sort_wrap_emblem1', { scrollX: true, scrollY: false,/* eventPassthrough: true, preventDefault: false,*/ freeScroll: true,mouseWheel: false, scrollbars: false, click: true });

			$('.custom_info .emblem_info').css("display","block");

		}else if($("#custom_navi .strab").hasClass("on")){
			$('#choice_box_strab').css("display","block");

			$('.custom_info .strab_info').css("display","block");

		}else if($("#custom_navi .patch").hasClass("on")){
			var sort_tab_wappen1 = 65 * $("#btn_wappen_set1 li").length + 10; //와펜1 탭
			$('#choice_box_wappen').css("display","block");
			$("#btn_wappen_set1").width(sort_tab_wappen1);
			myScroll_wappen1 = new IScroll('#sort_wrap_wappen1', { scrollX: true, scrollY: false,/* eventPassthrough: true, preventDefault: false,*/ freeScroll: true,mouseWheel: false, scrollbars: false, click: true });

			$('.custom_info .patch_info').css("display","block");

		}else{return false;}

	});
	function custom_div_init(){
		$("#page_menu").removeClass("on"); //페이지 메뉴 close
		$("#btn_custom_page").css("display","none");
		page_menu_toggle = false;

		$("#gride_rule1").css("display","none"); //자 close
		rule_guide = false;


		$('#choice_box_color').css("display","none");
		$('#choice_box_pattern').css("display","none");
		$('#choice_box_emblem').css("display","none");
		$('#choice_box_strab').css("display","none");
		$('#choice_box_wappen').css("display","none");
	}
	//end .커스터마이징 탭

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

		//$("#sort_color_tab li").css("backgroundImage","url("+img_url+"color/stephanie_color_small"+bag_base+".jpg)"); 20150918 삭제
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

function load_skin(){//##커스텀 스킨 로드!

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

	if(bag_glimm==false){//엠블렘 glimm 선택
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

	side_emblem_url = base_url+bag_type+"_side_emblem"+ bag_emblem +".jpg";//bag_emblem
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
	top_bag_strab_url = base_url+bag_type+"_top_base"+ bag_base+"_0.jpg"; //bag_front(내피는 패턴영향을 받지 않음)
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

function custom_offset(){//커스텀 페이지 offset 20151113 속도갑 300으로 수정
	$('html, body').stop().animate({ scrollTop: 160 }, 300);
	return false;
}//end 커스텀 페이지 offset