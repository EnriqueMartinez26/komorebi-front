export function Loader({ label = "Cargando..." }) {
  return (
    <div className="loader" role="status" aria-live="polite">
      <span className="loader-dot" />
      <span>{label}</span>
    </div>
  );
}

