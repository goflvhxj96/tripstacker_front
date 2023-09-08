// content의 높이를 헤더 바로 아래에 위치하게 함
content = document.querySelector(".container");
header = document.querySelector("header");
content.style.padding = `${header.clientHeight}px 0px 0px 0px`;
window.onresize = function () {
    content = document.querySelector(".container");
    header = document.querySelector("header");
    content.style.padding = `${header.clientHeight}px 0px 0px 0px`;
};


// 지도 띄우기
//지도를 담을 영역의 DOM 레퍼런스
let container = document.querySelector('.map');
let options = { //지도를 생성할 때 필요한 기본 옵션
    //지도의 중심좌표.
    center: new kakao.maps.LatLng(37.55, 127.2),
    //지도의 레벨(확대, 축소 정도)
	level: 10
};

//지도 생성 및 객체 리턴
let map = new kakao.maps.Map(container, options);