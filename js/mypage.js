const pwOrigin = document.querySelector('#pwOrigin');
const pwNew = document.querySelector('#pwNew');
const pwCheck = document.querySelector('#pwCheck');
const recBtn = document.querySelector('.change-button');

recBtn.addEventListener('click', function () {
  if (pwNew != pwCheck) {
    alert('비밀번호 확인이 일치하지 않습니다.');
  } else {
    alert('변경이 완료됐습니다.');
  }
});
