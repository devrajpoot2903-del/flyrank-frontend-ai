const FILTERS = ['All', 'Pending', 'Completed']

function FilterSection() {
  return (
    <section className="filter-section" aria-label="Filter tasks">
      <div className="filter-section__buttons" role="group" aria-label="Task filters">
        {FILTERS.map((filter) => (
          <button
            key={filter}
            type="button"
            className={`btn btn--filter${filter === 'All' ? ' btn--filter-active' : ''}`}
          >
            {filter}
          </button>
        ))}
      </div>
    </section>
  )
}

export default FilterSection
