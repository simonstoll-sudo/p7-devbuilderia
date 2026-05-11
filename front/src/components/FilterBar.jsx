const OPTIONS = ['tous', 'disponibles', 'indisponibles'];

export default function FilterBar({ value, onChange }) {
  return (
    <div className="filter-bar" role="group" aria-label="Filtrer les paniers">
      {OPTIONS.map((option) => (
        <button
          key={option}
          className={`filter-btn${value === option ? ' filter-btn--active' : ''}`}
          onClick={() => onChange(option)}
        >
          {option.charAt(0).toUpperCase() + option.slice(1)}
        </button>
      ))}
    </div>
  );
}
