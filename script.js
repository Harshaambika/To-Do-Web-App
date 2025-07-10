const taskForm = document.getElementById('taskForm');
const taskList = document.getElementById('taskList');

// Load tasks from localStorage on page load
window.onload = function() {
  loadTasks();
};

taskForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const taskText = document.getElementById('taskInput').value;
  const taskTime = document.getElementById('taskTime').value;

  const task = {
    text: taskText,
    time: taskTime,
    completed: false
  };

  addTaskToUI(task);
  saveTaskToStorage(task);
  taskForm.reset();
});

function addTaskToUI(task) {
  const li = document.createElement('li');
  li.innerHTML = `
    <span class="${task.completed ? 'completed' : ''}">
      <strong>📋 ${task.text}</strong> <small>📅 ${task.time}</small>
    </span>
    <button onclick="toggleComplete(this)">✅</button>
    <button onclick="editTask(this)">✏️</button>
    <button onclick="deleteTask(this)">🗑</button>
  `;
  taskList.appendChild(li);
}

function toggleComplete(btn) {
  const li = btn.parentElement;
  li.classList.toggle('completed');
  updateStorage();
}

function deleteTask(btn) {
  const li = btn.parentElement;
  li.remove();
  updateStorage();
}

function editTask(btn) {
  const li = btn.parentElement;
  const textSpan = li.querySelector('span');
  const [taskText, taskTime] = textSpan.textContent.split('📅');
  const newText = prompt("Edit your task ✏️", taskText.replace('📋', '').trim());
  if (newText) {
    const time = taskTime.trim();
    textSpan.innerHTML = `<strong>📋 ${newText}</strong> <small>📅 ${time}</small>`;
    updateStorage();
  }
}

function saveTaskToStorage(task) {
  let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  tasks.push(task);
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks() {
  let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  tasks.forEach(task => addTaskToUI(task));
}

function updateStorage() {
  const tasks = [];
  const items = document.querySelectorAll('#taskList li');
  items.forEach(li => {
    const textSpan = li.querySelector('span');
    const [taskText, taskTime] = textSpan.textContent.split('📅');
    tasks.push({
      text: taskText.replace('📋', '').trim(),
      time: taskTime.trim(),
      completed: li.classList.contains('completed')
    });
  });
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

