// Define the shape of a Todo
interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

// Load saved Todos from localStorage when the app starts
const savedTodos = localStorage.getItem("todos");
let todos: Todo[] = savedTodos ? JSON.parse(savedTodos) : [];

// Add a new Todo and save the updated list
function addTodos(title: string): void {
  todos.push({ id: Date.now(), title: title, completed: false });
  localStorage.setItem("todos", JSON.stringify(todos));
}

// Remove a Todo using its ID and save the updated list
function removeTodo(id: number): void {
  todos = todos.filter((todo) => todo.id !== id);
  localStorage.setItem("todos", JSON.stringify(todos));
}

// Toggle a Todo between completed and incomplete
function toggleTodo(id: number): void {
  const todo = todos.find((todo) => todo.id === id);

  if (todo) {
    todo.completed = !todo.completed;
    localStorage.setItem("todos", JSON.stringify(todos));
  }
}
// Update a Todo's title and save the changes
function editTodo(id: number, newTitle: string): void {
  const todo = todos.find((todo) => todo.id === id);

  if (todo) {
    todo.title = newTitle;
    localStorage.setItem("todos", JSON.stringify(todos));
  }
}

// Get the HTML elements we need to interact with
const todoInput = document.getElementById("todo-input") as HTMLInputElement;
const addButton = document.getElementById("add-button") as HTMLButtonElement;
const todoList = document.getElementById("todo-list") as HTMLUListElement;

// Handle adding a Todo when the button is clicked
if (addButton && todoInput && todoList) {
  addButton.addEventListener("click", () => {
    const title = todoInput.value.trim();

    // Don't allow empty Todos
    if (title) {
      addTodos(title);
      todoInput.value = "";
      renderTodos();
    }
  });
}

// Render the current Todo state into the HTML
function renderTodos(): void {
  if (todoList) {
    todoList.innerHTML = "";

    todos.forEach((todo) => {
      const li = document.createElement("li");
      li.textContent = todo.title;

      // Create button to toggle completion
      const completeButton = document.createElement("button");
      completeButton.textContent = "Complete";

      completeButton.addEventListener("click", () => {
        toggleTodo(todo.id);
        renderTodos();
      });

      // Create button to delete the Todo
      const deleteButton = document.createElement("button");
      deleteButton.textContent = "Delete";

      deleteButton.addEventListener("click", () => {
        removeTodo(todo.id);
        renderTodos();
      });
      // Create button to edit the Todo
      const editButton = document.createElement("button");
      editButton.textContent = "Edit";

      editButton.addEventListener("click", () => {
        const newTitle = prompt("Edit Todo:", todo.title);

        if (newTitle !== null && newTitle.trim()) {
          editTodo(todo.id, newTitle.trim());
          renderTodos();
        }
      });

      // Visually mark completed Todos
      li.style.textDecoration = todo.completed ? "line-through" : "none";

      li.appendChild(completeButton);
      li.appendChild(deleteButton);
      li.appendChild(editButton);
      todoList.appendChild(li);
    });
  }
}

// Render saved Todos when the page first loads
renderTodos();
