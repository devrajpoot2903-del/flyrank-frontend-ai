function TaskInputSection() {
  return (
    <section className="task-input-section" aria-label="Add new task">
      <h2 className="section-title">Add Task</h2>
      <div className="task-input-section__form">
        <div className="task-input-section__field">
          <label htmlFor="task-name" className="field-label">
            Task Name
          </label>
          <input
            id="task-name"
            type="text"
            className="text-input"
            placeholder="Enter task name"
          />
        </div>

        <div className="task-input-section__field task-input-section__field--priority">
          <label htmlFor="task-priority" className="field-label">
            Priority
          </label>
          <select id="task-priority" className="select-input" defaultValue="medium">
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>

        <button type="button" className="btn btn--primary task-input-section__button">
          Add Task
        </button>
      </div>
    </section>
  )
}

export default TaskInputSection
