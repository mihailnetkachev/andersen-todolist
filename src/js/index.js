function getStorage() {
  return JSON.parse(localStorage.getItem('tasks'));
}

function setStorage(tasks) {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function renderStorage(tasksArr) {
  const tasks = tasksArr || getStorage();
  let counter = '0';
  list.innerHTML = '';

  if (tasks.length === 0) {
    list.innerHTML = 'You don\'t have any tasks';
    return;
  }

  tasks.forEach((item, index) => {

    if (index >= firstTaskToRender && index < firstTaskToRender + numberOfTaskToRender) {

      let isAdded = false;

      for (let i = 0; i < list.length; i++) {
        const task = list[i];

        if (item.id === +task.getAttribute('id')) {
          if (item.edited !== +task.getAttribute('data-edited')
            || item.text !== task.getElementsByClassName('taskfield__itemText')[0].textContent) {
            list.replaceChild(createHTMLConstruction(item), task);
          } else {
            isAdded = true;
          }
        }
      }

      if (!isAdded) {
        list.appendChild(createHTMLConstruction(item));
        if (!item.isComplete) {
          counter++;
        }
      }

    }



  });

  headerCounter.textContent = counter;
}

function renderStorageWithSort(typeOfSort) {
  const tasks = getStorage();

  tasks.sort((a, b) => {
    return (a[typeOfSort] > b[typeOfSort]) ? 1 : -1;
  });

  renderStorage(tasks);
}

function createPageList() {
  const numberOfTasks = getStorage().length;
  let numberOfPages = Math.ceil(numberOfTasks / numberOfTaskToRender);
  let numberOfPage = 1;
  let indexOfPage = 0;

  pageList.innerHTML = '';
  for (let i = 0; i < numberOfPages; i++) {
    pageList.appendChild(createPageIcon({number: numberOfPage++, index: indexOfPage}));
    indexOfPage += numberOfTaskToRender;
  }
}

function createPageIcon(options) {
  const pageItem = document.createElement('li');

  pageItem.classList.add('taskfield__page');
  pageItem.textContent = options.number;

  pageItem.onclick = () => {
    firstTaskToRender = options.index;
    renderStorage();
  };

  return pageItem;
}

class Task {
  constructor(options) {
    this.id = options.id;
    this.text = options.text;
    this.isComplete = false;
    this.edited = this.id;
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
  createPageList();
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
  createPageList();

  event.preventDefault();
}

function editTask() {
  const tasks = getStorage();
  const task = this.parentNode;
  let taskText = task.getElementsByClassName('taskfield__itemText')[0].textContent;
  const tooltip = createTooltip(taskText);

  task.appendChild(tooltip);
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
  const listItem = document.createElement('li');
  const label = document.createElement('label');
  const input = document.createElement('input');
  const span = document.createElement('span');
  const createDate = document.createElement('span');
  const editButton = document.createElement('a');
  const a = document.createElement('a');

  listItem.classList.add('taskfield__item');
  listItem.setAttribute('id', options.id);
  listItem.setAttribute('data-edited', options.edited);
  label.classList.add('taskfield__itemLabel');
  input.classList.add('taskfield__itemCheckbox');
  input.setAttribute('type', 'checkbox');
  if (options.isComplete) {
    input.setAttribute('checked', 'checked');
  }
  span.classList.add('taskfield__itemText');
  span.textContent = options.text;
  createDate.classList.add('taskfield__itemDate');
  createDate.textContent = ''
    + (new Date(options.id)).getDate() + '.' + (+(new Date(options.id).getMonth()) + 1) + '.' + (new Date(options.id).getFullYear());
  a.classList.add('taskfield__itemDelete');
  a.textContent = '+';
  editButton.classList.add('taskfield__itemEdit');
  editButton.textContent = 'Edit';

  input.onclick = triggeringComplete;
  a.onclick = removeTask;
  editButton.onclick = editTask;

  label.appendChild(input);
  label.appendChild(span);
  listItem.appendChild(label);
  listItem.appendChild(createDate);
  listItem.appendChild(editButton);
  listItem.appendChild(a);

  return listItem;
}

function createTooltip(value) {
  const wrapper = document.createElement('div');
  const inputField = document.createElement('input');
  const inputButton = document.createElement('input');

  wrapper.classList.add('tooltip');
  inputField.classList.add('tooltip__inputField');
  inputField.setAttribute('type', 'text');
  inputField.setAttribute('placeholder', 'I changed my ming ...');
  inputField.setAttribute('value', value || '');
  inputButton.classList.add('tooltip__inputButton');
  inputButton.setAttribute('type', 'submit');
  inputButton.value = 'Change';

  inputButton.onclick = () => {
    let task = inputButton.parentNode.parentNode;
    let tasks = getStorage();

    tasks.forEach((item) => {
      if (item.id === +task.getAttribute('id')) {
        item.text = inputField.value;
        item.edited = +new Date();
      }
    });


    setStorage(tasks);
    renderStorage();
  };

  wrapper.appendChild(inputField);
  wrapper.appendChild(inputButton);
  return wrapper;
}

const input = document.getElementById('inputfield__input');
const button = document.getElementById('inputfield__button');
const list = document.getElementById('taskfield__list');
const headerCounter = document.getElementById('taskfield__headerValue');
const sortbttnByDate = document.getElementById('button__byDate');
const sortbttnAlphabetically = document.getElementById('button__alphabetically');
const sortbttnByEditingDate = document.getElementById('button__byEditingDate');
const searchInput = document.getElementById('searchfield__input');
let firstTaskToRender = 0;
const numberOfTaskToRender = 3;
const pageList = document.getElementById('taskfield__pageList');

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

sortbttnByDate.onclick = () => {
  renderStorageWithSort('id');
};

sortbttnAlphabetically.onclick = () => {
  renderStorageWithSort('text');
};

sortbttnByEditingDate.onclick = () => {
  renderStorageWithSort('edited');
};

searchInput.onkeyup = () => {
  let tasks = getStorage();
  let selectedTasks = [];

  if (searchInput.value === '') {
    renderStorage();
    return;
  }


  tasks.forEach((item) => {
    let itemPartialText = item.text.split('').slice(0, searchInput.value.length).join('');
    if (itemPartialText === searchInput.value) {
      selectedTasks.push(item);
    }
  });

  renderStorage(selectedTasks);
};

renderStorage();