import EmptyState from './EmptyState'

function TaskListSection() {
  return (
    <section className="task-list-section" aria-label="Task list">
      <h2 className="section-title">Your Tasks</h2>
      <div className="task-list-section__content">
        <EmptyState />
      </div>
    </section>
  )
}

export default TaskListSection
