import { useLanguage } from "../hooks/useLanguage";

function ErrorMessage({ message = "Something went wrong.", onRetry }) {
  const { t } = useLanguage();

  return (
    <div
      className="alert alert-danger d-flex flex-column align-items-start"
      role="alert"
    >
      <span>{message}</span>
      {onRetry && (
        <button className="btn btn-sm btn-outline-danger mt-2" onClick={onRetry}>
          {t("retry")}
        </button>
      )}
    </div>
  );
}

export default ErrorMessage;
