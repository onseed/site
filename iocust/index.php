<!DOCTYPE HTML>
<html lang="ko">
<head>

<? include("header.php"); ?>

<script type="text/javascript">
var getParam = function(key){
	var _parammap = {};
	document.location.search.replace(/\??(?:([^=]+)=([^&]*)&?)/g, function () {
		function decode(s) {
			return decodeURIComponent(s.split("+").join(" "));
		}
		_parammap[decode(arguments[1])] = decode(arguments[2]);
	});
	return _parammap[key];
};
for (i =1; i<8 ; i++){
	eval("mdColor_unit"+i+" = getParam('mdColor_unit"+i+"');");
	eval("if(mdColor_unit"+i+"==null){mdColor_unit"+i+" =0}");
}

patch_unit = getParam('patch_unit');
if(patch_unit==null){patch_unit=0}


matchArray1 = new Array("A1","B1","C1","D1","E1");//얼굴
matchArray2 = new Array("A2","A4","B2","B4","C2","D2","E2");//자켓
matchArray3 = new Array("A3","B3");//내의
matchArray4 = new Array("A6","B6","C3","D4","E4");//치마
matchArray5 = new Array("A5","A7","B5","B7","C4","D3","D5","E3","E5");//장갑
matchArray6 = new Array("A8","B8","C5","D6","E6");//타이즈
matchArray7 = new Array("A9","B9","C6","D7","E7");//신발
mainPage = true;
</script>
</head>
<body>
<div class="wrap">
	<!--## navigation ##-->
	<? include("navigation.php"); ?>
	<!--##// navigation ##-->

	<!--01.main_custom-->
	<div id="main_custom">
		<div class="main_title"><span>CUSTOM PLATFORM</span> <a href="#" target="_blank" class="btnClass oc">OTHER CASE</a> </div>
		<script>
		$(document).ready(function(){			
			if(isMobile == true){
				$(".btnClass.oc").attr("href","../cstudio/mobile/customize_view1.html");
			}else{
				$(".btnClass.oc").attr("href","../cstudio/pc/customize_view1.html");
			}			
		});
		</script>
		<div class="mainSliderBtn">
			<a href="#" class="prevBtn" id="unitPrev"><img src="img/mainPrev01.png"></a>
			<a href="#" class="nextBtn" id="unitNext"><img src="img/mainNext01.png"></a>
		</div>
		<!--############################################# custom_visual #############################################-->
		<div id="custom_visual">
			<div id="svg_sean">
				<? include("svg.php"); ?>
			</div>
		</div>
		<!--#############################################// custom_visual #############################################-->

		<div class="slideArea" id="slideBock">
			<ul>
				<li>1</li>
				<li>2</li>
				<li>3</li>
				<li>4</li>
				<li>5</li>
				<li>6</li>
				<li>7</li>
				<li>8</li>
			</ul>
		</div>

		<!--############################################# custom menu #############################################-->
		<div class="fixmenu">
		
			<!--normalTool-->
			<div class="normalTool">
			
				<div class="rightMenu product">
					<span class="toggleTitle none">PRODUCT</span>
					<ul>
						<li><a href="#" class="icn icn01 on" title="jarket"></a></li>
						<li><a href="#" class="icn icn02" title="sweat shirt"></a></li>
						<li><a href="#" class="icn icn03" title="gloves"></a></li>
						<li><a href="#" class="icn icn04" title="skirt"></a></li>
						<li><a href="#" class="icn icn05" title="tights"></a></li>
						<li><a href="#" class="icn icn06" title="boots"></a></li>
					</ul>				
				</div>

				<div class="rightMenu color">
					<a href="#" class="toggleTitle on">COLOR</a>
					<ul class="menuUl ul01 on">
						<li><a href="#" class="col col00" onclick="color_match2(0)" title="white"><span></span></a></li>
						<li><a href="#" class="col col01" onclick="color_match2(1)" title="gray"><span></span></a></li>
						<li><a href="#" class="col col02" onclick="color_match2(2)" title="black"><span></span></a></li>
						<li><a href="#" class="col col03" onclick="color_match2(3)" title="light brown"><span></span></a></li>
						<li><a href="#" class="col col04" onclick="color_match2(4)" title="brown"><span></span></a></li>
						<li><a href="#" class="col col05" onclick="color_match2(5)" title="red"><span></span></a></li>
						<li><a href="#" class="col col06" onclick="color_match2(6)" title="green"><span></span></a></li>
						<li><a href="#" class="col col07" onclick="color_match2(7)" title="indigo"><span></span></a></li>
						<li><a href="#" class="col col08" onclick="color_match2(8)" title="purple"><span></span></a></li>
					</ul>
					<ul class="menuUl ul02">
						<li><a href="#" class="col col00" onclick="color_match3(0)" title="white"><span></span></a></li>
						<li><a href="#" class="col col01" onclick="color_match3(1)" title="gray"><span></span></a></li>
						<li><a href="#" class="col col02" onclick="color_match3(2)" title="black"><span></span></a></li>
						<li><a href="#" class="col col03" onclick="color_match3(3)" title="light brown"><span></span></a></li>
						<li><a href="#" class="col col04" onclick="color_match3(4)" title="brown"><span></span></a></li>
						<li><a href="#" class="col col05" onclick="color_match3(5)" title="red"><span></span></a></li>
						<li><a href="#" class="col col06" onclick="color_match3(6)" title="green"><span></span></a></li>
						<li><a href="#" class="col col07" onclick="color_match3(7)" title="indigo"><span></span></a></li>
						<li><a href="#" class="col col08" onclick="color_match3(8)" title="purple"><span></span></a></li>
					</ul>
					<ul class="menuUl ul03">
						<li><a href="#" class="col col00" onclick="color_match5(0)" title="white"><span></span></a></li>
						<li><a href="#" class="col col01" onclick="color_match5(1)" title="gray"><span></span></a></li>
						<li><a href="#" class="col col02" onclick="color_match5(2)" title="black"><span></span></a></li>
						<li><a href="#" class="col col03" onclick="color_match5(3)" title="light brown"><span></span></a></li>
						<li><a href="#" class="col col04" onclick="color_match5(4)" title="brown"><span></span></a></li>
						<li><a href="#" class="col col05" onclick="color_match5(5)" title="red"><span></span></a></li>
						<li><a href="#" class="col col06" onclick="color_match5(6)" title="green"><span></span></a></li>
						<li><a href="#" class="col col07" onclick="color_match5(7)" title="indigo"><span></span></a></li>
						<li><a href="#" class="col col08" onclick="color_match5(8)" title="purple"><span></span></a></li>
					</ul>
					<ul class="menuUl ul04">
						<li><a href="#" class="col col00" onclick="color_match4(0)" title="white"><span></span></a></li>
						<li><a href="#" class="col col01" onclick="color_match4(1)" title="gray"><span></span></a></li>
						<li><a href="#" class="col col02" onclick="color_match4(2)" title="black"><span></span></a></li>
						<li><a href="#" class="col col03" onclick="color_match4(3)" title="light brown"><span></span></a></li>
						<li><a href="#" class="col col04" onclick="color_match4(4)" title="brown"><span></span></a></li>
						<li><a href="#" class="col col05" onclick="color_match4(5)" title="red"><span></span></a></li>
						<li><a href="#" class="col col06" onclick="color_match4(6)" title="green"><span></span></a></li>
						<li><a href="#" class="col col07" onclick="color_match4(7)" title="indigo"><span></span></a></li>
						<li><a href="#" class="col col08" onclick="color_match4(8)" title="purple"><span></span></a></li>
					</ul>
					<ul class="menuUl ul05">
						<li><a href="#" class="col col00" onclick="color_match6(0)" title="white"><span></span></a></li>
						<li><a href="#" class="col col01" onclick="color_match6(1)" title="gray"><span></span></a></li>
						<li><a href="#" class="col col02" onclick="color_match6(2)" title="black"><span></span></a></li>
						<li><a href="#" class="col col03" onclick="color_match6(3)" title="light brown"><span></span></a></li>
						<li><a href="#" class="col col04" onclick="color_match6(4)" title="brown"><span></span></a></li>
						<li><a href="#" class="col col05" onclick="color_match6(5)" title="red"><span></span></a></li>
						<li><a href="#" class="col col06" onclick="color_match6(6)" title="green"><span></span></a></li>
						<li><a href="#" class="col col07" onclick="color_match6(7)" title="indigo"><span></span></a></li>
						<li><a href="#" class="col col08" onclick="color_match6(8)" title="purple"><span></span></a></li>
					</ul>
					<ul class="menuUl ul06">
						<li><a href="#" class="col col00" onclick="color_match7(0)" title="white"><span></span></a></li>
						<li><a href="#" class="col col01" onclick="color_match7(1)" title="gray"><span></span></a></li>
						<li><a href="#" class="col col02" onclick="color_match7(2)" title="black"><span></span></a></li>
						<li><a href="#" class="col col03" onclick="color_match7(3)" title="light brown"><span></span></a></li>
						<li><a href="#" class="col col04" onclick="color_match7(4)" title="brown"><span></span></a></li>
						<li><a href="#" class="col col05" onclick="color_match7(5)" title="red"><span></span></a></li>
						<li><a href="#" class="col col06" onclick="color_match7(6)" title="green"><span></span></a></li>
						<li><a href="#" class="col col07" onclick="color_match7(7)" title="indigo"><span></span></a></li>
						<li><a href="#" class="col col08" onclick="color_match7(8)" title="purple"><span></span></a></li>
					</ul>
				</div>
				<div class="rightMenu print">
					<a href="#" class="toggleTitle">PRINT</a>
					<ul class="menuUl">
						<li><a href="#" class="pnt pnt00" style="background-image:url('img/patch/patch_none.png');" onclick="pacth_match(0)" title="없음"><span></span></a></li>
						<li><a href="#" class="pnt pnt01" style="background-image:url('img/patch/patch1.png');" onclick="pacth_match(1)" title="tiger"><span></span></a></li>
						<li><a href="#" class="pnt pnt02" style="background-image:url('img/patch/patch2.png');" onclick="pacth_match(2)" title="flower hart"><span></span></a></li>
						<li><a href="#" class="pnt pnt03" style="background-image:url('img/patch/patch3.png');" onclick="pacth_match(3)" title="flower white skull"><span></span></a></li>
						<li><a href="#" class="pnt pnt04" style="background-image:url('img/patch/patch4.png');" onclick="pacth_match(4)" title="flower ivory skull"><span></span></a></li>
						<li><a href="#" class="pnt pnt05" style="background-image:url('img/patch/patch5.png');" onclick="pacth_match(5)" title="lion"><span></span></a></li>
						<li><a href="#" class="pnt pnt06" style="background-image:url('img/patch/patch6.png');" onclick="pacth_match(6)" title="dinosaur"><span></span></a></li>
						<li><a href="#" class="pnt pnt07" style="background-image:url('img/patch/patch7.png');" onclick="pacth_match(7)" title="wolf"><span></span></a></li>
						<li><a href="#" class="pnt pnt08" style="background-image:url('img/patch/patch8.png');" onclick="pacth_match(8)" title="bulldog"><span></span></a></li>
					</ul>
				</div>

				<div class="btnArea">				
					<a href="#" onclick="custOk()" class="btnClass impot">COMPLETE</a>
				</div>

			</div>
			<!--//normalTool-->
		</div>


		<!--mobileTool-->
		<div class="mobileOptionProduct" style="height:100%;">
			<ul>
				<li><a href="#" class="icn icn01 on" title="jarket"></a></li>
				<li><a href="#" class="icn icn02" title="sweat shirt"></a></li>
				<li><a href="#" class="icn icn03" title="gloves"></a></li>
				<li><a href="#" class="icn icn04" title="skirt"></a></li>
				<li><a href="#" class="icn icn05" title="tights"></a></li>
				<li><a href="#" class="icn icn06" title="boots"></a></li>
			</ul>
		</div>
		<div class="mobileOptionTool">
			<ul class="tab">
				<li class="on"><a href="#" id="tab01">COLOR</a></li>
				<li><a href="#" id="tab02">PRINT</a></li>
				<li><a href="#" id="tab03">CUSTOM SET</a></li>
			</ul>
			<div class="bottomMenu color">
				<div style="width:530px;">
					<ul class="menuUl ul01 on">
						<li><a href="#" class="col col00" onclick="color_match2(0)" title="white"><span></span></a></li>
						<li><a href="#" class="col col01" onclick="color_match2(1)" title="gray"><span></span></a></li>
						<li><a href="#" class="col col02" onclick="color_match2(2)" title="black"><span></span></a></li>
						<li><a href="#" class="col col03" onclick="color_match2(3)" title="light brown"><span></span></a></li>
						<li><a href="#" class="col col04" onclick="color_match2(4)" title="brown"><span></span></a></li>
						<li><a href="#" class="col col05" onclick="color_match2(5)" title="red"><span></span></a></li>
						<li><a href="#" class="col col06" onclick="color_match2(6)" title="green"><span></span></a></li>
						<li><a href="#" class="col col07" onclick="color_match2(7)" title="indigo"><span></span></a></li>
						<li><a href="#" class="col col08" onclick="color_match2(8)" title="purple"><span></span></a></li>
					</ul>
					<ul class="menuUl ul02">
						<li><a href="#" class="col col00" onclick="color_match3(0)" title="white"><span></span></a></li>
						<li><a href="#" class="col col01" onclick="color_match3(1)" title="gray"><span></span></a></li>
						<li><a href="#" class="col col02" onclick="color_match3(2)" title="black"><span></span></a></li>
						<li><a href="#" class="col col03" onclick="color_match3(3)" title="light brown"><span></span></a></li>
						<li><a href="#" class="col col04" onclick="color_match3(4)" title="brown"><span></span></a></li>
						<li><a href="#" class="col col05" onclick="color_match3(5)" title="red"><span></span></a></li>
						<li><a href="#" class="col col06" onclick="color_match3(6)" title="green"><span></span></a></li>
						<li><a href="#" class="col col07" onclick="color_match3(7)" title="indigo"><span></span></a></li>
						<li><a href="#" class="col col08" onclick="color_match3(8)" title="purple"><span></span></a></li>
					</ul>
					<ul class="menuUl ul03">
						<li><a href="#" class="col col00" onclick="color_match5(0)" title="white"><span></span></a></li>
						<li><a href="#" class="col col01" onclick="color_match5(1)" title="gray"><span></span></a></li>
						<li><a href="#" class="col col02" onclick="color_match5(2)" title="black"><span></span></a></li>
						<li><a href="#" class="col col03" onclick="color_match5(3)" title="light brown"><span></span></a></li>
						<li><a href="#" class="col col04" onclick="color_match5(4)" title="brown"><span></span></a></li>
						<li><a href="#" class="col col05" onclick="color_match5(5)" title="red"><span></span></a></li>
						<li><a href="#" class="col col06" onclick="color_match5(6)" title="green"><span></span></a></li>
						<li><a href="#" class="col col07" onclick="color_match5(7)" title="indigo"><span></span></a></li>
						<li><a href="#" class="col col08" onclick="color_match5(8)" title="purple"><span></span></a></li>
					</ul>
					<ul class="menuUl ul04">
						<li><a href="#" class="col col00" onclick="color_match4(0)" title="white"><span></span></a></li>
						<li><a href="#" class="col col01" onclick="color_match4(1)" title="gray"><span></span></a></li>
						<li><a href="#" class="col col02" onclick="color_match4(2)" title="black"><span></span></a></li>
						<li><a href="#" class="col col03" onclick="color_match4(3)" title="light brown"><span></span></a></li>
						<li><a href="#" class="col col04" onclick="color_match4(4)" title="brown"><span></span></a></li>
						<li><a href="#" class="col col05" onclick="color_match4(5)" title="red"><span></span></a></li>
						<li><a href="#" class="col col06" onclick="color_match4(6)" title="green"><span></span></a></li>
						<li><a href="#" class="col col07" onclick="color_match4(7)" title="indigo"><span></span></a></li>
						<li><a href="#" class="col col08" onclick="color_match4(8)" title="purple"><span></span></a></li>
					</ul>
					<ul class="menuUl ul05">
						<li><a href="#" class="col col00" onclick="color_match6(0)" title="white"><span></span></a></li>
						<li><a href="#" class="col col01" onclick="color_match6(1)" title="gray"><span></span></a></li>
						<li><a href="#" class="col col02" onclick="color_match6(2)" title="black"><span></span></a></li>
						<li><a href="#" class="col col03" onclick="color_match6(3)" title="light brown"><span></span></a></li>
						<li><a href="#" class="col col04" onclick="color_match6(4)" title="brown"><span></span></a></li>
						<li><a href="#" class="col col05" onclick="color_match6(5)" title="red"><span></span></a></li>
						<li><a href="#" class="col col06" onclick="color_match6(6)" title="green"><span></span></a></li>
						<li><a href="#" class="col col07" onclick="color_match6(7)" title="indigo"><span></span></a></li>
						<li><a href="#" class="col col08" onclick="color_match6(8)" title="purple"><span></span></a></li>
					</ul>
					<ul class="menuUl ul06">
						<li><a href="#" class="col col00" onclick="color_match7(0)" title="white"><span></span></a></li>
						<li><a href="#" class="col col01" onclick="color_match7(1)" title="gray"><span></span></a></li>
						<li><a href="#" class="col col02" onclick="color_match7(2)" title="black"><span></span></a></li>
						<li><a href="#" class="col col03" onclick="color_match7(3)" title="light brown"><span></span></a></li>
						<li><a href="#" class="col col04" onclick="color_match7(4)" title="brown"><span></span></a></li>
						<li><a href="#" class="col col05" onclick="color_match7(5)" title="red"><span></span></a></li>
						<li><a href="#" class="col col06" onclick="color_match7(6)" title="green"><span></span></a></li>
						<li><a href="#" class="col col07" onclick="color_match7(7)" title="indigo"><span></span></a></li>
						<li><a href="#" class="col col08" onclick="color_match7(8)" title="purple"><span></span></a></li>
					</ul>				
				</div>
			</div>
			<div class="bottomMenu print">
				<div style="width:530px;">
					<ul class="menuUl">
						<li><a href="#" class="pnt pnt00" style="background-image:url('img/patch/patch_none.png');" onclick="pacth_match(0)" title="없음"><span></span></a></li>
						<li><a href="#" class="pnt pnt01" style="background-image:url('img/patch/patch1.png');" onclick="pacth_match(1)" title="tiger"><span></span></a></li>
						<li><a href="#" class="pnt pnt02" style="background-image:url('img/patch/patch2.png');" onclick="pacth_match(2)" title="flower hart"><span></span></a></li>
						<li><a href="#" class="pnt pnt03" style="background-image:url('img/patch/patch3.png');" onclick="pacth_match(3)" title="flower white skull"><span></span></a></li>
						<li><a href="#" class="pnt pnt04" style="background-image:url('img/patch/patch4.png');" onclick="pacth_match(4)" title="flower ivory skull"><span></span></a></li>
						<li><a href="#" class="pnt pnt05" style="background-image:url('img/patch/patch5.png');" onclick="pacth_match(5)" title="lion"><span></span></a></li>
						<li><a href="#" class="pnt pnt06" style="background-image:url('img/patch/patch6.png');" onclick="pacth_match(6)" title="dinosaur"><span></span></a></li>
						<li><a href="#" class="pnt pnt07" style="background-image:url('img/patch/patch7.png');" onclick="pacth_match(7)" title="wolf"><span></span></a></li>
						<li><a href="#" class="pnt pnt08" style="background-image:url('img/patch/patch8.png');" onclick="pacth_match(8)" title="bulldog"><span></span></a></li>
					</ul>		
				</div>
			</div>
			<div class="bottomMenu set">
				<div style="width:640px;">
					<ul class="menuUl">
						<li>
							<span></span>
							<a href="#" onclick="mdColor_unit2=1;mdColor_unit3=0;mdColor_unit4=2;mdColor_unit5=1;mdColor_unit6=1;mdColor_unit7=2;patch_unit=1; load_init2(); "><img src="img/data/customSet1.png" alt="custom set"/></a>
						</li>
						<li>
							<span></span>
							<a href="#" onclick="mdColor_unit2=2;mdColor_unit3=2;mdColor_unit4=2;mdColor_unit5=2;mdColor_unit6=2;mdColor_unit7=2;patch_unit=7; load_init2();"><img src="img/data/customSet2.png" alt="custom set"/></a>
						</li>
						<li>
							<span></span>
							<a href="#" onclick="mdColor_unit2=3;mdColor_unit3=0;mdColor_unit4=2;mdColor_unit5=2;mdColor_unit6=0;mdColor_unit7=3;patch_unit=5; load_init2();"><img src="img/data/customSet3.png" alt="custom set"/></a>
						</li>
						<li>
							<span></span>
							<a href="#" onclick="mdColor_unit2=4;mdColor_unit3=2;mdColor_unit4=2;mdColor_unit5=3;mdColor_unit6=0;mdColor_unit7=2;patch_unit=4; load_init2();"><img src="img/data/customSet4.png" alt="custom set"/></a>
						</li>
						<li>
							<span></span>
							<a href="#" onclick="mdColor_unit2=5;mdColor_unit3=0;mdColor_unit4=5;mdColor_unit5=5;mdColor_unit6=1;mdColor_unit7=5;patch_unit=2; load_init2();"><img src="img/data/customSet5.png" alt="custom set"/></a>
						</li>
						<li>
							<span></span>
							<a href="#" onclick="mdColor_unit2=6;mdColor_unit3=0;mdColor_unit4=4;mdColor_unit5=6;mdColor_unit6=0;mdColor_unit7=2;patch_unit=6; load_init2();"><img src="img/data/customSet6.png" alt="custom set"/></a>
						</li>
						<li>
							<span></span>
							<a href="#" onclick="mdColor_unit2=8;mdColor_unit3=0;mdColor_unit4=7;mdColor_unit5=2;mdColor_unit6=0;mdColor_unit7=8;patch_unit=3; load_init2();"><img src="img/data/customSet7.png" alt="custom set"/></a>
						</li>
					</ul>		
				</div>
			</div>

			<div class="btnArea">
				<a href="#" onclick="custOk()" class="btnClass impot">COMPLETE</a>
			</div>			
		</div>
		<!--mobileTool-->

		<!--zoomTool-->
		<div class="zoomTool">
			<a href="#" onclick="zoom_end()" class="zoomClose"><img src="img/btnPopClose.png" alt="close"/></a>

			<ul class="svgZoom">
				<li><a href="#" onclick="svgZoomIn()"><img src="img/icn_zoom.png" alt="ZoomIn"></a></li>
				<li><a href="#" onclick="svgZoomRe()"><img src="img/icn_zoom3.png" alt="ZoomReset"></a></li>
				<li><a href="#" onclick="svgZoomOut()"><img src="img/icn_zoom2.png" alt="ZoomOut"></a></li>
			</ul>

		</div>
		<!--//zoomTool-->

		<div class="customSetArea">
			<div class="title">CUSTOM SET </div>
			<div class="customSetList">
				<ul>
					<li>
						<span></span>
						<!--<a href="index.php?mdColor_unit2=1&mdColor_unit3=0&mdColor_unit4=2&mdColor_unit5=1&mdColor_unit6=1&mdColor_unit7=2&patch_unit=1"><img src="img/data/customSet1.png" alt="custom set"/></a>-->
						<a href="#" onclick="mdColor_unit2=1;mdColor_unit3=0;mdColor_unit4=2;mdColor_unit5=1;mdColor_unit6=1;mdColor_unit7=2;patch_unit=1; load_init2();"><img src="img/data/customSet1.png" alt="custom set"/></a>
					</li>
					<li>
						<span></span>
						<a href="#" onclick="mdColor_unit2=2;mdColor_unit3=2;mdColor_unit4=2;mdColor_unit5=2;mdColor_unit6=2;mdColor_unit7=2;patch_unit=7; load_init2();"><img src="img/data/customSet2.png" alt="custom set"/></a>
					</li>
					<li>
						<span></span>
						<a href="#" onclick="mdColor_unit2=3;mdColor_unit3=0;mdColor_unit4=2;mdColor_unit5=2;mdColor_unit6=0;mdColor_unit7=3;patch_unit=5; load_init2();"><img src="img/data/customSet3.png" alt="custom set"/></a>
					</li>
					<li>
						<span></span>
						<a href="#" onclick="mdColor_unit2=4;mdColor_unit3=2;mdColor_unit4=2;mdColor_unit5=3;mdColor_unit6=0;mdColor_unit7=2;patch_unit=4; load_init2();"><img src="img/data/customSet4.png" alt="custom set"/></a>
					</li>
					<li>
						<span></span>
						<a href="#" onclick="mdColor_unit2=5;mdColor_unit3=0;mdColor_unit4=5;mdColor_unit5=5;mdColor_unit6=1;mdColor_unit7=5;patch_unit=2; load_init2();"><img src="img/data/customSet5.png" alt="custom set"/></a>
					</li>
					<li>
						<span></span>
						<a href="#" onclick="mdColor_unit2=6;mdColor_unit3=0;mdColor_unit4=4;mdColor_unit5=6;mdColor_unit6=0;mdColor_unit7=2;patch_unit=6; load_init2();"><img src="img/data/customSet6.png" alt="custom set"/></a>
					</li>
					<li>
						<span></span>
						<a href="#" onclick="mdColor_unit2=8;mdColor_unit3=0;mdColor_unit4=7;mdColor_unit5=2;mdColor_unit6=0;mdColor_unit7=8;patch_unit=3; load_init2();"><img src="img/data/customSet7.png" alt="custom set"/></a>
					</li>
				</ul>
			</div>
		</div>

		
		<a href="#" id="zoompage" onclick="zoom_start()"><img src="img/icn_zoom.png" alt="zoomStart"/></a>
		<a href="#" id="pageMove"></a>

		<!--#############################################// custom menu #############################################-->

		<!--############################################# resultLayer #############################################-->
		<div class="resultLayer" id="resultLayer" >
			<!--## SVG 저장용 ##-->
			<div id="capLayout">
				<canvas id="canvas_capture"><img src="img/render/ren01.jpg" id="cap_img"></canvas>
				<div class="capImgblock"></div>
			</div>
			<!--##// SVG 저장용 ##-->
			<a href="#" id="resultLayerClose" class="resultClose"><img src="img/btnPopClose.png" alt="close"/></a>

			<!--resultInfo-->
			<div class="resultInfo">
				<div class="tableArea">
					<div class="infoTl">CUSTOM BOOK</div>
					<div class="divTable">
						<ul>
							<li>
								<span class="codeIcn codeImg2"></span>
								<span class="codeText codeText2">codeText1</span>
							</li>
							<li>
								<span class="codeIcn codeImg3"></span>
								<span class="codeText codeText3">codeText2</span>
							</li>
							<li>
								<span class="codeIcn codeImg4"></span>
								<span class="codeText codeText4">codeText3</span>
							</li>
							<li>
								<span class="codeIcn codeImg5"></span>
								<span class="codeText codeText5">codeText4</span>
							</li>
							<li>
								<span class="codeIcn codeImg6"></span>
								<span class="codeText codeText6">codeText5</span>
							</li>
							<li>
								<span class="codeIcn codeImg7"></span>
								<span class="codeText codeText7">codeText6</span>
							</li>
							<li>
								<span class="codeIcn codeImg8"><img src="img/patch/patch0.png" alt=""/></span>
								<span class="codeText codeText8">codeText7</span>
							</li>
						<ul>						
					</div>
				</div>				
				<div class="snsArea">
					<div class="infoTl">COPY URL</div>
					<div class="codCopy" ><input type="text" id="codCopyText"/></div>					
					<a href="#" onclick="copyToClipboard(document.getElementById('codCopyText').value)" class="copyBtn">COPY</a>
				</div>

				<div class="btnArea">
					<a href="#" id="resultImgSave" class="btnClass impot">IMAGE DOWNLOAD</a>
				</div>
			</div>
			<!--//resultInfo-->

		</div>
		<!--############################################# resultLayer #############################################-->

		<? include("footer.php"); ?>

	</div>
	<!--//01.main_ustom-->

</div>
<script type="text/javascript" src="js/main.js"></script><!-- plattform.js -->
</body>
</html>