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



// 생성자
function LocationInfo(addr1, areacode, cotentid, cotenttypeid, firstimage, mapx, mapy, sigungucode, title, tel) {
    this.addr = addr1;
    this.areacode = areacode;
    this.cotentid = cotentid;
    this.cotenttypeid = cotenttypeid;
    this.img = firstimage;
    this.mapx = mapx;
    this.mapy = mapy;
    this.sigungucode = sigungucode;
    this.title = title;
    this.tel = tel;
}

// 공공데이터 검색 결과 배열
// locations = [];
// test용
locations = [];
locations.push(new LocationInfo("서울 송파구 올림픽로 300¸ 2층", 1, 2924134, 38, "http://tong.visitkorea.or.kr/cms/resource/00/2879100_image2_1.jpg", 127.1040305171, 37.5142459111, 18, "가가밀라노 롯데백화점 에비뉴엘 월드타워점", ""));
locations.push(new LocationInfo("충청남도 공주시 감영길 3", 34, 2750144, 38, "../assets/noImg.png", 127.1216721795, 36.4529297875, 1, "가가상점", ""));
locations.push(new LocationInfo("경기도 안산시 상록구 감골로 173", 31, 2901530, 39, "http://tong.visitkorea.or.kr/cms/resource/12/2901512_image2_1.jpg", 126.8580034344, 37.2971166997, 15, "가가목장", ""));



// 공공데이터 가져오기
{
    const base = "https://apis.data.go.kr/B551011/KorService1/";
    const key = "NYi8pVbtWFuARtVe2wCP7BkiQ5Rhmc0wd3AKE5UanrA5d%2F3m%2BCWTbF5Ur9NFxR%2BBL5hAZFbnREL2bd8X5pj6sA%3D%3D"; 
}


// 지도 띄우기
{
    //지도를 담을 영역의 DOM 레퍼런스
    let container = document.querySelector('.map');
    let options = { //지도를 생성할 때 필요한 기본 옵션
        // 중심 : 서울
        //지도의 중심좌표
        center: new kakao.maps.LatLng(37.566535, 126.9779692),
        //지도의 레벨(확대, 축소 정도)
        level: 9
    };
    
    //지도 생성 및 객체 리턴
    let map = new kakao.maps.Map(container, options);
}



// 일수 별 일정 클릭시 현재 일정을 해당 일정으로 변경하는 함수
curDay = "day1";
function addEventToDayPlan(day) {
    if (curDay != day) {
        if (document.querySelector(`#${curDay}`) != null)
            document.querySelector(`#${curDay}`).open = false;
        curDay = day;
    }
}




/*
    html에 리스트 만드는 함수
*/

makeLocationList(locations);

// 공공데이터 검색 결과 리스트 만들기
function makeLocationList(data) {
    locationList = document.querySelector(".location-list ul");
    content = `
        <div id="listCnt">전체 ${data.length}개</div>
    `;

    cnt = 0;
    data.forEach((o) => {
        content += 
        `<li id="llt${cnt}">
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