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