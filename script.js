const taskForm = document.getElementById('taskForm');
const taskList = document.getElementById('taskList');

taskForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const taskText = document.getElementById('taskInput').value;
  const taskTime = document.getElementById('taskTime').value;

  const li = document.createElement('li');
  li.innerHTML = `
    <span><strong>📋 ${taskText}</strong> <small>📅 ${taskTime}</small></span>
    <button onclick="toggleComplete(this)">✅</button>
    <button onclick="editTask(this)">✏️</button>
    <button onclick="deleteTask(this)">🗑</button>
  `;
  taskList.appendChild(li);
  taskForm.reset();
});

function toggleComplete(btn) {
  btn.parentElement.classList.toggle('completed');
}

function deleteTask(btn) {
  btn.parentElement.remove();
}

function editTask(btn) {
  const li = btn.parentElement;
  const textSpan = li.querySelector('span');
  const [taskText, taskTime] = textSpan.textContent.split('📅');
  const newText = prompt("Edit your task ✏️", taskText.replace('📋', '').trim());
  if (newText) {
    const time = taskTime.trim();
    textSpan.innerHTML = `<strong>📋 ${newText}</strong> <small>📅 ${time}</small>`;
  }
}

