import { useEffect, useState } from 'react';
import MatriculaForm from '../components/MatriculaForm.jsx';
import MatriculaTable from '../components/MatriculaTable.jsx';
import PageHeader from '../components/PageHeader.jsx';
import LoadingSpinner from '../components/LoadingSpinner.jsx';
import StatusAlert from '../components/StatusAlert.jsx';
import { confirmarEliminacion } from '../utils/alerts.js';
import { obtenerEstudiantes } from '../services/estudianteService.js';
import { obtenerMaterias } from '../services/materiaService.js';
import { actualizarMatricula, crearMatricula, eliminarMatricula, obtenerMatriculas } from '../services/matriculaService.js';
function MatriculasPage() {
  const [items, setItems] = useState([]), [students, setStudents] = useState([]), [subjects, setSubjects] = useState([]), [selected, setSelected] = useState(null), [loading, setLoading] = useState(true), [error, setError] = useState(''), [message, setMessage] = useState('');
  async function load() { try { setLoading(true); setError(''); const [a, b, c] = await Promise.all([obtenerMatriculas(), obtenerEstudiantes(), obtenerMaterias()]); setItems(a || []); setStudents(b || []); setSubjects(c || []); } catch (e) { setError(e.message); } finally { setLoading(false); } }
  useEffect(() => { load(); }, []);
  async function save(form) { try { const result = selected ? await actualizarMatricula(selected.id, form) : await crearMatricula(form); setMessage(result.message || `Matrícula ${selected ? 'actualizada' : 'creada'} correctamente.`); setSelected(null); await load(); } catch (e) { setError(e.message); } }
  async function remove(id) { if (!(await confirmarEliminacion('esta matrícula'))) return; try { const result = await eliminarMatricula(id); setMessage(result.message || 'Matrícula eliminada correctamente.'); if (selected?.id === id) setSelected(null); await load(); } catch (e) { setError(e.message); } }
  return <div className="page-container"><PageHeader title="Matrículas" description="Controla las inscripciones por estudiante, materia y periodo." /><StatusAlert>{message}</StatusAlert><StatusAlert type="error">{error}</StatusAlert><MatriculaForm matriculaSeleccionada={selected} estudiantes={students} materias={subjects} onGuardar={save} onCancelar={() => setSelected(null)} />{loading ? <LoadingSpinner label="Cargando matrículas..." /> : <MatriculaTable matriculas={items} onEditar={setSelected} onEliminar={remove} />}</div>;
}
export default MatriculasPage;
