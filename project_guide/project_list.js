$(function($){
	var tbl = $('#tabCont1'), //"#tabCont1"는 컨텐츠 리스트용
		$pId = $('#tabCont1 .p_id'),
		$mId = $('#tabCont1 .m_id'),
		popStyle = $('.popView');
		
	
	function open(e){// 팝업용 링크		
		e.preventDefault();
		var base = $(this),
			link = null,
			name = '_blank', 
	        width = base.attr('data-width');
	        height = base.attr('data-height');
	        align = 'center',
	        top = 0,
	        left = 0,
	        toolbar = 'no',	       
	        menubar = 'no',
	        status = 'no',
	        resizable = 'no',
	        scrollbars = base.attr('data-scroll');
	        	
		if (align === 'center') {
			var w_w = $(window).outerWidth() / 2,
				w_h = $(window).outerHeight() / 2;			
			left = w_w - (width / 2);
			top = w_h - (height / 2);
		}
		if (link !== null) {
			href = link;
		}
		var specs = 'width=' + width + ', height='+ height + ', left=' + left + ', top=' + top;
			specs += ', toolbar=' + toolbar + ', location = no' + 'resizable=' + resizable + ', status=' + status + ', menubar=' + menubar + ', scrollbars=' + scrollbars;		
		window.open(this.href, name , specs);
	}
	$(popStyle).off('click.popup').on('click.popup', open);
	// 팝업용 링크. end
	
	//담당자 data
	var $pOwnerL = $('.p_owner');
	$pOwnerL.each(function(i) {
		var $this = $(this),
			owner = $this.closest('tr').attr('data-user');
		
		if (owner === 'J') {
			$this.text('정과장');
		} else if (owner === 'K') {
			$this.text('김대리');
		} else if (owner === 'C') {
			$this.text('최차장');
		}		
	});//담당자 data.end
	
	$pId.each(function(i) {//pc용 링크 만들기
		if ($pId.eq(i).find('a').length > 0) {
			$(this).attr('data-link', 'Y');
			
			 if ($pId.eq(i).data('link') === 'Y') {				
				var pLink = $(this).find('a'),	
					pHref = $(this).find('a').attr('href'),
					pUrlLast = pHref.substr(pHref.lastIndexOf('/')+1), 
					pUrlLast2 = pUrlLast.split('.');
				
				$(pLink).text(pUrlLast2[0]);
			}
		}		
	});//end  
	
	$mId.each(function(i) {//모바일용 링크 만들기
		if ($mId.eq(i).find('a').length > 0) {
			$(this).attr('data-link', 'Y');
			
			 if ($mId.eq(i).data('link') === 'Y') {				
				var mLink = $(this).find('a'),	
					mHref = $(this).find('a').attr('href'),
					mUrlLast = mHref.substr(mHref.lastIndexOf('/')+1), 
					mUrlLast2 = mUrlLast.split('.'); 
				
				$(mLink).text(mUrlLast2[0]);
			}
		}		
	}); //end
	

	
	$('.tabWrap li a').click(function(e){//탭처리
		//e.preventDefault();
		$("html").animate({scrollTop:0});
		$('.tabWrap li').removeClass("on");
		$(this).parent('li').addClass("on");
		if($(this).attr("href")=="#tabCont1"){			
			$("#tabCont1").css("display","table");
			$("#tabCont2").css("display","none");
		}else{
			$("#tabCont1").css("display","none");
			$("#tabCont2").css("display","table");			
		}
	});//end
	
	/*검색처리*/
 	var $tableTds = $("#tabCont1 tbody td:nth-child(1), #tabCont1 tbody td:nth-child(2), #tabCont1 tbody td:nth-child(3), #tabCont1 tbody td:nth-child(4), #tabCont1 tbody td:nth-child(5)"); //테이블 선택
 	$tableTds.each(function() {//검색용 data 워드 적용
		$(this).attr('data-original', $(this).text()); 	
	});
 	$("#keyword").focus(function(){//인풋 포커스시
 		$('.tabWrap li a').eq(0).click();//사이트 리스트
 		$('#tabCont1 tbody td.min').click();//접혀진 td 펼치기
 		$(this).addClass('ready');
 		$tableTds.each(function() {//검색용 data 워드 적용
    		$(this).addClass('ready');
    	});
 		$(".siteInfo .infoL .view").css("display","block"); //선택수
 	});
 	$("#keyword").blur(function(){//인풋 불러시시
 		$(this).removeClass('ready');
 		$tableTds.each(function() {//검색용 data 워드 적용
    		$(this).removeClass('ready');
    	});
 		$(".siteInfo .infoL .view").css("display","none"); //선택수
 	});
	$("#keyword").keyup(function(){
		var k = $("#keyword").val();
		$("#tabCont1 tbody td").parent().hide();
		//var temp = $("#table1 ul li:nth-child(1):contains('"+k+"'), #table1 ul li:nth-child(2):contains('"+k+"'), #table1 ul li:nth-child(3):contains('"+k+"')");
		var temp = $("#tabCont1 td:contains('"+k+"')");
		$(temp).parent().show();
		
		$("#tabCont1 tbody td").each(function() {
			$(this).html($(this).data('original'));
		});		
        
		$("#tabCont1 tbody td[data-original*=\""+k+"\"]").each(function() {
			$(this).text($(this).data('original'));
	        var content = '';
	        content = String(k);			
		    var originaltxt = String($(this).data('original'));
	        $(this).html(originaltxt.replace(content, "<span class='highligter'>" + content + "</span>"));
	    });
		var seach_length = $("#tabCont1 tbody tr:visible").find('.p_id').length;
		
		$("#p_view").text(seach_length);//선택수
	});
 	/*검색처리.end*/
	
	 if(window.location.href.indexOf("#tabCont2") > -1){//가이드 파라미터일때
		$('.tabWrap li a').eq(1).click();		
	 }//end
});

