const savedTodos = localStorage.getItem("todos");
const todos = savedTodos ? JSON.parse(savedTodos) : [];
function addTodos(title) {
    todos.push({ id: Date.now(), title: title, completed: false });
    localStorage.setItem("todos", JSON.stringify(todos));
}
function removeTodo(id) {
    const index = todos.findIndex((todo) => todo.id === id);
    if (index !== -1) {
        todos.splice(index, 1);
        localStorage.setItem("todos", JSON.stringify(todos));
    }
}
export {};
//# sourceMappingURL=index.js.map