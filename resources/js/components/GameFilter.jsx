import { GAME_OPTIONS } from '../constants';

export default function GameFilter({ selected, onChange }) {
  const toggle = (value) => {
    if (selected.includes(value)) {
      onChange(selected.filter((v) => v !== value));
    } else {
      onChange([...selected, value]);
    }
  };
  return (
    <div className="filter filter--game">
      <span className="filter__label">Game</span>
      <div className="filter__chips">
        {GAME_OPTIONS.map((game) => (
          <button
            key={game}
            type="button"
            className={`filter__chip ${selected.includes(game) ? 'filter__chip--active' : ''}`}
            onClick={() => toggle(game)}
          >
            {game}
          </button>
        ))}
      </div>
    </div>
  );
}
