function Input({
  label,
  type = "text",
  name,
  value,
  onChange,
  placeholder,
  error,
  required = false,
  className = "",
}) {
  return (
    <div className={`mb-3 ${className}`.trim()}>
      {label && (
        <label htmlFor={name} className="form-label">
          {label}
          {required && <span className="text-danger"> *</span>}
        </label>
      )}
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className={`form-control ${error ? "is-invalid" : ""}`.trim()}
      />
      {error && <div className="invalid-feedback">{error}</div>}
    </div>
  );
}

export default Input;
