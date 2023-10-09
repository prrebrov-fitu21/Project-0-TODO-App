const classNames = {
  TODO_ITEM: 'todo-container',
  TODO_CHECKBOX: 'todo-checkbox',
  TODO_TEXT: 'todo-text',
  TODO_DELETE: 'todo-delete',
}

const list = document.getElementById('todo-list')
const itemCountSpan = document.getElementById('item-count')
const uncheckedCountSpan = document.getElementById('unchecked-count')

// parse array from LocalStorage or init new array
let todos = JSON.parse(localStorage.getItem("todos")) || [];

// todo = {id: number, text: string, checked: boolean}

// localStorage.setItem("todos", JSON.stringify(todos));
// todos = JSON.parse(localStorage.getItem("todos"));
// console.log('todos', JSON.stringify(todos, null, 2));

/*
      <li>
        <input type="checkbox"><span>Text</span><button>delete</button>
      </li>
*/

function debugTodos() {
  if (todos != []) {
    console.log('todos', JSON.stringify(todos, null, 2))
  }
}

// string validate func
function validate(str) {
  return !!str;
}

// init prompt object
let promt = {};

// recursive prompt func to prevent null value
function todoPromt(errorMessage) {
  let promtText = window.prompt((errorMessage || '') + 'Enter todo');
  if (!validate(promtText)) {
    todoPromt('Invalid todo entered\n'); // if not valid prompt again with error
  } else {
    promt.text = promtText; // save text in object
  }
}

// get number from LocalStorage or init number
let numb = localStorage.getItem("numb") || 1;

// create and save new todo
function newTodo() {
  todoPromt();
  let todo = { id: numb++, text: promt.text, checked: false };
  todos.push(todo);
  localStorage.setItem("numb", numb);
  localStorage.setItem("todos", JSON.stringify(todos));
  render();

  //list.insertAdjacentHTML('beforeend', `<li><input type="checkbox">
  //<span>Text ${numb++}</span>
  //<button onClick="this.parentElement.remove()">delete</button>
  //</li>`);
}

function clearLocalStorage() {
  todos = [];
  numb = 1;
  localStorage.clear();
  console.clear();
  render();
}

function render() {
  debugTodos();
  list.innerHTML = todos.map(e => renderTodo(e)).join(''); // render todo list
  itemCountSpan.innerHTML = todos.length; // count todos
  uncheckedCountSpan.innerHTML = todos.filter(e => !e.checked).length; // count checked
}

// todo list render module
function renderTodo(todo) {
  return `<li class="${classNames.TODO_ITEM}">
  <input type="checkbox"
    class="${classNames.TODO_CHECKBOX}"
    ${todo.checked ? "checked" : ""}
    onClick="toggleTodo(${todo.id})">
  <span class="${classNames.TODO_TEXT}">${todo.text}</span>
  <button
    class="${classNames.TODO_DELETE}"
    onClick="deleteTodo(${todo.id})">delete</button>
</li>`;
}

function deleteTodo(id) {
  // console.log('from deleteTodo', id);
  // delete from array todos
  todos = todos.filter(e => e.id !== id);
  localStorage.setItem("todos", JSON.stringify(todos));
  render();
}

function toggleTodo(id) {
  todos.map(e => e.id === id ? e.checked = !e.checked : false);
  localStorage.setItem("todos", JSON.stringify(todos));
  render();
}

window.addEventListener("load", (event) => {
  render();
});