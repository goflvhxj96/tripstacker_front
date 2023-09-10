// content의 높이를 헤더 바로 아래에 위치하게 함
{
    content = document.querySelector(".container");
    header = document.querySelector("header");
    content.style.padding = `${header.clientHeight}px 0px 0px 0px`;
    window.onresize = function () {
        content = document.querySelector(".container");
        header = document.querySelector("header");
        content.style.padding = `${header.clientHeight}px 0px 0px 0px`;
    };
}





/**
 * 지도 관련 함수
 */

// 초기 지도 : 중심 서울
let map = drawMap(37.566535, 126.9779692, 9);
let curX = 37.566535;
let curY = 126.9779692;

// 마커 배열
let markers = [];
let oneMarker;

// 지도 띄우기
function drawMap(x, y, lev) {
    //지도를 담을 영역의 DOM 레퍼런스
    let container = document.querySelector('.map');
    let options = {
        center: new kakao.maps.LatLng(x, y),
        level: lev
    };
    
    //지도 생성 및 객체 리턴
    return new kakao.maps.Map(container, options);
}

// 지도 중심 좌표 이동 및 마커 생성
function moveMapCenter(cnt) {
    
    // 이동할 위도 경도 위치 생성
    let x = locations[cnt].mapx;
    let y = locations[cnt].mapy;
    
    if (x == curX && y == curY) {
        return;
    }
    
    var latLng = new kakao.maps.LatLng(y, x);
    
    // 위치 이동
    map.panTo(latLng);
    curX = x;
    curY = y;
    
    // 레벨 변경
    map.setLevel(1);
    
    // 마커 생성
    
    
    let marker = new kakao.maps.Marker({
        position: latLng
    });
    marker.setMap(map);

    // 기존 마커 삭제
    if (oneMarker)
        oneMarker.setMap(null);
    oneMarker = marker;
}

// 지도 이동 함수
function moveMap(x, y, lev) {
    var latLng = new kakao.maps.LatLng(y, x);

    // 위치 이동
    map.panTo(latLng);
    curX = x;
    curY = y;

    map.setLevel(lev);
}

// 마커 생성 함수
function makeMarker(x, y, type) {
    let latLng = new kakao.maps.LatLng(y, x);
    let img = `../assets/marker/marker${type}.png`;
    let size = new kakao.maps.Size(30, 30);
    let markerImage = new kakao.maps.MarkerImage(img, size);

    let marker = new kakao.maps.Marker({
        position: latLng,
        image: markerImage
    });

    return marker;
}





/**
 * 공공데이터 관련 함수
 */
// 데이터 객체 생성자
function LocationInfo(addr1, areacode, cotentid, cotenttypeid, firstimage, mapx, mapy, sigungucode, title, tel) {
    this.addr = addr1;
    this.areacode = areacode;
    this.cotentid = cotentid;
    this.cotenttypeid = parseInt(cotenttypeid);
    this.img = firstimage;
    this.mapx = parseFloat(mapx);
    this.mapy = parseFloat(mapy);
    this.sigungucode = sigungucode;
    this.title = title;
    this.tel = tel;
}

// 공공데이터 검색 결과 배열
let locations = [];

// 공공데이터 가져오기
const base = "https://apis.data.go.kr/B551011/KorService1/areaBasedList1";
const serviceKey = "NYi8pVbtWFuARtVe2wCP7BkiQ5Rhmc0wd3AKE5UanrA5d%2F3m%2BCWTbF5Ur9NFxR%2BBL5hAZFbnREL2bd8X5pj6sA%3D%3D"; 

async function getSearchData() {
    // 마커 지워주기
    markers.forEach(m => {
        m.setMap(null);
    });

    let numOfRows = 20;
    let pageNo = 1;
    const keyword = document.querySelector("#search").value;
    const sido = document.querySelector("#sidoSelect");
    const areaCode = sido.options[sido.selectedIndex].value;
    const gungu = document.querySelector("#gugunSelect")
    const sigunguCode = gungu.options[gungu.selectedIndex].value;
    const types = document.querySelectorAll("input[name='type']:checked");

    if (keyword.length == 0 && areaCode.length == 0 && sigunguCode == 0 && types.length == 0) {
        alert("검색 조건을 입력해주세요.");
        return;
    }

    let res = [];
    if (types.length > 0) {
        for (i = 0; i < types.length; i++) {
            const typeId = parseInt(types[i].value);
            const url = `${base}?serviceKey=${serviceKey}&numOfRows=${numOfRows}&pageNo=${pageNo}&MobileOS=ETC&MobileApp=AppTest&_type=json&contentTypeId=${typeId}&areaCode=${areaCode}&sigunguCode=${sigunguCode}`;
            res = res.concat(await getPublicData(url));
        }
    } else {
        const url = `${base}?serviceKey=${serviceKey}&numOfRows=${numOfRows}&pageNo=${pageNo}&MobileOS=ETC&MobileApp=AppTest&_type=json&contentTypeId=&areaCode=${areaCode}&sigunguCode=${sigunguCode}`;
        res = await getPublicData(url);
    }
    
    locations = res;
    if (keyword.length > 0)
        locations = locations.filter(o => o.title.includes(keyword));

    // html에 리스트 그리기
    makeLocationList();

    // 지역 검색할 때는 지도에 그리기
    if (areaCode.length != 0) {
        // 마커 생성
        let tmp = [];
        locations.forEach(o => {
            let m = makeMarker(o.mapx, o.mapy, o.cotenttypeid);
            tmp.push(m);
            m.setMap(map);
        });
        markers = tmp;

        // 지도 이동
        moveMap(locations[0].mapx, locations[0].mapy, 10);
    }
}

