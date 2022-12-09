import './style.css';
import Todos from './modules/todos.js';
import {
  formInput, btnSubmit, showMsg,
} from './modules/domSelector.js';

import enterIcon from './assets/enter-24.png';

const todos = new Todos();

formInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    e.preventDefault();
    todos.onSubmit();
  } else {
    showMsg.innerHTML = '';
    showMsg.classList.remove('form-error');
    formInput.classList.remove('invalid');
  }
});

btnSubmit.addEventListener('click', (e) => {
  e.preventDefault();
  todos.onSubmit();
  formInput.value = '';
});

window.onload = () => {
  todos.render();
  document.querySelector('.btn-submit').innerHTML = `<img src='${enterIcon}' alt='submit'/>`;
};
