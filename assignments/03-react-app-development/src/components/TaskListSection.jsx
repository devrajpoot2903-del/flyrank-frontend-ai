import EmptyState from './EmptyState'
import TaskCard from './TaskCard'

function TaskListSection({ tasks, onToggleComplete, onDeleteTask, hasActiveSearch }) {
  const hasTasks = tasks.length > 0

  const emptyMessage = hasActiveSearch ? 'No matching tasks found.' : 'No tasks yet'
  const emptyHint = hasActiveSearch
    ? 'Try a different search term or filter.'
    : 'Add a task above to get started'

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
          <EmptyState message={emptyMessage} hint={emptyHint} />
        )}
      </div>
    </section>
  )
}

export default TaskListSection
