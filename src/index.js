import addData from "../modules/addData.js";
import todoTasks from "../modules/todoTasks.js";
import markAs from "../modules/markAs.js";

const todoform = document.getElementById("EnterButton");
const todoInput = document.getElementById("newtodo");
const todoList = document.querySelector("#todos-list");

todoform.addEventListener('click', (event) => {
  event.preventDefault();
  console.log("submit");
  let newTask = {
    description: todoInput.value,
    completed: false,
    index: todoTasks.length,
  }
  todoTasks.push(newTask);
  addData(todoList, newTask, todoTasks)
});


for (let i = 0; i < todoTasks.length; i++) {
  addData(todoList, todoTasks[i], todoTasks, i);


}


