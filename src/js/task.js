// Модуль описывает класс Task

class Task {
  constructor({creatingDate, text}) {
    this.creatingDate = creatingDate;
    this.editingDate = this.creatingDate;
    this.text = text;
    this.completed = false;
  }
}

export default Task;