const PRIORITY_LABELS = {
  low: 'Low',
  medium: 'Medium',
  high: 'High',
}

function TaskCard({ task, onToggleComplete, onDeleteTask }) {
  return (
    <article className={`task-card${task.completed ? ' task-card--completed' : ''}`}>
      <div className="task-card__main">
        <input
          type="checkbox"
          className="task-card__checkbox"
          checked={task.completed}
          onChange={() => onToggleComplete(task.id)}
          aria-label={`Mark "${task.title}" as ${task.completed ? 'incomplete' : 'complete'}`}
        />
        <div className="task-card__info">
          <h3
            className={`task-card__title${task.completed ? ' task-card__title--completed' : ''}`}
          >
            {task.title}
          </h3>
          <div className="task-card__meta">
            <span className={`priority-badge priority-badge--${task.priority}`}>
              {PRIORITY_LABELS[task.priority]}
            </span>
            <span
              className={`status-badge${task.completed ? ' status-badge--completed' : ' status-badge--pending'}`}
            >
              {task.completed ? 'Completed' : 'Pending'}
            </span>
          </div>
        </div>
      </div>
      <div className="task-card__actions">
        <button
          type="button"
          className="btn btn--secondary"
          onClick={() => onToggleComplete(task.id)}
        >
          {task.completed ? 'Undo Complete' : 'Mark Complete'}
        </button>
        <button
          type="button"
          className="btn btn--danger"
          onClick={() => onDeleteTask(task.id)}
        >
          Delete
        </button>
      </div>
    </article>
  )
}

export default TaskCard
