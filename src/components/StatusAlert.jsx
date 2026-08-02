import { FiAlertCircle, FiCheckCircle } from 'react-icons/fi';
function StatusAlert({ type = 'success', children }) {
  if (!children) return null;
  return <div className={`status-alert ${type}`} role="alert">{type === 'success' ? <FiCheckCircle /> : <FiAlertCircle />}<span>{children}</span></div>;
}
export default StatusAlert;
