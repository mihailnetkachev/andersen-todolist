import popper from 'popper.js';

function getStorage() {
  var tasks = JSON.parse(localStorage.getItem('tasks'));
  return tasks;
}

function setStorage(tasks) {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function renderStorage() {
  var tasks = getStorage();

  list.innerHTML = '';

  tasks.forEach(function (item) {
    list.appendChild(createHTMLConstruction(item));
  });
}

function Task(options) {
  this.id = options.id;
  this.text = options.text;
  this.isComplete = false;
}

function addTask(item) {
  var tasks = getStorage();

  if (!tasks) {
    setStorage([item]);
    return;
  }

  tasks.push(item);
  setStorage(tasks);
}

function removeTask() {
  var task = this.parentNode;
  var tasks = getStorage();

  tasks.forEach(function (item, index, array) {
    if (item.id === +task.getAttribute('id')) {
      array.splice(index, 1);
    }
  });

  setStorage(tasks);
  renderStorage();

  event.preventDefault();
}

function triggeringComplete() {
  var task = this.parentNode;
  var tasks = getStorage();

  tasks.forEach(function (item, index, array) {
    if (item.id === +task.getAttribute('id')) {
      item.isComplete = !item.isComplete;
    }
  });

  console.log(task);

  setStorage(tasks);
  renderStorage();
}

function createHTMLConstruction(options) {
  var listItem = document.createElement('li');
  var label = document.createElement('label');
  var input = document.createElement('input');
  var span = document.createElement('span');
  var a = document.createElement('a');

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

  // label.onclick = triggeringComplete;
  a.onclick = removeTask;

  label.appendChild(input);
  label.appendChild(span);
  listItem.appendChild(label);
  listItem.appendChild(a);

  return listItem;
}

var input = document.getElementById('inputfield__input');
var button = document.getElementById('inputfield__button');
var list = document.getElementById('taskfield__list');

button.addEventListener('click', function (event) {
  event.preventDefault();

  if (!input.value) {
    alert('To do nothing is a task too. Maybe.');
    return;
  }

  var id = + new Date();
  var newTask = new Task({
    text: input.value,
    id: id
  });
  addTask(newTask);
  input.value = ''

  renderStorage();
});

renderStorage();