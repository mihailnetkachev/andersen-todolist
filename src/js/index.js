function getStorage() {
  return JSON.parse(localStorage.getItem('tasks'));
}

function setStorage(tasks) {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function renderStorage() {
  const tasks = getStorage();
  let counter = '0';
  list.innerHTML = '';

  tasks.forEach((item) => {
    list.appendChild(createHTMLConstruction(item));
    if (!item.isComplete) {
      counter++;
    }
  });

  headerCounter.textContent = counter;
}

class Task {
  constructor(options) {
    this.id = options.id;
    this.text = options.text;
    this.isComplete = false;
  }
}

function addTask(item) {
  const tasks = getStorage();

  if (!tasks) {
    setStorage([item]);
    return;
  }

  tasks.push(item);
  setStorage(tasks);
}

function removeTask() {
  let task = this.parentNode;
  const tasks = getStorage();

  tasks.forEach((item, index, array) => {
    if (item.id === +task.getAttribute('id')) {
      array.splice(index, 1);
    }
  });

  setStorage(tasks);
  renderStorage();

  event.preventDefault();
}

function triggeringComplete() {
  let task = this.parentNode.parentNode;
  const tasks = getStorage();

  tasks.forEach((item) => {
    if (item.id === +task.getAttribute('id')) {
      item.isComplete = !item.isComplete;
    }
  });

  setStorage(tasks);
  renderStorage();
}

function createHTMLConstruction(options) {
  let listItem = document.createElement('li');
  let label = document.createElement('label');
  let input = document.createElement('input');
  let span = document.createElement('span');
  let a = document.createElement('a');

  listItem.classList.add('taskfield__item');
  listItem.setAttribute('id', options.id);
  label.classList.add('taskfield__itemLabel');
  input.classList.add('taskfield__itemCheckbox');
  input.setAttribute('type', 'checkbox');
  if (options.isComplete) {
    input.setAttribute('checked', 'checked');
  }
  span.classList.add('taskfield__itemText');
  span.textContent = options.text;
  a.classList.add('taskfield__itemDelete');
  a.textContent = '+';

  input.onclick = triggeringComplete;
  a.onclick = removeTask;

  label.appendChild(input);
  label.appendChild(span);
  listItem.appendChild(label);
  listItem.appendChild(a);

  return listItem;
}

let input = document.getElementById('inputfield__input');
let button = document.getElementById('inputfield__button');
let list = document.getElementById('taskfield__list');
let headerCounter = document.getElementById('taskfield__headerValue');

button.addEventListener('click', function (event) {
  event.preventDefault();

  if (!input.value) {
    alert('To do nothing is a task too. Maybe.');
    return;
  }
  let id = +new Date();
  const newTask = new Task({
    text: input.value,
    id: id
  });
  addTask(newTask);
  input.value = '';

  renderStorage();
});

renderStorage();