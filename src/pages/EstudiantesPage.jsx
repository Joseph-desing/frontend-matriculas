import { useEffect, useState } from 'react';
import EstudianteForm from '../components/EstudianteForm.jsx';
import EstudianteTable from '../components/EstudianteTable.jsx';
import PageHeader from '../components/PageHeader.jsx';
import LoadingSpinner from '../components/LoadingSpinner.jsx';
import StatusAlert from '../components/StatusAlert.jsx';
import { confirmarEliminacion } from '../utils/alerts.js';
import { actualizarEstudiante, crearEstudiante, eliminarEstudiante, obtenerEstudiantes } from '../services/estudianteService.js';
function EstudiantesPage() {
  const [items, setItems] = useState([]), [selected, setSelected] = useState(null), [loading, setLoading] = useState(true), [error, setError] = useState(''), [message, setMessage] = useState('');
  async function load() { try { setLoading(true); setError(''); setItems((await obtenerEstudiantes()) || []); } catch (e) { setError(e.message); } finally { setLoading(false); } }
  useEffect(() => { load(); }, []);
  async function save(form) { try { setError(''); const result = selected ? await actualizarEstudiante(selected.id, form) : await crearEstudiante(form); setMessage(result.message || `Estudiante ${selected ? 'actualizado' : 'creado'} correctamente.`); setSelected(null); await load(); } catch (e) { setError(e.message); } }
  async function remove(id) { if (!(await confirmarEliminacion('este estudiante'))) return; try { const result = await eliminarEstudiante(id); setMessage(result.message || 'Estudiante eliminado correctamente.'); if (selected?.id === id) setSelected(null); await load(); } catch (e) { setError(e.message); } }
  return <div className="page-container"><PageHeader title="Estudiantes" description="Gestiona la información académica y de contacto de los estudiantes." /><StatusAlert>{message}</StatusAlert><StatusAlert type="error">{error}</StatusAlert><EstudianteForm estudianteSeleccionado={selected} onGuardar={save} onCancelar={() => setSelected(null)} />{loading ? <LoadingSpinner label="Cargando estudiantes..." /> : <EstudianteTable estudiantes={items} onEditar={setSelected} onEliminar={remove} />}</div>;
}
export default EstudiantesPage;
