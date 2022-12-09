import validateForm from './utils.js';
import { todoContainer, formInput, showMsg } from './domSelector.js';
import threeDotIcon from '../assets/three-dot-24.png';
import deleteIcon from '../assets/trash-24.png';

export default class Todos {
  constructor() {
    if (localStorage.getItem('todos')) {
      this.todos = JSON.parse(localStorage.getItem('todos'));
    } else {
      this.todos = [];
    }
  }

  sortAndSave = () => {
    const todoArr = [...this.todos];
    // sorting the list
    todoArr.sort((a, b) => {
      if (a.index > b.index) {
        return 1;
      } if (a.index < b.index) {
        return -1;
      }
      return 0;
    });

    let index = 0;
    todoArr.forEach((todo) => {
      index += 1;
      todo.index = index;
    });

    this.todos = [...todoArr];
    localStorage.setItem('todos', JSON.stringify(this.todos));
  }

  render = () => {
    todoContainer.innerHTML = '';
    showMsg.innerText = '';
    showMsg.classList.remove('form-error');
    this.sortAndSave();
    if (this.todos.length > 0) {
      this.todos.forEach((todo) => {
        const todoItem = document.createElement('li');
        todoItem.id = todo.index;
        todoItem.className = 'todo-item';
        const checkbox = document.createElement('input');
        checkbox.setAttribute('type', 'checkbox');
        checkbox.id = 'todo-compleate';

        // todo description
        const todoDes = document.createElement('p');
        todoDes.className = 'todo-des';
        todoDes.innerText = todo.description;

        todoDes.addEventListener('click', (e) => {
          this.onClickTodoDes(e);
        });

        // todo Three dot button
        const threeDotButton = document.createElement('button');
        threeDotButton.className = 'btn-three-dot';
        threeDotButton.innerHTML = `<img src="${threeDotIcon}" alt="...">`;

        // Append all the todo elements inside the todoItems
        todoItem.append(checkbox, todoDes, threeDotButton);

        // appent the todo item inside todoContainer
        todoContainer.appendChild(todoItem);
      });
    } else {
      todoContainer.innerHTML = '<p class="no-item">Your to list is empty! add tasks</p>';
    }
  }

  // onSubmit method
  onSubmit = () => {
    // Validate the form
    const description = formInput.value;
    const required = true;
    const minLength = 3;
    const maxLength = 255;
    const specialChar = false;
    const isValid = validateForm(description, required, minLength, maxLength, specialChar);

    // Check if form has error or not

    if (isValid.isError === true && isValid.msg.length >= 0) {
      showMsg.classList.add('form-error');
      showMsg.textContent = isValid.msg;
      formInput.classList.add('invalid');
    } else {
      // if form is empty add a new todo
      showMsg.classList.remove('form-error');
      showMsg.textContent = '';
      formInput.classList.remove('invalid');
      formInput.value = '';
      const index = this.todos.length + 1 || 1;
      const todo = {
        description,
        completed: false,
        index,
      };
      this.todos = [...this.todos, todo];
      // render the new todos on the dom
      this.render();
    }
  }

  delete = (index) => {
    this.todos = this.todos.filter((t) => t.index.toString() !== index);
    this.render();
  }

  // edit todo
  edit = (e) => {
    const { value } = e.target;

    // validate form
    const required = true;
    const minLength = 3;
    const maxLength = 255;
    const specialChar = false;
    const isValid = validateForm(value, required, minLength, maxLength, specialChar);
    if (isValid.isError === true && isValid.msg.length > 0) {
      showMsg.classList.add('form-error');
      showMsg.textContent = isValid.msg;
      e.target.classList.add('invalid-edit');
    } else {
      e.target.classList.remove('invalid-edit');
      const index = e.target.parentElement.id;
      const newArr = [...this.todos];
      const indx = newArr.findIndex((item) => index === item.index.toString());
      if (indx >= 0) {
        newArr[indx].description = value;
      }
      this.todos = [...newArr];
      this.render();
    }
  }

  // onClickDes enent method
  onClickTodoDes = (e) => {
    const parent = e.target.parentElement;
    parent.innerHTML = '';
    const checkbox = document.createElement('input');
    checkbox.setAttribute('type', 'checkbox');
    checkbox.id = 'todo-compleate';

    // todo description
    const todoEditInput = document.createElement('input');
    todoEditInput.setAttribute('type', 'text');
    todoEditInput.setAttribute('value', e.target.innerText);
    todoEditInput.className = 'todo-edit-input';

    // Add event on keypress in the textarea
    todoEditInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        this.edit(e);
      } else {
        showMsg.classList.remove('form-error');
        showMsg.innerText = '';
        e.target.classList.remove('invalid-edit');
      }
    });

    // todo Delete dot button
    const deleteTodo = document.createElement('button');
    deleteTodo.className = 'btn-delete';
    deleteTodo.innerHTML = `<img src="${deleteIcon}" alt="X">`;

    // adding event on delete icon
    deleteTodo.addEventListener('click', () => {
      const index = parent.id;
      this.delete(index);
    });

    parent.append(checkbox, todoEditInput, deleteTodo);
  }
}