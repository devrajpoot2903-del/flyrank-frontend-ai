import { useRef, useState } from 'react'
import { DEFAULT_PRIORITY } from '../utils/taskHelpers'

function TaskInputSection({ onAddTask }) {
  const [title, setTitle] = useState('')
  const [priority, setPriority] = useState(DEFAULT_PRIORITY)
  const inputRef = useRef(null)

  const trimmedTitle = title.trim()
  const canSubmit = trimmedTitle.length > 0

  const handleSubmit = (event) => {
    event.preventDefault()

    if (!canSubmit) {
      return
    }

    onAddTask(trimmedTitle, priority)
    setTitle('')
    setPriority(DEFAULT_PRIORITY)
    inputRef.current?.focus()
  }

  return (
    <section className="task-input-section" aria-label="Add new task">
      <h2 className="section-title">Add Task</h2>
      <form className="task-input-section__form" onSubmit={handleSubmit}>
        <div className="task-input-section__field">
          <label htmlFor="task-name" className="field-label">
            Task Name
          </label>
          <input
            ref={inputRef}
            id="task-name"
            type="text"
            className="text-input"
            placeholder="Enter task name"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
          />
        </div>

        <div className="task-input-section__field task-input-section__field--priority">
          <label htmlFor="task-priority" className="field-label">
            Priority
          </label>
          <select
            id="task-priority"
            className="select-input"
            value={priority}
            onChange={(event) => setPriority(event.target.value)}
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>

        <button
          type="submit"
          className="btn btn--primary task-input-section__button"
          disabled={!canSubmit}
        >
          Add Task
        </button>
      </form>
    </section>
  )
}

export default TaskInputSection
