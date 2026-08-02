import { FiBell, FiMenu, FiSearch } from 'react-icons/fi';

function Navbar({ onMenu, onCollapse }) {
  return (
    <header className="topbar">
      <div className="topbar-brand">
        <button className="icon-button d-lg-none" onClick={onMenu} aria-label="Abrir menú"><FiMenu /></button>
        <button className="icon-button d-none d-lg-inline-flex" onClick={onCollapse} aria-label="Contraer menú"><FiMenu /></button>
        <div className="brand-mark">SA</div>
        <div><strong>Sistema Académico</strong><small>Portal administrativo</small></div>
      </div>
      <div className="topbar-actions">
        <div className="topbar-search d-none d-md-flex"><FiSearch /><span>Buscar en el sistema</span><kbd>⌘ K</kbd></div>
        <button className="icon-button notification-button" aria-label="Notificaciones"><FiBell /><span /></button>
        <div className="user-avatar">AD</div>
        <div className="d-none d-sm-block user-copy"><strong>Administrador</strong><small>Gestión académica</small></div>
      </div>
    </header>
  );
}

export default Navbar;
