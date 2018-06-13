// Модуль позволяет искать элементы в DOM-структуре

function getElement(selector, flag, element) {
  switch (flag) {
    case 'id':
      return document.getElementById(selector);
    case 'class':
      return (element) ? element.getElementsByClassName(selector)[0] : document.getElementsByClassName(selector)[0];
  }
}

function removeElement(element) {
  element.parentNode.removeChild(element);
}

export {getElement, removeElement};