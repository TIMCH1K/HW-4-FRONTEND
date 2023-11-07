document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('.todo__form');
    const input = document.querySelector('.todo__input');
    const list = document.querySelector('.todo__list');

    let todos = JSON.parse(localStorage.getItem('todos')) || [];

    const saveTodos = () => {
        localStorage.setItem('todos', JSON.stringify(todos));
    };

    const renderTodos = () => {
        list.innerHTML = '';
        todos.forEach((todo, index) => {
            const listItem = document.createElement('li');
            listItem.className = 'todo__item';
            listItem.innerHTML = `
  <span class="todo__item-text ${todo.completed ? 'todo__item--completed' : ''}">${todo.text}</span>
      <div class="todo__buttons">
        <button class="todo__controls todo__delete" onclick="removeTodo(${index})">Delete</button>
        <button class="todo__controls todo__complete" onclick="toggleComplete(${index})">${todo.completed ? 'Undo' : 'Complete'}</button>
      </div>
    `;
            list.appendChild(listItem);
        });
    };

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        if (input.value.trim() === '') {
            alert('Добавь текста чтоль.');
            return;
        }
        todos.push({ text: input.value, completed: false });
        saveTodos();
        renderTodos();
        input.value = '';
    });

    window.removeTodo = (index) => {
        todos.splice(index, 1);
        saveTodos();
        renderTodos();
    };

    window.toggleComplete = (index) => {
        todos[index].completed = !todos[index].completed;
        saveTodos();
        renderTodos();
    };

    renderTodos();
});
