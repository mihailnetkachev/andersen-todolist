import Task from './task';
import {getElement, removeElement} from './dom-manipulation';
import {getStorage, addToStorage, removeFromStorage, changeInStorage, completeInStorage} from './storage';
import {createListItem as createListItemHTML,
        createTooltip as createTooltipHTML,
        createPageIcon as createPageIconHTML} from './html-constructions';

class ToDoList {

  constructor() {
    this.htmlNode = getElement('taskfield__taskList','id');
    this.tasks = getStorage();
    this.formInput = getElement('inputfield__formInput', 'id');
    this.formButton = getElement('inputfield__formButton', 'id');
    this.sortByNameButton = getElement('taskfield__sortByNameButton', 'id');
    this.sortByDateButton = getElement('taskfiled__sortByDateButton', 'id');
    this.pageListNode = getElement('taskfield__pageList', 'class');
    this.renderValue = 3;

    this.addHandlers();
    this.renderAll({});
  }

  addHandlers() {
    this.formButton.onclick = () => {
      this.addTask({creatingDate: +(new Date), text: this.formInput.value});
      this.formInput.value = '';
    };
    this.sortByNameButton.onclick = () => {
      this.renderAll({sort: 'text'});
    };
    this.sortByDateButton.onclick = () => {
      this.renderAll({sort: 'creatingDate'});
    };
  }

  renderAll({sort}) {
    console.log(sort);
    const tasksToRender = this.tasks;

    if (sort) {
      this._sortTasks(tasksToRender, sort);
    }

    this.htmlNode.innerHTML = '';

    tasksToRender.forEach((currentTask) => {
      this.htmlNode.appendChild(this._createTaskNode(createListItemHTML(), currentTask));
    });
    this._createPages();
  }

  addTask(options) {
    const newTask = new Task(options);

    this._addToLocalSession(newTask);
    addToStorage(newTask);

    this.htmlNode.appendChild(this._createTaskNode(createListItemHTML(), newTask));
    this._createPages();
  }

  _addToLocalSession(newTask) {
    this.tasks.push(newTask);
  }

  removeTask(id) {
    this._removeFromLocalSession(id);
    removeFromStorage(id);
  }

  _removeFromLocalSession(id) {
    this.tasks.forEach((currentItem, currentIndex, sessionTasks) => {
      if (currentItem.creatingDate === id) {
        sessionTasks.splice(currentIndex, 1);
      }
    });
    this._createPages();
  }

  changeTask(id, text, editingTime) {
    this._changeTaskInLocalSession(id, text, editingTime);
    changeInStorage(id, text, editingTime);
  }

  _changeTaskInLocalSession(id, newText, editingTime) {
    this.tasks.forEach((currentItem) => {
      if (currentItem.creatingDate === id) {
        currentItem.editingDate = editingTime;
        currentItem.text = newText;
      }
    });
  }

  completeTask(id) {
    this._completeTaskInLocalSession(id);
    completeInStorage(id);
  }

  _completeTaskInLocalSession(id) {
    this.tasks.forEach(currentTask => {
      if (currentTask.creatingDate === id) {
        currentTask.completed = !currentTask.completed;
      }
    });
  }

  _createTaskNode(taskHTML, taskObject) {
    const checkbox = taskHTML.querySelector('.taskfield__itemCheckbox');
    const textField =  taskHTML.querySelector('.taskfield__itemText');
    const editButton = taskHTML.querySelector('.taskfield__itemEditButton');
    const deleteButton = taskHTML.querySelector('.taskfield__itemDeleteButton');

    if (taskObject.completed) {
      checkbox.setAttribute('checked', 'checked');
    }
    taskHTML.setAttribute('data-creatingDate', taskObject.creatingDate);
    textField.textContent = taskObject.text;
    editButton.textContent = 'Edit';
    deleteButton.textContent = '+';

    checkbox.onclick = () => {
      const itemTaskId = +event.target.parentNode.parentNode.getAttribute('data-creatingDate');

      this.completeTask(itemTaskId);
    };

    editButton.onclick = (event) => {
      event.preventDefault();

      const itemTask = event.target.parentNode.parentNode;

      itemTask.appendChild(this._createTooltipNode(createTooltipHTML(), textField.textContent));

    };

    deleteButton.onclick = (event) => {
      event.preventDefault();

      const itemTask = event.target.parentNode.parentNode;
      const itemTaskId = +itemTask.getAttribute('data-creatingDate');

      this.removeTask(itemTaskId);
      removeElement(itemTask);
    };

    return taskHTML;
  }

  _createTooltipNode (tooltipHTML, text) {
    const inputField = tooltipHTML.querySelector('.taskfield__tooltipInputField');
    const changeButton = tooltipHTML.querySelector('.taskfield__tooltipChangeButton');
    const closeButton = tooltipHTML.querySelector('.taskfield__tooltipCloseButton');

    inputField.setAttribute('placeholder', 'I have changed my mind ...');
    inputField.value = text;
    changeButton.value = 'Change';
    closeButton.textContent = '+';

    changeButton.onclick = (event) => {
      const editingTime = +new Date();
      const tooltip = event.target.parentNode;
      const inputFieldText = tooltip.querySelector('.taskfield__tooltipInputField').value;

      this.changeTask(+tooltip.parentNode.getAttribute('data-creatingDate'), inputFieldText, editingTime);
      tooltip.parentNode.querySelector('.taskfield__itemText').textContent = inputFieldText;
      removeElement(tooltip);
    };

    closeButton.onclick = (event) => {
      const tooltip = event.target.parentNode;
      removeElement(tooltip);
    };

    return tooltipHTML;
  }

  _sortTasks(tasks, sortField) {
    tasks.sort((a, b) => {
      return (a[sortField] > b[sortField]) ? 1 : -1;
    });
    return tasks;
  }

  _createPages() {
    const taskNumber = this.tasks.length;
    const numberOfPages = Math.ceil(taskNumber / this.renderValue);

    if (this.pageListNode.children.length > numberOfPages) {
      return;
    }
    // TODO: грамотно посчитать количество элементов и рассчитать количество листов.
    // Например, получать число детей, сравнивать с текущим количеством детей, вычитатать разницу
    // Например 2, тогда добавляем два элемента
    // Например -2, тогда удаляем два элемента
    for (let i = 0; i < numberOfPages; i++) {
      // Добавить callback'и номера -- может через CSS?
      this.pageListNode.appendChild(createPageIconHTML());
    }
  }

}

export default ToDoList;