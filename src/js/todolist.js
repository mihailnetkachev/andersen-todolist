import Task from './task';
import createDate from './date-creator';
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
    this.render({});
  }

  addHandlers() {
    this.formButton.onclick = () => {
      this.addTask({creatingDate: +(new Date), text: this.formInput.value});
      this.formInput.value = '';
    };

    this.sortByNameButton.onclick = () => {
      this.render({sort: 'text'});
    };

    this.sortByDateButton.onclick = () => {
      this.render({sort: 'creatingDate'});
    };

    this.htmlNode.onclick = (event) => {
      const target = event.target;

      if (target.tagName === 'UL' || target.tagName === 'LI') {
        return;
      }

      if (target.getAttribute('type') === 'checkbox') {
        const itemTaskId = +target.parentNode.parentNode.getAttribute('data-creatingDate');

        this.completeTask(itemTaskId);
      }

      if (target.getAttribute('data-type') === 'editButton') {
        const itemTask = target.parentNode.parentNode;
        const textField = itemTask.querySelector('.taskfield__itemText');

        itemTask.appendChild(this._createTooltipNode(createTooltipHTML(), textField.textContent));
      }

      if (target.getAttribute('data-type') === 'deleteButton') {
        const itemTask = target.parentNode.parentNode;
        const itemTaskId = +itemTask.getAttribute('data-creatingDate');

        this.removeTask(itemTaskId);
        removeElement(itemTask);
      }
    };
  }

  render({sort, index}) {
    const tasksToRender = this.tasks;
    const startFrom = (index) ? index : 0;
    const renderTo = startFrom + this.renderValue;

    if (tasksToRender.length === 0) {
      return;
    }

    if (sort) {
      this._sortTasks(tasksToRender, sort);
    }

    this.htmlNode.innerHTML = '';

    tasksToRender.forEach((currentItem, currentIndex) => {
      if (currentIndex >= startFrom && currentIndex < renderTo) {
        this.htmlNode.appendChild(this._createTaskNode(createListItemHTML(), currentItem));
      }
    });

    this._createPages();
  }

  addTask(options) {
    const newTask = new Task(options);

    this._addToLocalSession(newTask);
    addToStorage(newTask);

    // TODO: обработать порядок добавления элементов, если уже есть 3, то ...?
    if (this.htmlNode.children.length >= 3) {

    }
    this.htmlNode.appendChild(this._createTaskNode(createListItemHTML(), newTask));
    this._createPages();
  }

  _addToLocalSession(newTask) {
    this.tasks.push(newTask);
  }

  removeTask(id) {
    this._removeFromLocalSession(id);
    removeFromStorage(id);
    this._createPages();
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
    const textField = taskHTML.querySelector('.taskfield__itemText');
    const itemDate = taskHTML.querySelector('.taskfield__itemDate');

    if (taskObject.completed) {
      checkbox.setAttribute('checked', 'checked');
    }

    taskHTML.setAttribute('data-creatingDate', taskObject.creatingDate);
    textField.textContent = taskObject.text;
    itemDate.textContent = createDate(taskObject.creatingDate);

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
    const pageList = this.pageListNode;
    const existingPagesNumber = pageList.children.length;
    const pagesNeededNumber = Math.ceil(taskNumber / this.renderValue);
    const extraPagesNumber = existingPagesNumber - pagesNeededNumber;
    let currentIndex = existingPagesNumber * this.renderValue;

    if (extraPagesNumber < 0) {
      for (let i = 0; i < Math.abs(extraPagesNumber); i++) {
        const newPage = createPageIconHTML();

        newPage.setAttribute('data-index', currentIndex);
        currentIndex += this.renderValue;

        newPage.onclick = (event) => {
          this.render({index: +event.target.getAttribute('data-index')});
        };

        pageList.appendChild(newPage);
      }
    }

    if (extraPagesNumber > 0) {
      for (let i = 0; i < extraPagesNumber; i++) {
        pageList.removeChild(pageList.lastChild);
      }
    }
  }

}

export default ToDoList;