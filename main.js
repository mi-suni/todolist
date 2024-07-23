const app = document.getElementById("app")
const container = document.querySelector(".container")
const container_content = document.querySelector(".container_content")
const headerBtn = document.querySelector(".headerBtn")
const backBtn = document.querySelector(".backBtn")
const addBtn = document.querySelector(".addBtn")
const title = document.querySelector(".title")
const ul = document.querySelector(".content")
let todoArr = [];
let todoContentArr = [];

// 어플
app.addEventListener("click", function(){
  container.classList.toggle("none") // 새로고침 기준 클릭시 none 클래스 제거
  container_content.classList.add("none") // 무조건 app 클릭시 none클래스 적용해서 안보이게 만들기
})

loadTodos()

// 목록
headerBtn.addEventListener("click", function(){
  if(container_content.className.indexOf("none") > -1){
    ul.innerHTML = "" // 초기화해야 완료 버튼 누른 뒤 또 누르면 새로 입력하듯이 나옴
    const hd_title = prompt("제목을 입력하세요(10자 이하)")

    if(hd_title.trim() === ""){
      swal('', "제목을 입력하셔야 합니다.", 'warning') // prompt에 빈 공백이면 if문이 나옴
      return; // 반환을 해야 container_content가 뜨지 않음
    }

    if(hd_title.length > 10) {
      alert("10자 이하로 적어주세요") // 10자 초과면 if문이 나옴
      return;
    }

    title.textContent = hd_title // 조건을 만족하면 제목 값을 넣음
  } // none 클래스가 있을 때 제목을 한 번만 받게 함. 한번만 받을 수 있는 이유는 밑에 코드가 실행되면 none클래스가 빠지기 때문.

  container_content.classList.remove("none") // 헤더 버튼을 눌렀을 때 none 클래스를 지워서 display가 나오게 만들기
})

// 내용
addBtn.addEventListener("click", function(){
  const li = document.createElement("li")
  const check = document.createElement("input")
  check.type = "checkbox"
  check.classList.add("checkbox")
  let text = document.createElement("textarea")
  text.classList.add("textarea")
  text.style = "outline:none"
  const deleteBtn = document.createElement("button")
  deleteBtn.classList.add("deleteBtn")
  deleteBtn.textContent = "x"

  ul.append(li)
  li.append(check, text, deleteBtn)
  delete_content(deleteBtn, li)

  text.addEventListener('input', function() {
    const index = Array.from(ul.children).indexOf(li); // 이건 이해가 필요
    todoContentArr[index] = {
        todoId: new Date().getTime(),
        todoDone: check.checked,
        todotext: text.value
    };
  });
})

function delete_content(deleteBtn, li) {
  deleteBtn.addEventListener("click", function(){
    if (confirm('게시물을 지우겠습니까?') ? true : false) {
      const index = Array.from(ul.children).indexOf(li); // 이거 밑에까지 학습 필요.
      todoContentArr.splice(index, 1);
      li.remove();
    }
  });
}

backBtn.addEventListener("click", function(){
  container_content.classList.add("none") // 뒤로가기 버튼을 눌렀을 때 none 클래스를 추가하여 화면에 안보이게 만들기

  let toBeAdded = {
    todoTitle: title.textContent,
    todoContent: [...todoContentArr] // 스프레드 연산자 사용. 학습 보조 내용 다시 확인.
  };

  todoArr.push(toBeAdded)
  console.log(todoArr)
})


// 로컬 스토리지
function saveTodos() {
  const todoString = JSON.stringify(todoArr)
  localStorage.setItem("todolist", todoString)
}

function loadTodos() {
  const todolist = localStorage.getItem("todolist")
  if(todolist !== null) {
    todoArr = JSON.parse(todolist)
  }
}