import { ROLE_OPTIONS } from '../constants';

export default function RoleFilter({ selected, onChange }) {
  const toggle = (value) => {
    if (selected.includes(value)) {
      onChange(selected.filter((v) => v !== value));
    } else {
      onChange([...selected, value]);
    }
  };
  return (
    <div className="filter filter--role">
      <span className="filter__label">Role</span>
      <div className="filter__chips">
        {ROLE_OPTIONS.map(({ value, label }) => (
          <button
            key={value}
            type="button"
            className={`filter__chip ${selected.includes(value) ? 'filter__chip--active' : ''}`}
            onClick={() => toggle(value)}
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  );
}
