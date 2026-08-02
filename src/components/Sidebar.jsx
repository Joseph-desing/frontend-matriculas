import { NavLink } from 'react-router-dom';
import { FiBookOpen, FiGrid, FiLayers, FiUsers } from 'react-icons/fi';
import { HiOutlineAcademicCap } from 'react-icons/hi2';

const links = [
  { to: '/', label: 'Dashboard', icon: FiGrid, end: true },
  { to: '/usuarios', label: 'Usuarios', icon: FiUsers },
  { to: '/estudiantes', label: 'Estudiantes', icon: HiOutlineAcademicCap },
  { to: '/materias', label: 'Materias', icon: FiBookOpen },
  { to: '/matriculas', label: 'Matrículas', icon: FiLayers },
];

function Sidebar({ collapsed, mobileOpen, onNavigate }) {
  return (
    <aside className={`sidebar ${mobileOpen ? 'mobile-open' : ''}`}>
      <div className="sidebar-label">{collapsed ? 'MENÚ' : 'NAVEGACIÓN PRINCIPAL'}</div>
      <nav className="sidebar-nav">
        {links.map(({ to, label, icon: Icon, end }) => (
          <NavLink key={to} to={to} end={end} onClick={onNavigate} title={collapsed ? label : undefined}
            className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}>
            <Icon /><span>{label}</span>
          </NavLink>
        ))}
      </nav>
      <div className="sidebar-support">
        <div className="support-icon">?</div>
        <div><strong>¿Necesitas ayuda?</strong><small>Centro de soporte</small></div>
      </div>
    </aside>
  );
}

export default Sidebar;
