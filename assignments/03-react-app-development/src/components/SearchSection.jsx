function SearchSection({ value, onChange }) {
  return (
    <section className="search-section" aria-label="Search tasks">
      <label htmlFor="task-search" className="visually-hidden">
        Search tasks
      </label>
      <div className="search-section__wrapper">
        <svg
          className="search-section__icon"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <circle cx="11" cy="11" r="8" />
          <path d="m21 21-4.3-4.3" />
        </svg>
        <input
          id="task-search"
          type="search"
          className="text-input search-section__input"
          placeholder="Search tasks..."
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      </div>
    </section>
  )
}

export default SearchSection
