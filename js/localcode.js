// 지역코드 불러오기
window.onload = function () {
    arr = [
        ["서울", 1],
        ["인천", 2],
        ["대전", 3],
        ["대구", 4],
        ["광주", 5],
        ["부산", 6],
        ["울산", 7],
        ["세종", 8],
        ["경기", 31],
        ["강원", 32],
        ["충북", 33],
        ["충남", 34],
        ["경북", 35],
        ["경남", 36],
        ["전북", 37],
        ["전남", 38],
        ["제주", 39],
    ];

    sido = document.querySelector("#sidoSelect");
    for (let i = 0; i < arr.length; i++){
        sido.innerHTML += `<option class="sido" value="${arr[i][1]}">${arr[i][0]}</option>`;
    }
}

// 시군구 코드 불러오기
document.querySelector("#sidoSelect").addEventListener("change", async function () {
    let sido = document.querySelector('#sidoSelect');
    let now = sido.options[sido.selectedIndex].value;
    let gu = document.querySelector("#gugunSelect");
    gu.innerHTML = `<option value ="" selected disabled>구/군</option>`;
    if (now >= 1) {
        let url = `https://apis.data.go.kr/B551011/KorService1/areaCode1?serviceKey=NYi8pVbtWFuARtVe2wCP7BkiQ5Rhmc0wd3AKE5UanrA5d%2F3m%2BCWTbF5Ur9NFxR%2BBL5hAZFbnREL2bd8X5pj6sA%3D%3D&numOfRows=50&pageNo=1&MobileOS=ETC&MobileApp=AppTest&areaCode=${now}&_type=json`
        let response = await fetch(url);
        let data = await response.json();
        let arr = data.response['body']['items']['item'];
        for(let i=0; i<arr.length; i++){
            gu.innerHTML += `<option class="gu" value="${arr[i].code}">${arr[i].name}</option>`;
        }
    }
})


