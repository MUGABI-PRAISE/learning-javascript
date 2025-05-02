// let addTask =() =>{
//     // get the text input together with it's value
//     const textInput = document.getElementById('textInput');
//     const textValue = textInput.value.trim();

//     //check if the task input is empty
//     if(textValue === ""){
//       alert('task cannot be empty');
//       return;
    
//     }

//     //create a list item
//     let li = document.createElement('li');
//     //create a span element inside a li element.
//     let span = document.createElement('span');
//     span.className = 'task-content';
//     span.textContent = textValue;

//     //////////////// EDIT BUTTON //////////////////////////
//     let editBtn = document.createElement('button');
//     editBtn.textContent = 'Edit';
//     //add an even listener for this button
//     editBtn.addEventListener('click', function(){
//         let newTask = prompt("please update your task", span.textContent );  // syntax is ; prompt(messgae, default_value)

//         //check if new task is not null and not empty
//         if(newTask !== null && newTask.trim() !== ""){
//             span.textContent = newTask.trim();
//         }
//     });
    
//     /////////////////// DELETE BUTTON //////////////////////////////////
//     let deleteBtn = document.createElement('button');
//     deleteBtn.textContent = 'Delete';
//     //add an even listener for this button
//     deleteBtn.addEventListener('click', function(){
//         //confirm with the user if they want to delete this.
//         let agree = confirm('are you sure you want to delte this task?');
//         if(agree){
//             li.remove();
//         }
//     });
    
    
//     //////////////////////// CONNECTING THE ELEMENTS TOGETHER /////////////////////////
//     // append the span to the list item
//     li.appendChild(span); 
//     //append the edit button to the 'li' item
//     li.appendChild(editBtn);
//     //append the delte button to the 'li' item
//     li.appendChild(deleteBtn);
//     //// add 'li' element to the document. this will make the li item to come with all of its appended components
//     document.getElementById('taskList').appendChild(li); 
    
//     //clear the document.
//     textInput.value = "";
//   }

//FROM CHAT
// Load tasks from localStorage when the page loads
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
    if (completed) li.classList.add('completed');
  
    const span = document.createElement('span');
    span.className = 'task-content';
    span.textContent = textValue;
  
    // Mark as completed
    span.addEventListener('click', () => {
      li.classList.toggle('completed');
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
  