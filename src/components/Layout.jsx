import { useState } from 'react';
import Navbar from './Navbar.jsx';
import Sidebar from './Sidebar.jsx';

function Layout({ children }) {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className={`app-shell ${collapsed ? 'sidebar-collapsed' : ''}`}>
      <Navbar
        onMenu={() => setMobileOpen((value) => !value)}
        onCollapse={() => setCollapsed((value) => !value)}
      />
      <Sidebar
        collapsed={collapsed}
        mobileOpen={mobileOpen}
        onNavigate={() => setMobileOpen(false)}
      />
      {mobileOpen && <button className="sidebar-backdrop" aria-label="Cerrar menú" onClick={() => setMobileOpen(false)} />}
      <main className="app-content">{children}</main>
    </div>
  );
}

export default Layout;
