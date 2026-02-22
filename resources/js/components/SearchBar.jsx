export default function SearchBar({ value, onChange, placeholder = 'Search event names…' }) {
  return (
    <div className="search-bar">
      <label htmlFor="event-search" className="search-bar__label">
        Event name
      </label>
      <input
        id="event-search"
        type="search"
        className="search-bar__input"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-label="Search events by name"
      />
    </div>
  );
}
