import { Link, Route, Routes } from 'react-router-dom';

import InicioPage from './pages/InicioPage.jsx';
import UsuariosPage from './pages/UsuariosPage.jsx';
import EstudiantesPage from './pages/EstudiantesPage.jsx';
import MateriasPage from './pages/MateriasPage.jsx';
import MatriculasPage from './pages/MatriculasPage.jsx';

function App() {
  return (
    <div>
      <header>
        <h1>Sistema de Matrículas</h1>

        <nav>
          <Link to="/">Inicio</Link>
          <Link to="/usuarios">Usuarios</Link>
          <Link to="/estudiantes">Estudiantes</Link>
          <Link to="/materias">Materias</Link>
          <Link to="/matriculas">Matrículas</Link>
        </nav>
      </header>

      <main>
        <Routes>
          <Route path="/" element={<InicioPage />} />
          <Route path="/usuarios" element={<UsuariosPage />} />
          <Route path="/estudiantes" element={<EstudiantesPage />} />
          <Route path="/materias" element={<MateriasPage />} />
          <Route path="/matriculas" element={<MatriculasPage />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;