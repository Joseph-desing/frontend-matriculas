import { Route, Routes } from 'react-router-dom';
import Layout from './components/Layout.jsx';
import InicioPage from './pages/InicioPage.jsx';
import UsuariosPage from './pages/UsuariosPage.jsx';
import EstudiantesPage from './pages/EstudiantesPage.jsx';
import MateriasPage from './pages/MateriasPage.jsx';
import MatriculasPage from './pages/MatriculasPage.jsx';
import './App.css';

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<InicioPage />} />
        <Route path="/usuarios" element={<UsuariosPage />} />
        <Route path="/estudiantes" element={<EstudiantesPage />} />
        <Route path="/materias" element={<MateriasPage />} />
        <Route path="/matriculas" element={<MatriculasPage />} />
      </Routes>
    </Layout>
  );
}

export default App;
