import EmptyState from './EmptyState'
import TaskCard from './TaskCard'

function TaskListSection({ tasks, onToggleComplete, onDeleteTask }) {
  const hasTasks = tasks.length > 0

  return (
    <section className="task-list-section" aria-label="Task list">
      <h2 className="section-title">Your Tasks</h2>
      <div
        className={`task-list-section__content${hasTasks ? ' task-list-section__content--filled' : ''}`}
      >
        {hasTasks ? (
          <ul className="task-list">
            {tasks.map((task) => (
              <li key={task.id} className="task-list__item">
                <TaskCard
                  task={task}
                  onToggleComplete={onToggleComplete}
                  onDeleteTask={onDeleteTask}
                />
              </li>
            ))}
          </ul>
        ) : (
          <EmptyState />
        )}
      </div>
    </section>
  )
}

export default TaskListSection
