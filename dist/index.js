const savedTodos = localStorage.getItem("todos");
let todos = savedTodos ? JSON.parse(savedTodos) : [];
function addTodos(title) {
    todos.push({ id: Date.now(), title: title, completed: false });
    localStorage.setItem("todos", JSON.stringify(todos));
}
function removeTodo(id) {
    todos = todos.filter((todo) => todo.id !== id);
    localStorage.setItem("todos", JSON.stringify(todos));
}
function toggleTodo(id) {
    const todo = todos.find((todo) => todo.id === id);
    if (todo) {
        todo.completed = !todo.completed;
        localStorage.setItem("todos", JSON.stringify(todos));
    }
}
const todoInput = document.getElementById("todo-input");
const addButton = document.getElementById("add-button");
const todoList = document.getElementById("todo-list");
if (addButton && todoInput && todoList) {
    addButton.addEventListener("click", () => {
        const title = todoInput.value.trim();
        if (title) {
            addTodos(title);
            todoInput.value = "";
            renderTodos();
        }
    });
}
function renderTodos() {
    if (todoList) {
        todoList.innerHTML = "";
        todos.forEach((todo) => {
            const li = document.createElement("li");
            li.textContent = todo.title;
            const completeButton = document.createElement("button");
            completeButton.textContent = "Complete";
            completeButton.addEventListener("click", () => {
                toggleTodo(todo.id);
                renderTodos();
            });
            const deleteButton = document.createElement("button");
            deleteButton.textContent = "Delete";
            deleteButton.addEventListener("click", () => {
                removeTodo(todo.id);
                renderTodos();
            });
            li.style.textDecoration = todo.completed ? "line-through" : "none";
            li.appendChild(completeButton);
            li.appendChild(deleteButton);
            todoList.appendChild(li);
        });
    }
}
renderTodos();
export {};
//# sourceMappingURL=index.js.map