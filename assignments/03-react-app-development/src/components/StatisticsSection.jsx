import StatCard from './StatCard'

function StatisticsSection() {
  return (
    <section className="statistics-section" aria-label="Task statistics">
      <StatCard label="Total Tasks" value={0} variant="total" />
      <StatCard label="Completed" value={0} variant="completed" />
      <StatCard label="Pending" value={0} variant="pending" />
    </section>
  )
}

export default StatisticsSection