// JavaScript Document
$(document).ready(function () {
	var $table = $('#tabCont1');
	var $tableBody = $table.find('tbody');
	var $SelDepth1 = $table.find('#depth1');
	var $SelDepth2 = $table.find('#depth2');
	var $tableTr = $tableBody.find('tr');
	var depth1Str = undefined;
	var depth1Seq = undefined;
	var depth2Str = undefined;
	var depth2Seq = undefined;

	var menuObj = {};
	
	// 넘버링을 위한 태그 추가 
	$table.find('colgroup').prepend('<col style="width:26px" />');
	$table.find('thead').find('tr').eq(0).prepend('<th scope="col">No</th>');
	
	//선택 수 표시
	function viewLine(index, st){
		if(st == true){
			$("#p_view").text(index);
			$("#p_view").closest(".view").css("display","inline-block");			
		}else{
			$("#p_view").closest(".view").css("display","none");
		}

	}//end
	
	/*작업현황 표시*/
	var txtobj_ing = '<i class="ing"></i>',
		txtobj_pl = '<i class="pl"></i>',
		txtobj_cl = '<i class="cl"></i>',
		txtobj_dv = '<i class="dv"></i>',
		txtobj_ok = '<i class="ok"></i>';
	
	$table.find('td.p_sta').each(function(){
		var $this = $(this),
			$status = $this.next('td.status');
		if($this.text() == "" || $this.text() == " "){//날짜가 없으면
			$status.prepend(txtobj_ing); //진행
			//$this.closest('tr').attr('data-status',5);
			$status.attr('data-status',"진행");
		}else{//날짜가 있으면
			if($status.text()==1){
				$status.html(txtobj_pl); //1차 검수(기획)
				$status.attr('data-status',"1차 검수(기획)");
			}else if($status.text()==2){
				$status.html(txtobj_cl); //2차 검수(고객)
				$status.attr('data-status',"2차 검수(고객)");
			}else if($status.text()==3){
				$status.html(txtobj_dv); //수정(개발)
				$status.attr('data-status',"수정");
			}else{
				$status.html(txtobj_ok); //완료
				$status.attr('data-status',"완료");
			}			
		}
	});	
	/*작업현황 표시.end*/
	
	/*테이릅 td 토글*/
	var guideAddon = {
			init : function(eqNum, close){
				let thisWd = $('#tabCont1 colgroup col').eq(eqNum+1).css("width");
				var $tdEl =  $('#tabCont1 tbody tr').find('td:eq('+eqNum+')'),
					$thEl =  $('#tabCont1 thead th').eq(eqNum+1);
				$tdEl.css("cursor","pointer");
				$tdEl.on('click',function(){
					if($tdEl.hasClass('min')){
						$thEl.removeClass('min').find('.more').remove();
						$('#tabCont1 colgroup col').eq(eqNum+1).css("width",thisWd);
						$tdEl.removeClass('min');						
					}else{
						$thEl.addClass('min').append('<p class="more">+</p>');
						$('#tabCont1 colgroup col').eq(eqNum+1).css("width","20px");						
						$tdEl.addClass('min');
					}
				});
				if(close == true){//닫기옵션이면 닫음
					$('#tabCont1 tbody tr').eq(1).find('td:eq('+eqNum+')').click();
				}
			}
	}	
	guideAddon.init(3);
	guideAddon.init(4, true);
	/*테이릅 td 토글.end*/	
	
	// 대메뉴 메뉴 데이터 생성
	$tableTr.each(function (idx) {
		var $depth1 = $(this).find('td').eq(0);
		var $depth2 = $(this).find('td').eq(1);
		if ($depth1.text().trim() != '') {
			depth1Str = $depth1.text();
			depth1Seq = idx;
			if (!menuObj[idx]) { menuObj[idx] = {}; }
			menuObj[idx].menuNm = $depth1.text();
		}
		if ($depth2.text().trim() != '') {
			depth2Str = $depth2.text();
			depth2Seq = idx;
		}
		$(this).attr('data-seq1', depth1Seq).attr('data-depth1', depth1Str).attr('data-depth2', depth2Str).attr('data-seq2', depth2Seq);
		
		// 넘버링
		$(this).prepend('<td class="td_num">'+ (idx + 1)+ '</td>');
	});
	
	// 대메뉴 메뉴 데이터 생성
	$tableTr.each(function (idx) {
		if (!menuObj[$(this).attr('data-seq1')].lowerMenu) {
			menuObj[$(this).attr('data-seq1')].lowerMenu = {};
		}
		menuObj[$(this).attr('data-seq1')].lowerMenu[$(this).attr('data-seq2')] = $(this).attr('data-depth2');
	});
	
	// 대메뉴 Option 태그 생성
	var arrHtmlStr = new Array();
	arrHtmlStr.push('<option value="">##선택##</option>');
	for (var name in menuObj) {
		arrHtmlStr.push('<option value="' + name + '">' + menuObj[name].menuNm + '</option>');
	}
	$SelDepth1.html(arrHtmlStr.join(''));

	// 대메뉴 이벤트 바인딩
	$SelDepth1.on('change', function () {
		$owner.val('');
		
		if($SelDepth1.val()){
			$tableTr.hide();
			$tableTr.filter('[data-seq1="' + $SelDepth1.val() + '"]').show();
			
			var trNum = $tableTr.filter('[data-seq1="' + $SelDepth1.val() + '"]').length; //선택수
			viewLine( trNum, true);
		} else {
			$tableTr.show();
			viewLine( 0, false);
		}
		
		// 중메뉴 Option 태그 생성
		if(menuObj[$SelDepth1.val()]){
			var lowerMenu = menuObj[$SelDepth1.val()].lowerMenu;
			arrHtmlStr.length = 0;
			arrHtmlStr.push('<option value=""> -  선택 - </option>');
			for (var name2 in lowerMenu) {
				if (lowerMenu[name2]) {
					arrHtmlStr.push('<option value="' + name2 + '">' + lowerMenu[name2] + '</option>');
				}
			}
			$SelDepth2.html(arrHtmlStr.join(''));
		}
	});

	// 중메뉴 이벤트 바인딩
	$SelDepth2.on('change', function () {
		$owner.val('');
		if($SelDepth2.val()){
			$tableTr.hide();
			$tableTr.filter('[data-seq2="' + $SelDepth2.val() + '"]').show();
			
			var trNum = $tableTr.filter('[data-seq2="' + $SelDepth2.val() + '"]').length; //선택수
			viewLine( trNum, true);			
		} else {
			$SelDepth1.trigger('change');
			
			viewLine( 0, false);			
		}
	});
	
	// 담당자 셀렉트 박스 생성을 위한 데이터 생성
	var $owner = $table.find('#owner');
	var arrOwnerList = new Array();
	$tableTr.each(function (idx) {
		var owner = $(this).find('td').eq(8).text().trim(); //// 담당자 tr내 td Num
		var flag = true;
		for(var i=0; i<arrOwnerList.length;i++){ 
			if(arrOwnerList[i] == owner){ flag = false; } 
		}
		if(flag){ arrOwnerList.push(owner); }
		$(this).attr('data-owner', owner);
	});
	
	// 담당자 셀렉트 박스 Option태그 생성
	arrHtmlStr.length = 0;
	arrHtmlStr.push('<option value="">#전체</option>');
	for (var i=0; i<arrOwnerList.length;i++) {
		arrHtmlStr.push('<option value="' + arrOwnerList[i] + '">' + arrOwnerList[i] + '</option>');
	}
	$owner.html(arrHtmlStr.join(''));
	
	// 담당자 셀렉트 박스 이벤트 바인딩
	$owner.on('change', function(){
		$SelDepth1.val('');
		$SelDepth2.val('');
		
		
		if($owner.val() == '0' || $owner.val() == '' ){
			$tableTr.show();
			viewLine( 0, false);
		} else {
			$tableTr.hide();
			$tableTr.filter('[data-owner="' + $owner.val() +'"]').show();
			
			var trNum = $tableTr.filter('[data-owner="' + $owner.val() +'"]').length; //선택수
			viewLine( trNum, true);	
		}
	});
	
	// 시작일 셀렉트 박스 생성을 위한 데이터 생성
	var $stDate = $table.find('#stDate');
	var arrStDateList = new Array();
	$tableTr.each(function (idx) {
		var stDate = $(this).find('td').eq(9).text().trim();
		var flag = true;
		for(var i=0; i<arrStDateList.length;i++){ 
			if(arrStDateList[i] == stDate){ flag = false; } 
		}
		if(flag){ arrStDateList.push(stDate); }
		$(this).attr('data-stDate', stDate);
	});
	
	// 시작일 셀렉트 박스 Option태그 생성
	arrStDateList = arrStDateList.sort();
	arrHtmlStr.length = 0;
	arrHtmlStr.push('<option value="0">#전체</option>');
	for (var i=0; i<arrStDateList.length;i++) {
		arrHtmlStr.push('<option value="' + arrStDateList[i] + '">' + arrStDateList[i] + '</option>');
	}
	$stDate.html(arrHtmlStr.join(''));
	
	// 시작일 셀렉트 박스 이벤트 바인딩
	$stDate.on('change', function(){
		$SelDepth1.val('');
		$SelDepth2.val(''); 
		
		if($stDate.val() == '0' || $stDate.val() == '' ){
			$tableTr.show();
			
			viewLine(0, false);			
		} else {
			$tableTr.hide();
			$tableTr.filter('[data-stDate="' + $stDate.val() +'"]').show();
			
			var trNum = $tableTr.filter('[data-stDate="' + $stDate.val() +'"]').length; //선택수
			viewLine( trNum, true);				
		}
	});
	
	/*******
	// 종료일 셀렉트 박스 생성을 위한 데이터 생성
	var $edDate = $table.find('#edDate');
	var arrEdDateList = new Array();
	$tableTr.each(function (idx) {
		var edDate = $(this).find('td').eq(10).text().trim();
		var flag = true;
		for(var i=0; i<arrEdDateList.length;i++){ 
			if(arrEdDateList[i] == edDate){ flag = false; } 
		}
		if(flag){ arrEdDateList.push(edDate); }
		$(this).attr('data-edDate', edDate);
	});
	
	// 종료일 셀렉트 박스 Option태그 생성
	arrEdDateList = arrEdDateList.sort();
	arrHtmlStr.length = 0;
	arrHtmlStr.push('<option value="0">##선택##</option>');
	for (var i=0; i<arrEdDateList.length;i++) {
		arrHtmlStr.push('<option value="' + arrEdDateList[i] + '">' + arrEdDateList[i] + '</option>');
	}
	$edDate.html(arrHtmlStr.join(''));
	
	// 종료일 셀렉트 박스 이벤트 바인딩
	$edDate.on('change', function(){
		$SelDepth1.val('');
		$SelDepth2.val(''); 
		
		if($edDate.val() == '0' || $owner.val() == '' ){
			$tableTr.show();
		} else {
			$tableTr.hide();
			$tableTr.filter('[data-edDate="' + $edDate.val() +'"]').show();
		}
	}); 
	*******/
	
	// 현황 셀렉트 박스 생성을 위한 데이터 생성
	var $status = $table.find('#status');
	var arrStatuseList = new Array();
	$tableTr.each(function (idx) {
		//var statusNum = $(this).find('td').eq(10).text().trim();
		var statusNum = $(this).find('td').eq(10).data('status').trim();
		var flag = true;
		for(var i=0; i<arrStatuseList.length;i++){ 
			if(arrStatuseList[i] == statusNum){ flag = false; } 
		}
		if(flag){ arrStatuseList.push(statusNum); }
		$(this).attr('data-status', statusNum);
	});
	
	// 현황 셀렉트 박스 Option태그 생성
	arrStatuseList = arrStatuseList.sort();
	arrHtmlStr.length = 0;
	arrHtmlStr.push('<option value="0">#전체</option>');
	for (var i=0; i<arrStatuseList.length;i++) {
		arrHtmlStr.push('<option value="' + arrStatuseList[i] + '">' + arrStatuseList[i] + '</option>');
	}
	$status.html(arrHtmlStr.join(''));
	
	// 현황 셀렉트 박스 이벤트 바인딩
	$status.on('change', function(){
		$SelDepth1.val('');
		$SelDepth2.val(''); 
		
		if($status.val() == '0' || $status.val() == '' ){
			$tableTr.show();
			
			viewLine( 0 , false);		
		} else {
			$tableTr.hide();
			$tableTr.filter('[data-status="' + $status.val() +'"]').show();
			
			var trNum = $tableTr.filter('[data-status="' + $status.val() +'"]').length; //선택수
			viewLine( trNum, true);					
		}
	});	
	
	var total = $('#tabCont1 tbody .p_sta').length, //전체
		complete = $('#tabCont1 tbody td[data-status="완료"]').length; //완료	;		
		$('#p_total').text(total); //total
		$('#p_end').text(complete); //complet
		$('#p_com').text(Math.round(((complete/total)*100)) + '%'); //rate		
	
}); 