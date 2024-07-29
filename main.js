const app = document.getElementById("app")
const container = document.querySelector(".container")
const container_content = document.querySelector(".container_content")
const headerBtn = document.querySelector(".headerBtn")
const main = document.getElementById("main")
const backBtn = document.querySelector(".backBtn")
const addBtn = document.querySelector(".addBtn")
const title = document.querySelector(".title")
const ul = document.querySelector(".content")

let todoArr = [];
let todoContentArr = [];
let editingIndex = null; // 현재 수정 중인 항목의 인덱스
let editingDiv = null; // 현재 수정 중인 div
let i = true; // 어플 클릭했을 때 한 번만 forEach문 돌게하기 위해

// 오늘 날짜 추가 함수
function getCurrentDate() {
  let today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth() + 1;
  const dt = today.getDate();
  const hour = today.getHours();
  const minutes = today.getMinutes();
  return `${year}.${month}.${dt} ${hour}h ${minutes}m`;
}

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
loadTodos()

// 할 일 항목을 화면에 표시하는 함수
function createTodoElement(todo, index) {
  const save_div = document.createElement("div");
  save_div.classList.add("todoTitle");
  const text = document.createElement('div');
  text.classList.add("text");
  text.textContent = todo.todoTitle;

  const date = document.createElement('div');
  date.classList.add("date");
  date.textContent = todo.todoDate;

  main.append(save_div);
  save_div.append(text, date);

  save_div.addEventListener("click", function () {
    if (container_content.className.indexOf("none") > -1) {
      title.textContent = todo.todoTitle;
      ul.innerHTML = "";
      todoContentArr = todo.todoContent;
      editingIndex = index;
      editingDiv = save_div; // 현재 수정 중인 div 설정
      todo.todoContent.forEach((contentItem) => {
        createContentElement(contentItem);
      });
    }
    container_content.classList.remove("none");
  });
}

// 할 일 목록을 화면에 표시하는 함수
function displayTodos() {
  todoArr.forEach((todo, index) => {
    createTodoElement(todo, index);
  });
}

// 내용 항목을 생성하는 함수
function createContentElement(contentItem) {
  const li = document.createElement("li");
  const check = document.createElement("input");
  check.type = "checkbox";
  check.classList.add("checkbox");
  check.checked = contentItem.todoDone;

  const text = document.createElement("textarea");
  text.classList.add("textarea");
  text.style = "outline:none";
  text.value = contentItem.todotext;

  const deleteBtn = document.createElement("button");
  deleteBtn.classList.add("deleteBtn");
  deleteBtn.textContent = "x";

  ul.append(li);
  li.append(check, text, deleteBtn);

  li.addEventListener('input', function () {
    const index = Array.from(ul.children).indexOf(li);
    todoContentArr[index] = {
      todoDone: check.checked,
      todotext: text.value
    };
    saveTodos();
  });

  deleteBtn.addEventListener("click", function () {
    if (confirm('게시물을 지우겠습니까?')) {
      const index = Array.from(ul.children).indexOf(li);
      todoContentArr.splice(index, 1);
      li.remove();
      saveTodos();
    }
  });
}

// 어플 클릭 이벤트
app.addEventListener("click", function () {
  container.classList.toggle("none");
  container_content.classList.add("none");

  if (i) {
    displayTodos();
    i = false;
  }
});

// 목록 버튼 클릭 이벤트
headerBtn.addEventListener("click", function () {
  if (container_content.className.indexOf("none") > -1) {
    ul.innerHTML = "";
    const hd_title = prompt("제목을 입력하세요(10자 이하)");

    if (hd_title.trim() === "") {
      swal('', "제목을 입력하셔야 합니다.", 'warning');
      return;
    }

    if (hd_title.length > 10) {
      alert("10자 이하로 적어주세요");
      return;
    }

    title.textContent = hd_title;
    todoContentArr = [];  // 새 목록을 추가할 때 초기화
    editingIndex = null;  // 새 목록을 추가할 때 초기화
    editingDiv = null;    // 새 목록을 추가할 때 초기화
  }

  container_content.classList.remove("none");
});

// 내용 추가 버튼 클릭 이벤트
addBtn.addEventListener("click", function () {
  createContentElement({ todoDone: false, todotext: "" });
});

// 뒤로가기 버튼 클릭 이벤트
backBtn.addEventListener("click", function () {
  container_content.classList.add("none");

  let toBeAdded = {
    todoTitle: title.textContent,
    todoId: new Date().getTime(),
    todoDate: getCurrentDate(), // 수정된 시간으로 업데이트
    todoContent: [...todoContentArr]
  };

  if (editingIndex !== null) {
    todoArr[editingIndex] = toBeAdded;  // 수정된 항목 저장
    editingDiv.querySelector('.text').textContent = toBeAdded.todoTitle;
    editingDiv.querySelector('.date').textContent = toBeAdded.todoDate; // 수정된 시간으로 업데이트
  } else {
    todoArr.push(toBeAdded);  // 새 항목 추가
    createTodoElement(toBeAdded, todoArr.length - 1);
  }

  saveTodos();
  editingIndex = null;
  editingDiv = null;
});