function TodoForm({
  inputText,
  onInputChange,
  priority,
  onPriorityChange,
  onAddTodo,
}) {
  return (
    <form className="input-section" onSubmit={onAddTodo}>
      <input
        type="text"
        placeholder="What needs to be done?"
        aria-label="Task text"
        value={inputText}
        onChange={(event) => onInputChange(event.target.value)}
      />

      <select
        aria-label="Task priority"
        value={priority}
        onChange={(event) => onPriorityChange(event.target.value)}
      >
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>

      <button type="submit">Add</button>
    </form>
  );
}

export default TodoForm;