import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";
import FilterBar from "./components/FilterBar";
import TodoFooter from "./components/TodoFooter";


import { useState, 
  


 } from "react";
import "./App.css";

function TodoApp() {
  const [todos, setTodos] = useState(() => {
    const saved = localStorage.getItem("todos");
    return saved ? JSON.parse(saved) : [];
  });

  const [inputText, setInputText] = useState("");
  const [priority, setPriority] = useState("medium");
  const [currentFilter, setCurrentFilter] = useState("all");
  const [searchText, setSearchText] = useState("");

  function addTodo(event) {
    event.preventDefault();

    const text = inputText.trim();
    if (!text) return;

    const newTodo = {
      id: crypto.randomUUID(),
      text,
      completed: false,
      priority,
    };

    setTodos((previousTodos) => [...previousTodos, newTodo]);
    setInputText("");
  }

  function toggleTodo(id) {
    setTodos((previousTodos) =>
      previousTodos.map((todo) =>
        todo.id === id
          ? { ...todo, completed: !todo.completed }
          : todo
      )
    );
  }

  function deleteTodo(id) {
    setTodos((previousTodos) =>
      previousTodos.filter((todo) => todo.id !== id)
    );
  }
  function clearCompleted() {
    setTodos('(previousTodos) => previousTodos.filter((todo) => !todo.completed)');
  }
 useEffect(() => {
  localStorage.setItem("todos", JSON.stringify(todos));
}, [todos]);




  const filteredTodos = todos
    .filter((todo) => {
      if (currentFilter === "active") return !todo.completed;
      if (currentFilter === "done") return todo.completed;
      return true;
    })
    .filter((todo) =>
      todo.text.toLowerCase().includes(searchText.toLowerCase())
    );

  return (
    <div className="todo-container">
      <header>
        <h1>Todos</h1>
      </header>

      <TodoForm
        inputText={inputText}
        onInputChange={setInputText}
        priority={priority}
        onPriorityChange={setPriority}
        onAddTodo={addTodo}
      />

      <FilterBar
        currentFilter={currentFilter}
        onFilterChange={setCurrentFilter}
        searchText={searchText}
        onSearchChange={setSearchText}
      />

      <p>Tasks added: {todos.length}</p>

      <TodoList
        todos={filteredTodos}
        onToggle={toggleTodo}
        onDelete={deleteTodo}
      />
      <TodoFooter
        todos={todos}
        onClearCompleted={clearCompleted}
      />

    </div>
  );
}

export default TodoApp;
