/*
    로그인 & 로그아웃
*/
let user = localStorage.getItem("user");
if (user != null) {
    document.querySelector(".login-mode").style.display = "block";
    document.querySelector(".logout-mode").style.display = "none";
} else {
    document.querySelector(".login-mode").style.display = "none";
    document.querySelector(".logout-mode").style.display = "block";
}