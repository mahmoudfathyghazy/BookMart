function Button({
  children,
  variant = "primary",
  size,
  type = "button",
  onClick,
  disabled = false,
  className = "",
}) {
  const sizeClass = size ? `btn-${size}` : "";
  return (
    <button
      type={type}
      className={`btn btn-${variant} ${sizeClass} ${className}`.trim()}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}

export default Button;
