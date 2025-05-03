//Load tasks from localStorage when the page loads
window.onload = function () {
    const storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    storedTasks.forEach(task => renderTask(task.text, task.completed));
  };
  
  // Save tasks to localStorage
  function saveTasks() {
    const tasks = [];
    document.querySelectorAll('#taskList li').forEach(li => {
      const text = li.querySelector('.task-content').textContent;
      const completed = li.classList.contains('completed');
      tasks.push({ text, completed });
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }
  
  // Render a single task item
  function renderTask(textValue, completed = false) {
    const li = document.createElement('li');
    if (completed) li.classList.add('completed'); // classList is a property of dom elements that deals with class attribute on those elements. you can add, remove, or play with classes the way you like
  
    const span = document.createElement('span');
    span.className = 'task-content';
    span.textContent = textValue;
  
    // Mark as completed
    span.addEventListener('click', () => {
      li.classList.toggle('completed'); // adds the class if it’s not there, removes it if it is.
      saveTasks();
    });
  
    const editBtn = document.createElement('button');
    editBtn.textContent = 'Edit';
    editBtn.addEventListener('click', function () {
      let newTask = prompt('Please update your task', span.textContent);
      if (newTask !== null && newTask.trim() !== '') {
        span.textContent = newTask.trim();
        saveTasks();
      }
    });
  
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.addEventListener('click', function () {
      if (confirm('Are you sure you want to delete this task?')) {
        li.remove();
        saveTasks();
      }
    });
  
    li.appendChild(span);
    li.appendChild(editBtn);
    li.appendChild(deleteBtn);
    document.getElementById('taskList').appendChild(li);
  }
  
  // Your existing function modified to use renderTask and save
  let addTask = () => {
    const textInput = document.getElementById('textInput');
    const textValue = textInput.value.trim();
  
    if (textValue === '') {
      alert('Task cannot be empty');
      return;
    }
  
    renderTask(textValue);
    saveTasks();
    textInput.value = '';
  };
  