const classNames = {
  TODO_ITEM: 'todo-container',
  TODO_CHECKBOX: 'todo-checkbox',
  TODO_TEXT: 'todo-text',
  TODO_DELETE: 'todo-delete',
}

const list = document.getElementById('todo-list')
const itemCountSpan = document.getElementById('item-count')
const uncheckedCountSpan = document.getElementById('unchecked-count')

let todos = [];

//todo = {id: number, text: string, checked: boolean}

/*
      <li>
        <input type="checkbox"><span>Text</span><button>delete</button>
      </li>
*/

let numb = 1;
function newTodo() {
  let text = window.prompt('enter todo');
  let todo = { id: numb++, text, checked: false };
  todos.push(todo);
  console.log('todos', todos);
  render();

  //list.insertAdjacentHTML('beforeend', `<li><input type="checkbox">
  //<span>Text ${numb++}</span>
  //<button onClick="this.parentElement.remove()">delete</button>
  //</li>`);
}

function render(){
  list.innerHTML = todos.map(e => renderTodo(e)).join('');
  itemCountSpan.innerHTML = todos.length;
  uncheckedCountSpan.innerHTML = todos.filter(e => !e.checked).length;
}

function renderTodo(todo){
  return `<li class="${classNames.TODO_ITEM}">
  <input type="checkbox"
    class="${classNames.TODO_CHECKBOX}"
    ${todo.checked ? "checked": ""}
    onClick="toggleTodo(${todo.id})">
  <span class="${classNames.TODO_TEXT}">${todo.text}</span>
  <button
    class="${classNames.TODO_DELETE}"
    onClick="deleteTodo(${todo.id})">delete</button>
</li>`;
}

function deleteTodo(id){
  // console.log('from deleteTodo', id);
  // delete from array todos
  todos = todos.filter(e => e.id !== id);
  render();
}

function toggleTodo(id){
  todos.map(e => e.id === id ? e.checked = !e.checked : false);
  render();
}