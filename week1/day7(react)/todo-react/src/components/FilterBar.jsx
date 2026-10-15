function FilterBar({ currentFilter, onFilterChange, searchText, onSearchChange }) {
  return (
    <div className="filter-bar">
      <input
        type="text"
        placeholder="Search tasks..."
        value={searchText}
        onChange={(event) => onSearchChange(event.target.value)}
      />
      <div className="filter-buttons">
        <button onClick={() => onFilterChange("all")}    className={currentFilter === "all"    ? "active" : ""}>All</button>
        <button onClick={() => onFilterChange("active")} className={currentFilter === "active" ? "active" : ""}>Active</button>
        <button onClick={() => onFilterChange("done")}   className={currentFilter === "done"   ? "active" : ""}>Done</button>
      </div>
    </div>
  );
}

export default FilterBar;
