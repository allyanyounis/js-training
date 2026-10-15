function TodoFooter({ todos, onClearCompleted }) {
  const activeCount = todos.filter((todo) => !todo.completed).length;
  const hasCompleted = todos.some((todo) => todo.completed);

  return (
    <footer className="todo-footer">
      <span>{activeCount} {activeCount === 1 ? "task" : "tasks"} left</span>

      {hasCompleted && (
        <button onClick={onClearCompleted}>Clear completed</button>
      )}
    </footer>
  );
}

export default TodoFooter;
