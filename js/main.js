// 그리드 내 각각의 이미지 옵저버
// 옵저버 옵션
const options = { threshold: 0.6 };
// 콜백함수
let opacityChange = (entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = 1;
        } else {
            entry.target.style.opacity = 0.2;
        }
    });
};
const observer = new IntersectionObserver(opacityChange, options);
// 감시할 객체 추가
let imgs = document.querySelectorAll(".grid-container img");
imgs.forEach((o) => {
    observer.observe(o);
})


// 인기 플랜 옵저버
const optionsp = { threshold: [0.6, 0.8] };
// 콜백함수
let opacityChangep = (entries, observer) => {
    entries.forEach(entry => {
        let searchBar = document.querySelector(".search-bar");
        if (entry.intersectionRatio >= 0.8) {
            entry.target.style.opacity = 1;
        } else if (entry.intersectionRatio >= 0.6) {
            searchBar.style.opacity = 0;
        } else if (entry.boundingClientRect.top >= 0) {
            entry.target.style.opacity = 0;
            searchBar.style.opacity = 1;
        }
    });
};
const observerp = new IntersectionObserver(opacityChangep, optionsp);
// 감시할 객체 추가
observerp.observe(document.querySelector(".plan"));



// 인기 게시글 옵저버
const optionsb = { threshold: 0.4 };
// 콜백함수
let callback = (entries, observer) => {
    entries.forEach(entry => {
        if (entry.intersectionRatio >= 0.4) {
            entry.target.style.opacity = 1;
        } else if (entry.boundingClientRect.top > 0) {
            entry.target.style.opacity = 0;
        }
    });
};
const observerb = new IntersectionObserver(callback, optionsb);
// 감시할 객체 추가
observerb.observe(document.querySelector(".board"));