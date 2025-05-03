// DOM Elements
const taskInput = document.getElementById('taskInput');
const addTaskBtn = document.getElementById('addTaskBtn');
const taskList = document.getElementById('taskList');
const filterBtns = document.querySelectorAll('.filter-btn');
const tasksLeft = document.getElementById('tasksLeft');
const clearCompletedBtn = document.getElementById('clearCompleted');

// Task array to store all tasks
let tasks = [];

// Initialize the app
function init() {
    // Load tasks from localStorage if available
    const savedTasks = localStorage.getItem('tasks');
    if (savedTasks) {
        tasks = JSON.parse(savedTasks);
    }
    
    renderTasks();
    updateTasksLeft();
    
    // Set up event listeners
    addTaskBtn.addEventListener('click', addTask);
    taskInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            addTask();
        }
    });
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', filterTasks);
    });
    
    clearCompletedBtn.addEventListener('click', clearCompletedTasks);
}

// Add a new task
function addTask() {
    const taskText = taskInput.value.trim();
    
    if (taskText === '') {
        alert('Please enter a task!');
        return;
    }
    
    // Create new task object
    const newTask = {
        id: Date.now(),
        text: taskText,
        completed: false
    };
    
    // Add to tasks array
    tasks.push(newTask);
    
    // Save to localStorage
    saveTasks();
    
    // Clear input field
    taskInput.value = '';
    
    // Render tasks
    renderTasks();
    updateTasksLeft();
}

// Render tasks based on current filter
function renderTasks() {
    // Clear the task list
    taskList.innerHTML = '';
    
    // Get current filter
    const currentFilter = document.querySelector('.filter-btn.active').dataset.filter;
    
    // Filter tasks based on current filter
    let filteredTasks = [];
    if (currentFilter === 'all') {
        filteredTasks = tasks;
    } else if (currentFilter === 'active') {
        filteredTasks = tasks.filter(task => !task.completed);
    } else if (currentFilter === 'completed') {
        filteredTasks = tasks.filter(task => task.completed);
    }
    
    // Render each task
    filteredTasks.forEach(task => {
        const taskItem = document.createElement('li');
        taskItem.className = 'task-item';
        taskItem.dataset.id = task.id;
        
        taskItem.innerHTML = `
            <input type="checkbox" class="task-checkbox" ${task.completed ? 'checked' : ''}>
            <span class="task-text ${task.completed ? 'completed' : ''}">${task.text}</span>
            <div class="task-actions">
                <button class="edit-btn"><i class="fas fa-edit"></i></button>
                <button class="delete-btn"><i class="fas fa-trash"></i></button>
            </div>
        `;
        
        taskList.appendChild(taskItem);
        
        // Add event listeners to the new task
        const checkbox = taskItem.querySelector('.task-checkbox');
        const editBtn = taskItem.querySelector('.edit-btn');
        const deleteBtn = taskItem.querySelector('.delete-btn');
        const taskText = taskItem.querySelector('.task-text');
        
        checkbox.addEventListener('change', () => toggleTaskComplete(task.id));
        deleteBtn.addEventListener('click', () => deleteTask(task.id));
        editBtn.addEventListener('click', () => editTask(task.id, taskText));
    });
}

// Toggle task completion status
function toggleTaskComplete(taskId) {
    // Find the task in the array
    const taskIndex = tasks.findIndex(task => task.id === taskId);
    
    if (taskIndex !== -1) {
        // Toggle completed status
        tasks[taskIndex].completed = !tasks[taskIndex].completed;
        
        // Save to localStorage
        saveTasks();
        
        // Update UI
        renderTasks();
        updateTasksLeft();
    }
}

// Delete a task
function deleteTask(taskId) {
    // Filter out the task with the given ID
    tasks = tasks.filter(task => task.id !== taskId);
    
    // Save to localStorage
    saveTasks();
    
    // Update UI
    renderTasks();
    updateTasksLeft();
}

// Edit a task
function editTask(taskId, taskTextElement) {
    const currentText = taskTextElement.textContent;
    const taskItem = taskTextElement.parentElement;
    
    // Replace text with input field
    taskItem.innerHTML = `
        <input type="text" class="edit-input" value="${currentText}">
        <button class="save-btn"><i class="fas fa-save"></i></button>
        <button class="cancel-btn"><i class="fas fa-times"></i></button>
    `;
    
    const editInput = taskItem.querySelector('.edit-input');
    const saveBtn = taskItem.querySelector('.save-btn');
    const cancelBtn = taskItem.querySelector('.cancel-btn');
    
    // Focus on the input field
    editInput.focus();
    
    // Save edited task
    saveBtn.addEventListener('click', () => {
        const newText = editInput.value.trim();
        if (newText) {
            updateTaskText(taskId, newText);
        }
    });
    
    // Cancel editing
    cancelBtn.addEventListener('click', () => {
        renderTasks();
    });
    
    // Save on Enter key
    editInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            const newText = editInput.value.trim();
            if (newText) {
                updateTaskText(taskId, newText);
            }
        }
    });
}

// Update task text
function updateTaskText(taskId, newText) {
    const taskIndex = tasks.findIndex(task => task.id === taskId);
    
    if (taskIndex !== -1) {
        tasks[taskIndex].text = newText;
        saveTasks();
        renderTasks();
    }
}

// Filter tasks
function filterTasks(e) {
    // Remove active class from all buttons
    filterBtns.forEach(btn => {
        btn.classList.remove('active');
    });
    
    // Add active class to clicked button
    e.target.classList.add('active');
    
    // Render tasks with the new filter
    renderTasks();
}

// Clear completed tasks
function clearCompletedTasks() {
    tasks = tasks.filter(task => !task.completed);
    saveTasks();
    renderTasks();
    updateTasksLeft();
}

// Update tasks left counter
function updateTasksLeft() {
    const activeTasks = tasks.filter(task => !task.completed).length;
    tasksLeft.textContent = `${activeTasks} ${activeTasks === 1 ? 'task' : 'tasks'} left`;
}

// Save tasks to localStorage
function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Initialize the app when the DOM is loaded
document.addEventListener('DOMContentLoaded', init);