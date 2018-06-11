// Модуль генерирует HTML-структуру элементов.

Element.prototype.addClass = function (newClass) {
  this.classList.add(newClass);
  return this;
};

function createElement(tag, className) {
  return document.createElement(tag).addClass(className);
}

// Создание html-структуры элемента из списка задач
function createListItem() {
  const blockName = 'taskfield__';
  const taskItem = createElement('li', blockName + 'taskItem');
  const itemTaskField = createElement('label', blockName + 'itemTaskField');
  const itemCheckbox = createElement('input', blockName + 'itemCheckbox');
  const itemText = createElement('span', blockName + 'itemText');
  const itemOptions = createElement('div', blockName + 'itemOptions');
  const itemDate = createElement('span', blockName + 'itemDate');
  const itemEditButton = createElement('a', blockName + 'itemEditButton');
  const itemDeleteButton = createElement('a', blockName + 'itemDeleteButton');

  itemCheckbox.setAttribute('type', 'checkbox');

  itemTaskField.appendChild(itemCheckbox);
  itemTaskField.appendChild(itemText);
  itemOptions.appendChild(itemDate);
  itemOptions.appendChild(itemEditButton);
  itemOptions.appendChild(itemDeleteButton);
  taskItem.appendChild(itemTaskField);
  taskItem.appendChild(itemOptions);

  return taskItem;
}

// Создание всплывающего окна с формой для исправления
function createTooltip() {
  const blockName = 'taskfield__';
  const container = createElement('div', blockName + 'tooltip');
  const inputField = createElement('input', blockName + 'tooltipInputField');
  const changeButton = createElement('input', blockName + 'tooltipChangeButton');
  const closeButton = createElement('a', blockName + 'tooltipCloseButton');

  inputField.setAttribute('type', 'text');
  changeButton.setAttribute('type', 'submit');

  container.appendChild(inputField);
  container.appendChild(changeButton);
  container.appendChild(closeButton);

  return container;
}

function createPageIcon() {
  const pageItem = createElement('li', 'taskfield__pageItem');
  return pageItem;
}

export {createListItem, createTooltip, createPageIcon};