import { useEffect, useState } from 'react';
import { FiArrowUpRight, FiBookOpen, FiLayers, FiUsers } from 'react-icons/fi';
import { HiOutlineAcademicCap } from 'react-icons/hi2';
import { Link } from 'react-router-dom';
import PageHeader from '../components/PageHeader.jsx';
import LoadingSpinner from '../components/LoadingSpinner.jsx';
import StatusAlert from '../components/StatusAlert.jsx';
import { obtenerUsuarios } from '../services/usuarioService.js';
import { obtenerEstudiantes } from '../services/estudianteService.js';
import { obtenerMaterias } from '../services/materiaService.js';
import { obtenerMatriculas } from '../services/matriculaService.js';

const cards = [
  { key: 'usuarios', label: 'Usuarios', detail: 'Cuentas registradas', icon: FiUsers, color: 'blue', to: '/usuarios' },
  { key: 'estudiantes', label: 'Estudiantes', detail: 'Alumnos activos', icon: HiOutlineAcademicCap, color: 'purple', to: '/estudiantes' },
  { key: 'materias', label: 'Materias', detail: 'Oferta académica', icon: FiBookOpen, color: 'green', to: '/materias' },
  { key: 'matriculas', label: 'Matrículas', detail: 'Inscripciones totales', icon: FiLayers, color: 'orange', to: '/matriculas' },
];
function InicioPage() {
  const [stats, setStats] = useState({ usuarios: 0, estudiantes: 0, materias: 0, matriculas: 0 });
  const [loading, setLoading] = useState(true), [error, setError] = useState('');
  useEffect(() => { Promise.all([obtenerUsuarios(), obtenerEstudiantes(), obtenerMaterias(), obtenerMatriculas()])
    .then(([a, b, c, d]) => setStats({ usuarios: a?.length || 0, estudiantes: b?.length || 0, materias: c?.length || 0, matriculas: d?.length || 0 }))
    .catch((e) => setError(e.message)).finally(() => setLoading(false)); }, []);
  return <div className="page-container">
    <PageHeader eyebrow="RESUMEN GENERAL" title="Buenos días, Administrador" description="Aquí tienes una vista general del estado de tu sistema académico." />
    <StatusAlert type="error">{error}</StatusAlert>
    {loading ? <LoadingSpinner label="Actualizando indicadores..." /> : <div className="row g-4 mb-4">{cards.map(({ key, label, detail, icon: Icon, color, to }) => <div className="col-12 col-sm-6 col-xl-3" key={key}><Link to={to} className="stat-card"><div className={`stat-icon ${color}`}><Icon /></div><div className="stat-copy"><span>{label}</span><strong>{stats[key]}</strong><small>{detail}</small></div><FiArrowUpRight className="stat-arrow" /></Link></div>)}</div>}
    <div className="welcome-panel"><div><span className="eyebrow">PLATAFORMA CENTRALIZADA</span><h2>Gestión académica más simple</h2><p>Administra estudiantes, materias, usuarios y matrículas desde un solo lugar. Toda la información importante está organizada y lista para trabajar.</p><Link className="btn btn-primary" to="/matriculas">Gestionar matrículas <FiArrowUpRight /></Link></div><div className="welcome-visual"><div className="visual-ring"><HiOutlineAcademicCap /></div><span className="dot dot-one" /><span className="dot dot-two" /></div></div>
    <div className="quick-section"><h2>Accesos rápidos</h2><p>Continúa trabajando en los módulos principales.</p><div className="row g-3">{cards.map(({ label, detail, icon: Icon, color, to }) => <div className="col-12 col-md-6 col-xl-3" key={to}><Link to={to} className="quick-link"><span className={`mini-icon ${color}`}><Icon /></span><span><strong>{label}</strong><small>{detail}</small></span><FiArrowUpRight /></Link></div>)}</div></div>
  </div>;
}
export default InicioPage;
