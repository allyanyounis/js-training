// State
let todos = JSON.parse(localStorage.getItem("todos")) || [];
let currentFilter = "all";

// DOM Elements
const todoInput = document.getElementById("todoInput");
const addBtn = document.getElementById("addBtn");
const todoList = document.getElementById("todoList");
const itemsLeft = document.getElementById("itemsLeft");
const clearCompletedBtn = document.getElementById("clearCompletedBtn");
const filterButtons = document.querySelectorAll(".filter-btn");

function saveTodos() {
  localStorage.setItem("todos", JSON.stringify(todos));
}

// Single render function
function render() {
  let filtered = todos;
  if (currentFilter === "active") {
    filtered = todos.filter((t) => !t.completed);
  } else if (currentFilter === "done") {
    filtered = todos.filter((t) => t.completed);
  }

  todoList.innerHTML = "";
  filtered.forEach((todo) => {
    const li = document.createElement("li");
    li.className = `todo-item ${todo.completed ? "completed" : ""}`;
    li.dataset.id = todo.id;

    li.innerHTML = `
      <div class="todo-content">
        <input type="checkbox" class="todo-checkbox" ${todo.completed ? "checked" : ""} />
        <span class="todo-text" title="Double click to edit">${escapeHtml(todo.text)}</span>
      </div>
      <button class="delete-btn" aria-label="Delete">&times;</button>
    `;

    todoList.appendChild(li);
  });

  const activeCount = todos.filter((t) => !t.completed).length;
  itemsLeft.textContent = `${activeCount} task${activeCount === 1 ? "" : "s"} left`;

  clearCompletedBtn.style.visibility = todos.some((t) => t.completed) ? "visible" : "hidden";

  filterButtons.forEach((btn) => {
    btn.classList.toggle("active", btn.dataset.filter === currentFilter);
  });
}

function escapeHtml(text) {
  const div = document.createElement("div");
  div.textContent = text;
  return div.innerHTML;
}

// Actions
function addTodo() {
  const text = todoInput.value.trim();
  if (!text) return;

  todos.push({
    id: Date.now(),
    text,
    completed: false
  });

  todoInput.value = "";
  todoInput.focus();
  saveTodos();
  render();
}

function toggleTodo(id) {
  todos = todos.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t));
  saveTodos();
  render();
}

function deleteTodo(id) {
  todos = todos.filter((t) => t.id !== id);
  saveTodos();
  render();
}

function updateTodoText(id, newText) {
  const trimmed = newText.trim();
  if (!trimmed) {
    deleteTodo(id); // If emptied, delete the task
    return;
  }
  todos = todos.map((t) => (t.id === id ? { ...t, text: trimmed } : t));
  saveTodos();
  render();
}

function clearCompleted() {
  todos = todos.filter((t) => !t.completed);
  saveTodos();
  render();
}

// Event Listeners
addBtn.addEventListener("click", addTodo);
todoInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") addTodo();
});

// Single-click delegation for checkbox and delete button
todoList.addEventListener("click", (e) => {
  const item = e.target.closest(".todo-item");
  if (!item) return;

  const id = Number(item.dataset.id);
  if (e.target.classList.contains("todo-checkbox")) {
    toggleTodo(id);
  } else if (e.target.classList.contains("delete-btn")) {
    deleteTodo(id);
  }
});

// STRETCH GOAL: Double-click to edit task text
todoList.addEventListener("dblclick", (e) => {
  if (!e.target.classList.contains("todo-text")) return;

  const item = e.target.closest(".todo-item");
  const id = Number(item.dataset.id);
  const currentText = e.target.textContent;

  // Replace span with an input box
  const input = document.createElement("input");
  input.type = "text";
  input.className = "edit-input";
  input.value = currentText;

  e.target.replaceWith(input);
  input.focus();
  input.select();

  let isSaved = false;
  const finishEdit = () => {
    if (isSaved) return;
    isSaved = true;
    updateTodoText(id, input.value);
  };

  input.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      finishEdit();
    } else if (event.key === "Escape") {
      isSaved = true;
      render(); // Cancel edit and restore original text
    }
  });

  input.addEventListener("blur", finishEdit);
});

filterButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    currentFilter = btn.dataset.filter;
    render();
  });
});

clearCompletedBtn.addEventListener("click", clearCompleted);

// Initial load
render();
