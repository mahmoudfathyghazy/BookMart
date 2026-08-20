function ErrorMessage({ message = "Something went wrong.", onRetry }) {
  return (
    <div className="alert alert-danger d-flex flex-column align-items-start" role="alert">
      <span>{message}</span>
      {onRetry && (
        <button className="btn btn-sm btn-outline-danger mt-2" onClick={onRetry}>
          Try again
        </button>
      )}
    </div>
  );
}

export default ErrorMessage;
