var soldout_chk = false; //품절 20150915
$(document).ready(function(){

	$("#fabric_wappen .select_change, #metal_wappen .select_change, #wappen_del").click(function(){//### 1.사이즈 선택, 주소값, 제외 영역 처리

		wappen_url = img_url + "wappen/wappen_set_"+wappen_status+wappen_num+".png"; //와펜 이미지 주소 생성

		$("#fabric_wappen .select_change, #metal_wappen .select_change, #wappen_del").removeClass("on");
		$(this).addClass("on");

		if($(this).hasClass("on")){
			$(this).parent().parent().parent().parent().parent().parent().parent().css("background","#dfdfdf");
		}

		if($(this).find("img").hasClass("soldout")){//와펜클릭시 품절 체크 20150915
			soldout_chk = true;
		}else{
			soldout_chk = false;
		}

		if(wappen_status=="small"){//small 사이즈
			for(var i in delete_big_rec) {
				$("#wappen_svg"+delete_big_rec[i]).removeClass("off_sel");
			}
			for(var i in delete_small_rec) {
				$("#wappen_svg"+delete_small_rec[i]).addClass("off_sel");
			}
			$('.wappen_module').removeClass("big_modlue"); //small패치 일때 그리드판
		}else if(wappen_status=="big"){//big사이즈
			for(var i in delete_big_rec) {
				$("#wappen_svg"+delete_big_rec[i]).addClass("off_sel");
			}
			$('.wappen_module').addClass("big_modlue"); //big패치 일때 그리드판
		}else{//del
			for(var i in delete_big_rec) {
				$("#wappen_svg"+delete_big_rec[i]).removeClass("off_sel");
			}
			for(var i in delete_small_rec) {
				$("#wappen_svg"+delete_small_rec[i]).addClass("off_sel");
			}
			$('.wappen_module').removeClass("big_modlue"); //small패치 일때 그리드판
		}

		view_status='front';//viewside front
		$("#front_view").click();

		wappen_grid = true;
		$(".wappen_module").css("display","block");

		$("#rule_guide").removeClass("on");//rule_guide 20150915 추가
		$("#gride_rule1").css("display","none");
		rule_guide = false;

	});//###1.end

	$("#wappen_grid, #wappen_reset").click(function(){//### 1.1 리셋 추가 20151027
		view_status='front';//viewside front
		$("#front_view").click();
	});//###1.1 end

	function wappen_click_ev(wappen_status, wappen_index){//### 2.와펜 클릭 이벤트

		var wappen_index1 = wappen_index;//선택자 big 영역
		var wappen_index2 = Number(wappen_index)+1;
		var wappen_index3 = Number(wappen_index)+7;
		var wappen_index4 = Number(wappen_index)+8;

		var wappen_index5 = Number(wappen_index)-8;//선택자 over group1 (왼쪽 상단)
		var wappen_index6 = Number(wappen_index)-7;
		var wappen_index7 = Number(wappen_index)-6;
		var wappen_index8 = Number(wappen_index)-1;
		var wappen_index9 = Number(wappen_index)+6;

		var wappen_index10 = Number(wappen_index)-5;//선택자 over group1 (오른쪽 하단)
		var wappen_index11 = Number(wappen_index)+2;
		var wappen_index12 = Number(wappen_index)+9;
		var wappen_index13 = Number(wappen_index)+13;
		var wappen_index14 = Number(wappen_index)+14;
		var wappen_index15 = Number(wappen_index)+15;
		var wappen_index16 = Number(wappen_index)+16;

		function small_big_chk_ev(chk1,chk2,chk3,chk4){//big체크 big속성 제거 event
			$("#wappen_svg"+chk1).attr("big_click","false");//big_click 속성 제거 1
			$("#wappen_svg"+chk1).attr("big_chk","false");//big_chk 속성 제거 1
			$("#wappen_svg"+chk2).attr("big_chk","false");//big_chk 속성 제거 2
			$("#wappen_svg"+chk3).attr("big_chk","false");//big_chk 속성 제거 3
			$("#wappen_svg"+chk4).attr("big_chk","false");//big_chk 속성 제거 4

			if(big_select_num.indexOf(chk1) != -1){//중첩num array 삭제 - small 1
				var removeItem = chk1;
				var removeImg = big_select_num.length - 1; //big_select_Imgnum index
				big_select_num = jQuery.grep(big_select_num, function(value) {return value != removeItem;});			
				//console.log(removeImg); 20151125 삭제
				big_select_Imgnum.splice(removeImg, 1);

			}
			if(select_num.indexOf(chk1) != -1){//중첩num array 삭제 - 기본 1
				var removeItem = chk1;
				select_num = jQuery.grep(select_num, function(value) {return value != removeItem;});
			}
			if(select_num.indexOf(chk2) != -1){//중첩num array 삭제 - 기본 2
				var removeItem = chk2;
				select_num = jQuery.grep(select_num, function(value) {return value != removeItem;});
			}
			if(select_num.indexOf(chk3) != -1){//중첩num array 삭제 - 기본 3
				var removeItem = chk3;
				select_num = jQuery.grep(select_num, function(value) {return value != removeItem;});
			}
			if(select_num.indexOf(chk4) != -1){//중첩num array 삭제 - 기본 4
				var removeItem = chk4;
				select_num = jQuery.grep(select_num, function(value) {return value != removeItem;});
			}
				$('#wappen_svg_in'+chk1).attr({"xlink:href": wappen_url_none, "width":"75px", "height":"95px"});//big_sel 디자인 제거 1 
				$('#wappen_svg_in'+chk2).attr({"xlink:href": wappen_url_none, "width":"75px", "height":"95px"});//big_sel 디자인 제거 2 
				$('#wappen_svg_in'+chk3).attr({"xlink:href": wappen_url_none, "width":"75px", "height":"95px"});//big_sel 디자인 제거 3 
				$('#wappen_svg_in'+chk4).attr({"xlink:href": wappen_url_none, "width":"75px", "height":"95px"});//big_sel 디자인 제거 4 
				$('#wappen_svg_in'+chk1).css("display","none");
				$('#wappen_svg_in'+chk2).css("display","none");
				$('#wappen_svg_in'+chk3).css("display","none");
				$('#wappen_svg_in'+chk4).css("display","none");					

				/*20151027 side 와펜 추가 start*/
				$('#wappen_svg_in_side'+chk1).attr({"xlink:href": wappen_url_none, "width":"75px", "height":"95px"});//big_sel 디자인 제거 1 
				$('#wappen_svg_in_side'+chk2).attr({"xlink:href": wappen_url_none, "width":"75px", "height":"95px"});//big_sel 디자인 제거 2 
				$('#wappen_svg_in_side'+chk3).attr({"xlink:href": wappen_url_none, "width":"75px", "height":"95px"});//big_sel 디자인 제거 3 
				$('#wappen_svg_in_side'+chk4).attr({"xlink:href": wappen_url_none, "width":"75px", "height":"95px"});//big_sel 디자인 제거 4 
				$('#wappen_svg_in_side'+chk1).css("display","none");
				$('#wappen_svg_in_side'+chk2).css("display","none");
				$('#wappen_svg_in_side'+chk3).css("display","none");
				$('#wappen_svg_in_side'+chk4).css("display","none");
				/*20151027 side 와펜 추가 end*/

		}
		function big_over_chk_ev(chk1,chk2,chk3,chk4){//big충돌시 삭제 event

			$("#wappen_svg_in"+chk1).attr({"xlink:href": wappen_url_none, "width":"75px", "height":"95px"});////big_선택 체크
			$("#wappen_svg_in"+chk2).attr({"xlink:href": wappen_url_none, "width":"75px", "height":"95px"});
			$("#wappen_svg_in"+chk3).attr({"xlink:href": wappen_url_none, "width":"75px", "height":"95px"});
			$("#wappen_svg_in"+chk4).attr({"xlink:href": wappen_url_none, "width":"75px", "height":"95px"});
			$('#wappen_svg_in'+chk1).css("display","none");
			$('#wappen_svg_in'+chk2).css("display","none");
			$('#wappen_svg_in'+chk3).css("display","none");
			$('#wappen_svg_in'+chk4).css("display","none");

			/*20151027 side 와펜 추가 start*/
			$("#wappen_svg_in_side"+chk1).attr({"xlink:href": wappen_url_none, "width":"75px", "height":"95px"});////big_선택 체크
			$("#wappen_svg_in_side"+chk2).attr({"xlink:href": wappen_url_none, "width":"75px", "height":"95px"});
			$("#wappen_svg_in_side"+chk3).attr({"xlink:href": wappen_url_none, "width":"75px", "height":"95px"});
			$("#wappen_svg_in_side"+chk4).attr({"xlink:href": wappen_url_none, "width":"75px", "height":"95px"});
			$('#wappen_svg_in_side'+chk1).css("display","none");
			$('#wappen_svg_in_side'+chk2).css("display","none");
			$('#wappen_svg_in_side'+chk3).css("display","none");
			$('#wappen_svg_in_side'+chk4).css("display","none");
			/*20151027 side 와펜 추가 end*/

			$("#wappen_svg"+chk1).attr("big_click","false");//big_click 속성 체크
			$("#wappen_svg"+chk2).attr("big_click","false");
			$("#wappen_svg"+chk3).attr("big_click","false");
			$("#wappen_svg"+chk4).attr("big_click","false");

			$("#wappen_svg"+chk1).attr("big_chk","false");//big_chk 속성 체크
			$("#wappen_svg"+chk2).attr("big_chk","false");
			$("#wappen_svg"+chk3).attr("big_chk","false");
			$("#wappen_svg"+chk4).attr("big_chk","false");

			if(big_select_num.indexOf(chk1) != -1){//중첩num array 삭제 - big
				var removeItem = chk1;
				var removeImg = big_select_num.indexOf(removeItem); //big_select_Imgnum index

				big_select_num = jQuery.grep(big_select_num, function(value) {return value != removeItem;});			
				big_select_Imgnum.splice(removeImg, 1);
			}

			if(select_num.indexOf(chk1) != -1){//중첩num array 삭제 - 기본
				var removeItem = chk1;
				select_num = jQuery.grep(select_num, function(value) {return value != removeItem;});
			}
			if(select_num.indexOf(chk2) != -1){//중첩num array 삭제 - 기본
				var removeItem = chk2;
				select_num = jQuery.grep(select_num, function(value) {return value != removeItem;});
			}
			if(select_num.indexOf(chk3) != -1){//중첩num array 삭제 - 기본
				var removeItem = chk3;
				select_num = jQuery.grep(select_num, function(value) {return value != removeItem;});
			}
			if(select_num.indexOf(chk4) != -1){//중첩num array 삭제 - 기본
				var removeItem = chk4;
				select_num = jQuery.grep(select_num, function(value) {return value != removeItem;});
			}
		}
			if(wappen_status=="small"){//##2-1. small 일때

				if($("#wappen_svg"+wappen_index1).attr("big_chk") == "true"){//big 속성 체크

					if($("#wappen_svg"+wappen_index1).attr("big_click")=="true"){//1번 1번					
						small_big_chk_ev(wappen_index1,wappen_index2,wappen_index3,wappen_index4);
					}else if($("#wappen_svg"+wappen_index8).attr("big_click")=="true"){//1번 8번
						small_big_chk_ev(wappen_index8,wappen_index1,wappen_index9,wappen_index3);
					}else if($("#wappen_svg"+wappen_index6).attr("big_click")=="true"){//1번 6번
						small_big_chk_ev(wappen_index6,wappen_index1,wappen_index2,wappen_index7);
					}else if($("#wappen_svg"+wappen_index5).attr("big_click")=="true"){//1번 5번
						small_big_chk_ev(wappen_index5,wappen_index1,wappen_index6,wappen_index8);
					}else{return false;}

				}//end big 속성 체크

				if($("#wappen_svg"+wappen_index1).attr("small_chk") == "true"){//small 중첩일때	
					var removeItem = wappen_index1;
					var removeImg = small_select_num.indexOf(removeItem); //small_select_Imgnum index
					small_select_num = jQuery.grep(small_select_num, function(value) {return value != removeItem;	});
					small_select_Imgnum.splice(removeImg, 1);	

					small_select_num.push(wappen_index1);//삭제후 push
					small_select_Imgnum.push(wappen_num);

				}else{//small 중첩 아닐때
					if ($.inArray(wappen_index1, small_select_num) == -1) {//작은 사이즈 array 추가
						small_select_num.push(wappen_index1);					
						small_select_Imgnum.push(wappen_num); //작은 사이즈 Img array 추가
					}
					if ($.inArray(wappen_index1, select_num) == -1) {//기본 array 추가 - small 1
						select_num.push(wappen_index1);
					}
				}

				$("#wappen_svg"+wappen_index1).attr("small_chk","true");//small self 속성
				$('#wappen_svg_in'+wappen_index1).css("display","block");//small design 처리
				$('#wappen_svg_in'+wappen_index1).attr({"xlink:href": wappen_url, "width":"75px", "height":"95px"});

				/*20151027 side 와펜 추가 start*/
				$('#wappen_svg_in_side'+wappen_index1).css("display","block");//small design 처리
				$('#wappen_svg_in_side'+wappen_index1).attr({"xlink:href": wappen_url, "width":"75px", "height":"95px"});
				/*20151027 side 와펜 추가 end*/

				if(soldout_chk == true){//품절체크 20150915
					$('#wappen_svg_in'+wappen_index1).attr("opacity","0.3");
					$('#wappen_svg_in_side'+wappen_index1).attr("opacity","0.3");/*20151027 추가*/
					$("#custom_layout").append('<div class="custom_tooltip toolbox'+wappen_index1+'"><div class="tipBody">해당옵션은 품절되었습니다.<br/> 다른 옵션을 선택해주세요.</div></div>');  
					$('.toolbox'+wappen_index1).css('top', $('#wappen_svg_in'+wappen_index1).offset().top - 155);
					$('.toolbox'+wappen_index1).css('left', $('#wappen_svg_in'+wappen_index1).offset().left - 45);
					var custom_tooltip = window.setInterval(function(){
						window.clearInterval(custom_tooltip);
						$('.toolbox'+wappen_index1).fadeOut("fast",function(){
							$('.toolbox'+wappen_index1).remove();
						});
					}, 1000);

				}else{
					$('#wappen_svg_in'+wappen_index1).attr("opacity","1.0");
					$('#wappen_svg_in_side'+wappen_index1).attr("opacity","1.0");/*20151027 추가*/
				}

			}else if(wappen_status=="big"){//##2-2. big 일때
																																												 
				if($("#wappen_svg"+wappen_index1).attr("big_click") == "true"){//#충돌 이벤트 처리(1번 클릭= 같은이미지)

					big_over_chk_ev(wappen_index1,wappen_index2,wappen_index3,wappen_index4);//삭제처리하고
					big_select_num.push(wappen_index1); 
					big_select_Imgnum.push(wappen_num); //큰사이즈 Img array 추가

				}else{

					if($("#wappen_svg"+wappen_index1).attr("big_chk")=="true"){//#1번 충돌

						if($("#wappen_svg"+wappen_index5).attr("big_click")=="true"){//1번 5번
							big_over_chk_ev(wappen_index5,wappen_index1,wappen_index6,wappen_index8);
						}else if($("#wappen_svg"+wappen_index8).attr("big_click")=="true"){//1번 8번
							big_over_chk_ev(wappen_index8,wappen_index1,wappen_index3,wappen_index9);
						}else if($("#wappen_svg"+wappen_index6).attr("big_click")=="true"){//1번 6번
							big_over_chk_ev(wappen_index6,wappen_index1,wappen_index2,wappen_index7);
						}else{return false;}
						//console.log("big_sell1: " + wappen_index1+" 겹침");
					}
					if($("#wappen_svg"+wappen_index2).attr("big_chk")=="true"){//#2번 충돌

						if($("#wappen_svg"+wappen_index7).attr("big_click")=="true"){//2번 7번
							big_over_chk_ev(wappen_index7,wappen_index2,wappen_index10,wappen_index11);						
						}else if($("#wappen_svg"+wappen_index2).attr("big_click")=="true"){//2번 2번
							big_over_chk_ev(wappen_index2,wappen_index4,wappen_index11,wappen_index12);
						}else{return false;}
						//console.log("big_sell2: " + wappen_index2+" 겹침");
					}
					if($("#wappen_svg"+wappen_index3).attr("big_chk")=="true"){//#3번 충돌

						if($("#wappen_svg"+wappen_index9).attr("big_click")=="true"){//3번 9번
							big_over_chk_ev(wappen_index9,wappen_index3,wappen_index13,wappen_index14);
						}else if($("#wappen_svg"+wappen_index3).attr("big_click")=="true"){//3번 3번
							big_over_chk_ev(wappen_index3,wappen_index4,wappen_index14,wappen_index15);
						}else{return false;}
						//console.log("big_sell3: " + wappen_index3+" 겹침");
					}
					if($("#wappen_svg"+wappen_index4).attr("big_chk")=="true"){//#4번 충돌

						if($("#wappen_svg"+wappen_index4).attr("big_click")=="true"){//4번 이후 4번
							big_over_chk_ev(wappen_index4,wappen_index12,wappen_index15,wappen_index16);
						}else{return false;}
						//console.log("big_sell4: " + wappen_index4+" 겹침");
					}
				}//#end 충돌 이벤트 처리

				if ($.inArray(wappen_index1, big_select_num) == -1){//큰사이즈 array 추가
					big_select_num.push(wappen_index1); 
					big_select_Imgnum.push(wappen_num); //큰사이즈 Img array 추가
				}
				if ($.inArray(wappen_index1, select_num) == -1){//기본 array 추가(오른쪽상단: 클릭영역)
					select_num.push(wappen_index1);
				}
				if ($.inArray(wappen_index2, select_num) == -1){//기본 array 추가(왼쪽상단)
					select_num.push(wappen_index2);
				}
				if ($.inArray(wappen_index3, select_num) == -1){//기본 array 추가(오른쪽하단)
					select_num.push(wappen_index3);
				}
				if ($.inArray(wappen_index4, select_num) == -1){//기본 array 추가(왼쪽하단)
					select_num.push(wappen_index4);
				}

				if(small_select_num.indexOf(wappen_index1) != -1){//중첩num array 삭제 - small 1
					var removeItem = wappen_index1;
					var removeImg = small_select_num.indexOf(removeItem); //small_select_Imgnum index
					small_select_num = jQuery.grep(small_select_num, function(value) {return value != removeItem;});
					small_select_Imgnum.splice(removeImg, 1);
				}
				if(small_select_num.indexOf(wappen_index2) != -1){//중첩num array 삭제 - small 2
					var removeItem = wappen_index2;
					var removeImg = small_select_num.indexOf(removeItem); //small_select_Imgnum index
					small_select_num = jQuery.grep(small_select_num, function(value) {return value != removeItem;});
					small_select_Imgnum.splice(removeImg, 1);
				}
				if(small_select_num.indexOf(wappen_index3) != -1){//중첩num array 삭제 - small 3
					var removeItem = wappen_index3;
					var removeImg = small_select_num.indexOf(removeItem); //small_select_Imgnum index
					small_select_num = jQuery.grep(small_select_num, function(value) {return value != removeItem;});
					small_select_Imgnum.splice(removeImg, 1);
				}
				if(small_select_num.indexOf(wappen_index4) != -1){//중첩num array 삭제 - small 4
					var removeItem = wappen_index4;
					var removeImg = small_select_num.indexOf(removeItem); //small_select_Imgnum index
					small_select_num = jQuery.grep(small_select_num, function(value) {return value != removeItem;});
					small_select_Imgnum.splice(removeImg, 1);
				}

				$("#wappen_svg"+wappen_index1).attr("big_click","true");//big_click 속성 체크

				$("#wappen_svg"+wappen_index1).attr({"small_chk":"false"});//small 속성 없앰
				$("#wappen_svg"+wappen_index2).attr({"small_chk":"false"});
				$("#wappen_svg"+wappen_index3).attr({"small_chk":"false"});
				$("#wappen_svg"+wappen_index4).attr({"small_chk":"false"});

				$("#wappen_svg"+wappen_index1).attr({"big_chk":"true"});//big 속성 체크
				$("#wappen_svg"+wappen_index2).attr({"big_chk":"true"});
				$("#wappen_svg"+wappen_index3).attr({"big_chk":"true"});
				$("#wappen_svg"+wappen_index4).attr({"big_chk":"true"});

				$('#wappen_svg_in'+wappen_index1).attr({"xlink:href": wappen_url, "width":"150px", "height":"190px"});//design 처리
				$('#wappen_svg_in'+wappen_index2).attr({"xlink:href": wappen_url_none, "width":"75px", "height":"95px"});
				$('#wappen_svg_in'+wappen_index3).attr({"xlink:href": wappen_url_none, "width":"75px", "height":"95px"});
				$('#wappen_svg_in'+wappen_index4).attr({"xlink:href": wappen_url_none, "width":"75px", "height":"95px"});
				$('#wappen_svg_in'+wappen_index1).css("display","block");
				$('#wappen_svg_in'+wappen_index2).css("display","none");
				$('#wappen_svg_in'+wappen_index3).css("display","none");
				$('#wappen_svg_in'+wappen_index4).css("display","none");

				/*20151027 side 와펜 추가 start*/
				$('#wappen_svg_in_side'+wappen_index1).attr({"xlink:href": wappen_url, "width":"150px", "height":"190px"});//design 처리
				$('#wappen_svg_in_side'+wappen_index2).attr({"xlink:href": wappen_url_none, "width":"75px", "height":"95px"});
				$('#wappen_svg_in_side'+wappen_index3).attr({"xlink:href": wappen_url_none, "width":"75px", "height":"95px"});
				$('#wappen_svg_in_side'+wappen_index4).attr({"xlink:href": wappen_url_none, "width":"75px", "height":"95px"});
				$('#wappen_svg_in_side'+wappen_index1).css("display","block");
				$('#wappen_svg_in_side'+wappen_index2).css("display","none");
				$('#wappen_svg_in_side'+wappen_index3).css("display","none");
				$('#wappen_svg_in_side'+wappen_index4).css("display","none");
				/*20151027 side 와펜 추가 end*/

				if(soldout_chk == true){//품절체크 20150915
					$('#wappen_svg_in'+wappen_index1).attr("opacity","0.3");
					$('#wappen_svg_in_side'+wappen_index1).attr("opacity","0.3");/*20151027 추가*/

					$("#custom_layout").append('<div class="custom_tooltip toolbox'+wappen_index1+'"><div class="tipBody">해당옵션은 품절되었습니다.<br/> 다른 옵션을 선택해주세요.</div></div>');  
					$('.toolbox'+wappen_index1).css('top', $('#wappen_svg_in'+wappen_index1).offset().top - 125);
					$('.toolbox'+wappen_index1).css('left', $('#wappen_svg_in'+wappen_index1).offset().left - 20);
					var custom_tooltip = window.setInterval(function(){
						window.clearInterval(custom_tooltip);
						$('.toolbox'+wappen_index1).fadeOut("fast",function(){
							$('.toolbox'+wappen_index1).remove();
						});
					}, 1000);
				}else{
					$('#wappen_svg_in'+wappen_index1).attr("opacity","1.0");
					$('#wappen_svg_in_side'+wappen_index1).attr("opacity","1.0");/*20151027 추가*/
				}

			}else{//## 2-3. 삭제 일때

				if($("#wappen_svg"+wappen_index1).attr("big_chk") == "true"){//big 일때

					if($("#wappen_svg"+wappen_index1).attr("big_click")=="true"){//1번 1번
						big_over_chk_ev(wappen_index1,wappen_index2,wappen_index3,wappen_index4);
					}else if($("#wappen_svg"+wappen_index8).attr("big_click")=="true"){//1번 8번
						big_over_chk_ev(wappen_index8,wappen_index1,wappen_index3,wappen_index9);
					}else if($("#wappen_svg"+wappen_index6).attr("big_click")=="true"){//1번 6번
						big_over_chk_ev(wappen_index6,wappen_index1,wappen_index2,wappen_index7);
					}else if($("#wappen_svg"+wappen_index5).attr("big_click")=="true"){//1번 5번
						big_over_chk_ev(wappen_index5,wappen_index1,wappen_index6,wappen_index8);
					}else{return false;}

				}else if($("#wappen_svg"+wappen_index1).attr("small_chk") == "true"){//small 일때
					$("#wappen_svg"+wappen_index1).attr("small_chk","false");
					$('#wappen_svg_in'+wappen_index1).css("display","none");

					/*20151027 side 와펜 추가 start*/
					$('#wappen_svg_in_side'+wappen_index1).css("display","none");
					/*20151027 side 와펜 추가 end*/

					if(small_select_num.indexOf(wappen_index1) != -1){//중첩num array 삭제 - small 1
						var removeItem = wappen_index1;
						var removeImg = small_select_num.indexOf(removeItem); //small_select_Imgnum index
						small_select_num = jQuery.grep(small_select_num, function(value) {return value != removeItem;	});
						small_select_Imgnum.splice(removeImg, 1);
					}
					if(select_num.indexOf(wappen_index1) != -1){//중첩num array 삭제 - 기본
						var removeItem = wappen_index1;
						select_num = jQuery.grep(select_num, function(value) {return value != removeItem;	});
					}
				}else{return false;}
			}	
	}

	$(".wappen_svg").click(function(){
		var wappen_index = $(".selelct li").index(this)+1;//선택자
		wappen_click_ev(wappen_status, wappen_index);
	});//###2.end

	//### 3.저장된 small,big array load
	//wappen_click_ev("small",1);
	//wappen_click_ev("big",3);	
	for(var i in small_select_num) {//small array
		wappen_click_ev("small",small_select_num[i]);
		//console.log(small_select_num[i]);
	}
	for(var i in big_select_num) {//big array
		wappen_click_ev("big",big_select_num[i]);
		//console.log(big_select_num[i]);
	}//###3.end

});
function wappen_reset(){// 리셋
	if(confirm("리셋하시겠습니까?")){
		for(i =1; i < limit+1; i++){
			$("#wappen_svg"+i).attr("small_chk","false");		
			$("#wappen_svg"+i).attr("big_click","false");
			$("#wappen_svg"+i).attr("big_chk","false");
			$("#wappen_svg_in"+i).css("display","none");

			/*20151027 side 와펜 추가 start*/
			$("#wappen_svg_in_side"+i).css("display","none");
			/*20151027 side 와펜 추가 end*/

			select_num = new Array(); //기본 array
			small_select_num = new Array(); // 작은패치 array
			big_select_num = new Array(); // 큰패치 array

			small_select_Imgnum = new Array(); // small Img Array load
			big_select_Imgnum = new Array(); // big Img Array load
		}
	}else{return false;}
}