document.addEventListener("DOMContentLoaded", loadTasks);

function addTask() {
  const taskInput = document.getElementById("taskInput");
  const taskText = taskInput.value.trim();

  if (taskText === "") return;

  createTaskElement(taskText);
  saveTask(taskText);

  taskInput.value = "";
}

function createTaskElement(text) {
  const li = document.createElement("li");
  li.textContent = text;

  li.addEventListener("click", function () {
    li.classList.toggle("completed");
    updateLocalStorage();
  });

  li.addEventListener("dblclick", function () {
    const newText = prompt("Edit task:", li.firstChild.nodeValue);
    if (newText !== null && newText.trim() !== "") {
      li.firstChild.nodeValue = newText;
      updateLocalStorage();
    }
  });

  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "X";
  deleteBtn.style.float = "right";
  deleteBtn.style.backgroundColor = "crimson";
  deleteBtn.style.color = "white";
  deleteBtn.style.border = "none";
  deleteBtn.style.padding = "2px 8px";
  deleteBtn.style.borderRadius = "5px";
  deleteBtn.style.cursor = "pointer";

  deleteBtn.onclick = function () {
    li.remove();
    updateLocalStorage();
  };

  li.appendChild(deleteBtn);
  document.getElementById("taskList").appendChild(li);
}

function saveTask(task) {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.push(task);
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.forEach(task => createTaskElement(task));
}

function updateLocalStorage() {
  let tasks = [];
  document.querySelectorAll("#taskList li").forEach(li => {
    tasks.push(li.firstChild.nodeValue.trim());
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function clearAllTasks() {
  if (confirm("Are you sure you want to clear all tasks?")) {
    localStorage.removeItem("tasks");
    document.getElementById("taskList").innerHTML = "";
  }
}

function toggleDarkMode() {
  document.body.classList.toggle("dark-mode");
}
