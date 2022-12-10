/* eslint-disable linebreak-style */
import addData from '../modules/addData.js';
import todoTasks from '../modules/todoTasks.js';
// import markAs from '../modules/markAs.js';
import './styles.css';

const todoform = document.getElementById('EnterButton');
const todoInput = document.getElementById('newtodo');
const todoList = document.querySelector('#todos-list');
todoform.addEventListener('click', (event) => {
  event.preventDefault();
  const newTask = {
    description: todoInput.value,
    completed: false,
    index: todoTasks.length,
  };
  todoTasks.push(newTask);
  addData(todoList, newTask, todoTasks);
});

for (let i = 0; i < todoTasks.length; i += 1) {
  addData(todoList, todoTasks[i], todoTasks, i += 1);
}
