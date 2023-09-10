// 최근 본 여행 블록 반응형
const visitWindow = document.querySelector('.visit-page');
window.onresize = function () {
  const width = window.innerWidth;
  if (width <= 770) {
    visitWindow.style.display = 'none';
  } else {
    visitWindow.style.display = '';
  }
};

// 지도 =================================================================================
// 지도 띄우기
var mapContainer = document.getElementById('map'), // 지도를 표시할 div
  mapOption = {
    center: new kakao.maps.LatLng(33.450701, 126.570667), // 지도의 중심좌표
    level: 4, // 지도의 확대 레벨
  };

var map = new kakao.maps.Map(mapContainer, mapOption); // 지도를 생성합니다
var marker = new kakao.maps.Marker();
// HTML5의 geolocation으로 사용할 수 있는지 확인합니다
if (navigator.geolocation) {
  // GeoLocation을 이용해서 접속 위치를 얻어옵니다
  navigator.geolocation.getCurrentPosition(function (position) {
    var lat = position.coords.latitude, // 위도
      lon = position.coords.longitude; // 경도

    var locPosition = new kakao.maps.LatLng(lat, lon), // 마커가 표시될 위치를 geolocation으로 얻어온 좌표로 생성합니다
      message = '<div style="padding:5px;">바로 여기가 핫플?!</div>'; // 인포윈도우에 표시될 내용입니다

    // 마커와 인포윈도우를 표시합니다
    displayMarker(locPosition, message);
  });
} else {
  // HTML5의 GeoLocation을 사용할 수 없을때 마커 표시 위치와 인포윈도우 내용을 설정합니다

  var locPosition = new kakao.maps.LatLng(33.450701, 126.570667),
    message = 'geolocation을 사용할수 없어요..';

  displayMarker(locPosition, message);
}

// 지도에 마커와 인포윈도우를 표시하는 함수입니다
function displayMarker(locPosition, message) {
  // 마커를 생성합니다
  marker = new kakao.maps.Marker({
    map: map,
    position: locPosition,
    draggable: true,
  });

  var iwContent = message, // 인포윈도우에 표시할 내용
    iwRemoveable = true;

  // 인포윈도우를 생성합니다
  var infowindow = new kakao.maps.InfoWindow({
    content: iwContent,
    removable: iwRemoveable,
  });

  // 인포윈도우를 마커위에 표시합니다
  infowindow.open(map, marker);

  // 지도 중심좌표를 접속위치로 변경합니다
  map.setCenter(locPosition);
}

// 마커 드래그 이벤트 : 위경도 갱신
kakao.maps.event.addListener(marker, 'dragend', function () {
  console.log('마커에 dragend 이벤트가 발생했습니다!');
  var latlng = marker.getPosition();
  console.log(latlng.latitude);
  console.log(latlng.longitude);
});

// 사진 =================================================================================
//  업로드 시 사진의 메타데이터 얻기
function uploadImgPreview() {
  const img = document.querySelector('#thumbnailImg');
  img.style.display = 'block';

  // 업로드 파일 읽기
  const fileInfo = document.getElementById('uploadFile').files[0];
  const reader = new FileReader();

  // readAsDataURL( )을 통해 파일을 읽어 들일때 onload가 실행
  reader.onload = function () {
    EXIF.getData(fileInfo, () => {
      const tags = EXIF.getAllTags(fileInfo);
      let La = tags.GPSLatitude;
      let Lo = tags.GPSLongitude;
      let latitude, longitude;
      if (tags.GPSLatitudeRef == 'S') {
        latitude = -1 * La[0] + (-60 * La[1] + -1 * La[2]) / 3600;
      } else {
        latitude = La[0] + (60 * La[1] + La[2]) / 3600;
      }
      if (tags.GPSLongitudeRef == 'W') {
        longitude = -1 * Lo[0] + (-60 * Lo[1] + -1 * Lo[2]) / 3600;
      } else {
        longitude = Lo[0] + (60 * Lo[1] + Lo[2]) / 3600;
      }

      var locPosition = new kakao.maps.LatLng(latitude, longitude), // 마커가 표시될 위치를 geolocation으로 얻어온 좌표로 생성합니다
        message = '<div style="padding:5px;">바로 여기가 핫플?!</div>'; // 인포윈도우에 표시될 내용입니다

      // 마커와 인포윈도우를 표시합니다
      displayMarker(locPosition, message);
    });

    // 파일의 URL을 Base64 형태로 가져온다.
    document.getElementById('thumbnailImg').src = reader.result;
  };

  if (fileInfo) {
    // readAsDataURL( )을 통해 파일의 URL을 읽어온다.
    reader.readAsDataURL(fileInfo);
  }
}

// 저장버튼
const recBtn = document.querySelector('#recordBtn');
recBtn.addEventListener('click', function () {
    alert("저장되었습니다.")
});