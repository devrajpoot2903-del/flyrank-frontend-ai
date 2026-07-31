import StatCard from './StatCard'

function StatisticsSection({ tasks }) {
  const total = tasks.length
  const completed = tasks.filter((t) => t.completed).length
  const pending = total - completed

  return (
    <section className="statistics-section" aria-label="Task statistics">
      <StatCard label="Total Tasks" value={total} variant="total" />
      <StatCard label="Completed" value={completed} variant="completed" />
      <StatCard label="Pending" value={pending} variant="pending" />
    </section>
  )
}

export default StatisticsSection
