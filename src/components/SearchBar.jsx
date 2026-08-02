import { FiSearch, FiX } from 'react-icons/fi';
function SearchBar({ value, onChange, placeholder = 'Buscar registros...' }) {
  return (
    <div className="search-bar"><FiSearch /><input value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} aria-label={placeholder} />
      {value && <button onClick={() => onChange('')} aria-label="Limpiar búsqueda"><FiX /></button>}
    </div>
  );
}
export default SearchBar;
