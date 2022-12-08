const markAs = (checkBox, taskName, todoTask) => {
  // todoTasks[i].completed = !todoTasks[i].completed;

  if (todoTask.completed) {
    checkBox.classList.add('bi-check-circle-fill');
    checkBox.classList.remove('bi-circle');
    taskName.classList.add('checked');
  } else {
    checkBox.classList.add('bi-circle');
    checkBox.classList.remove('bi-check-circle-fill');
    taskName.classList.remove('checked');
  }
};

const markAsCompleted = document.querySelector('.markAsCompleted');
markAsCompleted.addEventListener('click', () => {
  console.log('imahsa');
  for (let i = 0; i < todoTasks.length; i++) {
    markAs(checkBox, taskName, todoTask);
  }
});

export default markAs;