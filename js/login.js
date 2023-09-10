const signInBtn = document.getElementById("signIn");
const signUpBtn = document.getElementById("signUp");
const fistForm = document.getElementById("form1");
const secondForm = document.getElementById("form2");
const container = document.querySelector(".container");

signInBtn.addEventListener("click", () => {
  container.classList.remove("right-panel-active");
});

signUpBtn.addEventListener("click", () => {
  container.classList.add("right-panel-active");
});

// 회원가입 프로세스
fistForm.addEventListener("submit", (e) => {
  e.preventDefault();
  // 빈칸 확인
  let name = fistForm[0].value;
  let email = fistForm[1].value;
  let password = fistForm[2].value;
  let passwordcheck = fistForm[3].value;
  if (name == "") { 
    alert("이름을 입력해주세요.");
    return;
  }
  if (email == "") { 
    alert("이메일을 입력해주세요.");
    return;
  }
  // 이메일 유효성 검사
  let exptext = /^[A-Za-z0-9_\.\-]+@[A-Za-z0-9\-]+\.[A-Za-z0-9\-]+/;
  if (exptext.test(email) == false) { 
    alert("이메일 형식이 올바르지 않습니다.");
    return;
  }
  if (password == "") { 
    alert("비밀번호를 입력해주세요.");
    return;
  }
  if (passwordcheck == "") { 
    alert("비밀번호 확인을 입력해주세요.");
    return;
  }
  if (password != passwordcheck) { 
    alert("비밀번호가 일치하지 않습니다.");
    return;
  }
  alert("회원가입이 완료되었습니다. 로그인 해주세요.");
  document.querySelector(".container").classList.remove("right-panel-active");

});

// 로그인 프로세스
secondForm.addEventListener("submit", (e) => {
  e.preventDefault()
  let email = secondForm[0].value;
  let password = secondForm[1].value;
  if (email === "ssafy@gmail.com" && password === "1234") { 
    alert("로그인 됐습니다.");
    // 히스토리가 있는 경우 뒤로가기
    if (document.referrer && document.referrer.indexOf("yoursite.com") !== -1) {
      history.back();
  }
  // 히스토리가 없는 경우 (URL을 직접 입력하여 유입된 경우)
  else {
      location.href = "main.html";    // 메인페이지로 
  }
  }
});