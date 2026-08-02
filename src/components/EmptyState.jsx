import { FiInbox } from 'react-icons/fi';
function EmptyState() {
  return <div className="empty-state"><div className="empty-icon"><FiInbox /></div><h3>No existen registros disponibles.</h3><p>Los nuevos registros aparecerán en esta sección.</p></div>;
}
export default EmptyState;
