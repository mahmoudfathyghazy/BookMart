function EmptyState({ message = "Nothing here yet.", actionLabel, onAction }) {
  return (
    <div className="text-center py-5">
      <p className="text-muted mb-3">{message}</p>
      {actionLabel && onAction && (
        <button className="btn btn-primary" onClick={onAction}>
          {actionLabel}
        </button>
      )}
    </div>
  );
}

export default EmptyState;
