import { useEffect, useState } from 'react';
import UsuarioForm from '../components/UsuarioForm.jsx';
import UsuarioTable from '../components/UsuarioTable.jsx';
import PageHeader from '../components/PageHeader.jsx';
import LoadingSpinner from '../components/LoadingSpinner.jsx';
import StatusAlert from '../components/StatusAlert.jsx';
import { confirmarEliminacion } from '../utils/alerts.js';
import { actualizarUsuario, crearUsuario, eliminarUsuario, obtenerUsuarios } from '../services/usuarioService.js';
function UsuariosPage() {
  const [items, setItems] = useState([]), [selected, setSelected] = useState(null), [loading, setLoading] = useState(true), [error, setError] = useState(''), [message, setMessage] = useState('');
  async function load() { try { setLoading(true); setError(''); setItems((await obtenerUsuarios()) || []); } catch (e) { setError(e.message); } finally { setLoading(false); } }
  useEffect(() => { load(); }, []);
  async function save(form) { try { setError(''); setMessage(''); if (selected) { const data = { ...form }; if (!data.contrasena) delete data.contrasena; await actualizarUsuario(selected.id, data); setMessage('Usuario actualizado correctamente.'); } else { await crearUsuario(form); setMessage('Usuario creado correctamente.'); } setSelected(null); await load(); } catch (e) { setError(e.message); } }
  async function remove(id) { if (!(await confirmarEliminacion('este usuario'))) return; try { setError(''); await eliminarUsuario(id); setMessage('Usuario eliminado correctamente.'); if (selected?.id === id) setSelected(null); await load(); } catch (e) { setError(e.message); } }
  return <div className="page-container"><PageHeader title="Usuarios" description="Administra las cuentas y el acceso a la plataforma." /><StatusAlert>{message}</StatusAlert><StatusAlert type="error">{error}</StatusAlert><UsuarioForm usuarioEditar={selected} onGuardar={save} onCancelar={() => setSelected(null)} />{loading ? <LoadingSpinner label="Cargando usuarios..." /> : <UsuarioTable usuarios={items} onEditar={setSelected} onEliminar={remove} />}</div>;
}
export default UsuariosPage;
