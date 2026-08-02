import { useEffect, useState } from 'react';
import MateriaForm from '../components/MateriaForm.jsx';
import MateriaTable from '../components/MateriaTable.jsx';
import PageHeader from '../components/PageHeader.jsx';
import LoadingSpinner from '../components/LoadingSpinner.jsx';
import StatusAlert from '../components/StatusAlert.jsx';
import { confirmarEliminacion } from '../utils/alerts.js';
import { actualizarMateria, crearMateria, eliminarMateria, obtenerMaterias } from '../services/materiaService.js';
function MateriasPage() {
  const [items, setItems] = useState([]), [selected, setSelected] = useState(null), [loading, setLoading] = useState(true), [error, setError] = useState(''), [message, setMessage] = useState('');
  async function load() { try { setLoading(true); setError(''); setItems((await obtenerMaterias()) || []); } catch (e) { setError(e.message); } finally { setLoading(false); } }
  useEffect(() => { load(); }, []);
  async function save(form) { try { const result = selected ? await actualizarMateria(selected.id, form) : await crearMateria(form); setMessage(result.message || `Materia ${selected ? 'actualizada' : 'creada'} correctamente.`); setSelected(null); await load(); } catch (e) { setError(e.message); } }
  async function remove(id) { if (!(await confirmarEliminacion('esta materia'))) return; try { const result = await eliminarMateria(id); setMessage(result.message || 'Materia eliminada correctamente.'); if (selected?.id === id) setSelected(null); await load(); } catch (e) { setError(e.message); } }
  return <div className="page-container"><PageHeader title="Materias" description="Organiza el catálogo de asignaturas y sus créditos académicos." /><StatusAlert>{message}</StatusAlert><StatusAlert type="error">{error}</StatusAlert><MateriaForm materiaSeleccionada={selected} onGuardar={save} onCancelar={() => setSelected(null)} />{loading ? <LoadingSpinner label="Cargando materias..." /> : <MateriaTable materias={items} onEditar={setSelected} onEliminar={remove} />}</div>;
}
export default MateriasPage;
