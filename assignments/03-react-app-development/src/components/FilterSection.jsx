const FILTERS = ['All', 'Pending', 'Completed']

function FilterSection({ activeFilter, onFilterChange }) {
  return (
    <section className="filter-section" aria-label="Filter tasks">
      <div className="filter-section__buttons" role="group" aria-label="Task filters">
        {FILTERS.map((filter) => (
          <button
            key={filter}
            type="button"
            className={`btn btn--filter${activeFilter === filter ? ' btn--filter-active' : ''}`}
            onClick={() => onFilterChange(filter)}
          >
            {filter}
          </button>
        ))}
      </div>
    </section>
  )
}

export default FilterSection
