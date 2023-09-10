// 최근 본 여행 블록 반응형
const visitWindow = document.querySelector(".visit-page");
window.onresize = function () { 
    const width = window.innerWidth;
    console.log(width);
    if (width <= 770) {
        visitWindow.style.display = "none";
    } else { 
        visitWindow.style.display = "";
    }
}