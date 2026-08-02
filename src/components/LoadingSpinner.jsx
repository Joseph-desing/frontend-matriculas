function LoadingSpinner({ label = 'Cargando información...' }) {
  return <div className="loading-state"><div className="spinner-border text-primary" role="status" /><span>{label}</span></div>;
}
export default LoadingSpinner;
