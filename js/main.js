// 그리드 내 각각의 이미지 옵저버
// 옵저버 옵션
const gridOption = { threshold: 0.6 };
// 콜백함수
let gridOpacityChange = (entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = 1;
        } else {
            entry.target.style.opacity = 0.2;
        }
    });
};
const gridObserver = new IntersectionObserver(gridOpacityChange, gridOption);
// 감시할 객체 추가
let imgs = document.querySelectorAll(".grid-container img");
imgs.forEach((o) => {
    gridObserver.observe(o);
})


// 인기 플랜 옵저버
const planOptions = { threshold: [0.6, 0.8] };
// 콜백함수
let planOpacityChange = (entries, observer) => {
    entries.forEach(entry => {
        let searchBar = document.querySelector(".search-bar");
        if (entry.intersectionRatio >= 0.8) {
            entry.target.style.opacity = 1;
        } else if (entry.intersectionRatio >= 0.6) {
            searchBar.style.display = "none";
        } else if (entry.boundingClientRect.top >= 0) {
            entry.target.style.opacity = 0;
            searchBar.style.display = "flex";
        }
    });
};
const planObserver = new IntersectionObserver(planOpacityChange, planOptions);
// 감시할 객체 추가
planObserver.observe(document.querySelector(".plan"));



// 인기 게시글 옵저버
const boardOptions = { threshold: 0.4 };
// 콜백함수
let boardOpacityChange = (entries, observer) => {
    entries.forEach(entry => {
        if (entry.intersectionRatio >= 0.4) {
            entry.target.style.opacity = 1;
        } else if (entry.boundingClientRect.top > 0) {
            entry.target.style.opacity = 0;
        }
    });
};
const boardObserver = new IntersectionObserver(boardOpacityChange, boardOptions);
// 감시할 객체 추가
boardObserver.observe(document.querySelector(".board"));


// 인기 여행 플랜 캐러셀
function slider() {
    lis = document.querySelectorAll(".plan > ul > li");
    ul = document.querySelector(".plan > ul");
    lis.forEach((o) => {
        o.animate([
            {transform: "translateX(0)"},
            {transform: `translateX(-${o.clientWidth * lis.length - ul.clientWidth + o.clientWidth - 40}px)`},
        ], {
            timingFunction: "liear",
            duration: 40000,
            iterations: Infinity
        })
    });
}

slider();
window.onresize = slider;

gridContainer = document.querySelector(".grid-container");
navBarLogo = document.querySelector("#logo")
searchBarLogo = document.querySelector("#logo2");
navBarLogo.style.display = "none";
window.addEventListener('scroll', () => {
    if (gridContainer.getBoundingClientRect().top <= -100) {
        searchBarLogo.style.visibility = "hidden";
        navBarLogo.style.display = "block";
    } else {
        searchBarLogo.style.visibility = "visible";
        navBarLogo.style.display = "none";
    }
});