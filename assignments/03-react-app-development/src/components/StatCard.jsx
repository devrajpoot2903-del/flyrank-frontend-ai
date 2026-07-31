function StatCard({ label, value, variant = 'total' }) {
  return (
    <article className={`stat-card stat-card--${variant}`}>
      <p className="stat-card__label">{label}</p>
      <p className="stat-card__value">{value}</p>
    </article>
  )
}

export default StatCard
