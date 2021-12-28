var headHtml = ''; //head inner HTML
headHtml += '<h1><img src="img/site.ico" alt=""/> Publishing Guide </h1>';
headHtml += '<nav>';
headHtml += '	<ul class="clearfix">';
headHtml += '		<li><a href="gd_info.html">기본규약</a></li>';
headHtml += '		<li><a href="gd_layout.html">레이아웃</a></li>';
headHtml += '		<li><a href="gd_button.html">버튼</a></li>';
headHtml += '		<li><a href="gd_stab.html">탭/스텝</a></li>';
headHtml += '		<li><a href="gd_table.html">테이블</a></li>';
headHtml += '		<li><a href="gd_list.html">리스트</a></li>';
headHtml += '		<li><a href="gd_toggle.html">토글</a></li>';
headHtml += '		<li><a href="gd_popup.html">팝업</a></li>';
/*
headHtml += '		<li><a href="gd_form_layout.html">입력폼</a></li>';
headHtml += '		<li><a href="gd_form_style.html">폼스타일</a></li>';
headHtml += '		<li><a href="gd_bullet_style.html">블릿스타일</a></li>';
headHtml += '		<li><a href="gd_icon.html">아이콘</a></li>';
headHtml += '		<li><a href="gd_rule.html">약관</a></li>';
*/
headHtml += '		<li><a href="javascript:void(0);" onclick="준비중")">입력폼</a></li>';
headHtml += '		<li><a href="javascript:void(0);" onclick="준비중">폼스타일</a></li>';
headHtml += '		<li><a href="javascript:void(0);" onclick="준비중">블릿스타일</a></li>';
headHtml += '		<li><a href="javascript:void(0);" onclick="준비중">아이콘</a></li>';
headHtml += '		<li><a href="javascript:void(0);" onclick="준비중">약관</a></li>';
headHtml += '	</ul>';
headHtml += '</nav>';

var currentPage = [//'파일ID',	current넘버 array
               ['gd_info', 0],  //기본규약
               ['gd_layout', 1], //레이아웃
               ['gd_button', 2], //버튼
               ['gd_stab', 3], //스텝/탭
               ['gd_table', 4], //테이블
               ['gd_list', 5], //리스트
               ['gd_toggle', 6], //토글
               ['gd_popup', 7], //팝업
               ['gd_form_layout', 8], //입력폼
               ['gd_form_style', 9], //폼스타일
               ['gd_bullet_style', 10], //블릿
               ['gd_icon', 11], //아이콘
               ['gd_rule', 12], //약관              
	];

$("header").html(headHtml);
for(i=0; i<currentPage.length; i++){//페이지 current
    if(window.location.href.indexOf(currentPage[i][0]) > -1){//해당 파일명일때 실행
    	$("header nav li").eq(currentPage[i][1]).addClass("on");
    }
}//페이지 current.end