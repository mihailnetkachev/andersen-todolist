// Модуль выполняет операции с хранилищем.

// получение элементов из хранилища ввиде массива с объектами
function getStorage() {
  const storage = localStorage.getItem('tasks');
  return (storage) ? JSON.parse(storage) : [];
}

// отправка элементов в хранилище ввиду JSON-строки
function setStorage(tasks) {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// добавление задачи в хранилище
function addToStorage(addingTask) {
  const currentStorage = getStorage();

  currentStorage.push(addingTask);
  setStorage(currentStorage);
}

// удаление задачи из хранилища
function removeFromStorage(id) {
  const currentStorage = getStorage();

  currentStorage.forEach((task, currentIndex, storage) => {
      if (task.creatingDate === id) {
        storage.splice(currentIndex, 1);
      }
  });
  setStorage(currentStorage);
}

function changeInStorage(id, newText, editingTime) {
  const currentStorage = getStorage();

  currentStorage.forEach((currentTask) => {
      if (currentTask.creatingDate === id) {
        currentTask.editingDate = editingTime;
        currentTask.text = newText;
      }
  });
  setStorage(currentStorage);
}

function completeInStorage(id) {
  const currentStorage = getStorage();

  currentStorage.forEach((currentTask) => {
    if (currentTask.creatingDate === id) {
      currentTask.completed = !currentTask.completed;
    }
  });
  setStorage(currentStorage);
}

export {getStorage, addToStorage, removeFromStorage, changeInStorage, completeInStorage};