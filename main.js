const app = document.getElementById("app")
const container = document.querySelector(".container")
const container_content = document.querySelector(".container_content")
const headerBtn = document.querySelector(".headerBtn")
const backBtn = document.querySelector(".backBtn")
 
app.addEventListener("click", function(){
  container.classList.toggle("none") // 새로고침 기준 클릭시 none 클래스 제거
  container_content.classList.add("none") // 무조건 app 클릭시 none클래스 적용해서 안보이게 만들기
})

headerBtn.addEventListener("click", function(){
  container_content.classList.remove("none") // 헤더 버튼을 눌렀을 때 none 클래스를 지워서 display가 나오게 만들기
})

backBtn.addEventListener("click", function(){
  container_content.classList.add("none") // 뒤로가기 버튼을 눌렀을 때 none 클래스를 추가하여 화면에 안보이게 만들기
})