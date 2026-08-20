function SearchBar({ value, onChange, placeholder = "Search products..." }) {
  return (
    <div className="input-group">
      <span className="input-group-text bg-white">🔍</span>
      <input
        type="search"
        className="form-control"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}

export default SearchBar;
