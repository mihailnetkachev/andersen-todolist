// Модуль позволяет искать элементы в DOM-структуре

function getElement(selector, flag) {
  switch (flag) {
    case 'id':
      return document.getElementById(selector);
    case 'class':
      return document.getElementsByClassName(selector)[0];
  }
}

function removeElement(element) {
  element.parentNode.removeChild(element);
}

export {getElement, removeElement};