// 공공데이터 배열로 만들기
async function getPublicData(url) {
    let arr = [];
    await fetch(url)
    .then(res => res.json())
    .then(r => {
        r.response.body.items.item.forEach(o => {
            addr = o.addr1;
            if (o.addr2 != "") {
                addr += " " + o.addr2;
            }
            img = o.firstimage != "" ? o.firstimage : "../assets/noImg.png";
            arr.push(new LocationInfo(addr, o.areacode, o.contentid, o.contenttypeid, img, o.mapx, o.mapy, o.sigungucode, o.title, o.tel));
        });
    });
    return arr;
}





/**
 * planner.html 조작 관련 함수
 */

// 일수 별 일정 클릭시 현재 일정을 해당 일정으로 변경하는 함수
curDay = "day1";
function addEventToDayPlan(day) {
    if (curDay != day) {
        if (document.querySelector(`#${curDay}`) != null)
            document.querySelector(`#${curDay}`).open = false;
        curDay = day;
    }
}


// 공공데이터 검색 결과 리스트 만들기
makeLocationList();
function makeLocationList() {
    locationList = document.querySelector(".location-list ul");
    content = `
        <div id="listCnt">전체 ${locations.length}개</div>
    `;
    
    cnt = 0;
    locations.forEach((o) => {
        content += 
        `<li id="llt${cnt}" onclick="moveMapCenter(${cnt})">
            <div>
            <img
                src="${o.img}"
                alt="image"
                class="loca-img"
            />
            <span class="location"
                >🔹${o.title}</span
            >
            <span class="address">🔹${o.addr}</span>
            <img src="../assets/star.png" alt="관심" class="like" />
            <img
                src="../assets/add.png"
                alt="일정추가"
                class="add-to-plan"
                onclick="addDayPlanList(${cnt++})"
            />
            </div>
        </li>
        `;
    });

    locationList.innerHTML = content;
}


// 오른쪽 플래너에 하루 일정 추가하기
dayCnt = 2;
function addDay() {
    planBox = document.querySelector(".day-plan");
    content =
    `<details id="day${dayCnt}" onclick="addEventToDayPlan('day${dayCnt}')">
        <summary>
          📜 ${dayCnt}일차
          <img
            src="../assets/cancel.png"
            alt="지우기"
            class="day-cancel-img"
            onclick="deleteDay('day${dayCnt}')"
          />
        </summary>
        <ul>
        </ul>
    </details>
    `;
    planBox.innerHTML += content;
    curDay = `day${dayCnt++}`;
}


// 오른쪽 플래너에 장소 추가하기
// 저장할 데이터 정보는 전달받은 인덱스로 검색 결과 배열 이용하기
function addDayPlanList(idx) {
    if (document.querySelector(`#${curDay}`) == null) {
        alert("추가할 일자를 선택해주세요.");
        return;
    }
    ok = confirm(`${curDay.replace("day", "")}일차 일정에 추가하시겠습니까?`);
    if (!ok) return;
    dayPlan = document.querySelector(`#${curDay}`);
    ul = document.querySelector(`#${curDay} > ul`);
    lis = document.querySelectorAll(`#${curDay} > ul > li`);
    dayPlan.open = true;

    content =
    `<li>
      <div id="${curDay}loca${lis.length}" class="one-plan">
        <img
          src=${locations[idx].img}
          alt="image"
          class="loca-img"
        />
        <span class="location"
          >🔹${locations[idx].title}</span
        >
        <span class="address">🔹${locations[idx].addr}</span>
        <span class="time">
          <input type="time" class="start-time" />
          ~
          <input type="time" class="end-time" />
        </span>
        <img
          src="../assets/cancel.png"
          alt="지우기"
          class="loca-cancel-img"
          onclick="deleteLocation('${curDay}loca${lis.length}')"
        />
        <textarea class="memo" placeholder="memo"></textarea>
      </div>
    </li>
    `;

    ul.innerHTML += content;
}

// 일정 삭제하기 : 삭제하고 추가하는 로직 새로 짜기
function deleteDay(id) {
    document.querySelector(`#${id}`).remove();
    dayCnt--;
}

// 일정 내의 장소 하나 삭제하기
function deleteLocation(id) {
    document.querySelector(`#${id}`).remove();
}