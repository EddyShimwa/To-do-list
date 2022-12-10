import markAs from './markAs.js';

const addData = (todoList, todoTask, todoTasks, i) => {
  const task = document.createElement('div');
  task.classList.add('todo');
  const taskName = document.createElement('p');
  taskName.innerText = todoTask.description;

  const checkBox = document.createElement('i');
  checkBox.classList.add('bi');

  checkBox.addEventListener('click', () => {
    todoTask.completed = !todoTask.completed;

    markAs(checkBox, taskName, todoTask);
  });

  markAs(checkBox, taskName, todoTask);

  const trashIcon = document.createElement('i');
  trashIcon.classList.add('bi', 'bi-trash');
  trashIcon.style.visibility = 'hidden';

  trashIcon.addEventListener('click', () => {
    todoTasks.splice(i, 1);
    todoList.removeChild(task);
  });

  const threeDots = document.createElement('i');
  threeDots.classList.add('bi', 'bi-three-dots-vertical');

  threeDots.addEventListener('click', () => {
    //    threeDots.classList.add("bi", "bi-trash")  threeDots.classList.add("bi", "bi-trash");

  });

  task.appendChild(checkBox);
  task.appendChild(taskName);
  task.appendChild(trashIcon);
  task.appendChild(threeDots);
  todoList.appendChild(task);
};

const removeTask = () => {

};
removeTask();

export default addData;
