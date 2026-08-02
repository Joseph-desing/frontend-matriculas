import { useEffect, useState } from 'react';
import { FiLock, FiMail, FiSave, FiUser, FiX } from 'react-icons/fi';
const initial = { nombre: '', correo: '', contrasena: '' };
function UsuarioForm({ usuarioEditar, onGuardar, onCancelar }) {
  const [form, setForm] = useState(initial);
  useEffect(() => setForm(usuarioEditar ? { nombre: usuarioEditar.nombre || '', correo: usuarioEditar.correo || '', contrasena: '' } : initial), [usuarioEditar]);
  const change = ({ target }) => setForm((old) => ({ ...old, [target.name]: target.value }));
  const submit = (event) => { event.preventDefault(); onGuardar(form); if (!usuarioEditar) setForm(initial); };
  return <form onSubmit={submit} className="form-card">
    <div className="form-card-header"><div className="form-title-icon"><FiUser /></div><div><h2>{usuarioEditar ? 'Editar usuario' : 'Nuevo usuario'}</h2><p>Ingresa la información de acceso al sistema.</p></div></div>
    <div className="row g-4">
      <FormField icon={<FiUser />} label="Nombre completo" required><input className="form-control" id="nombre" name="nombre" value={form.nombre} onChange={change} placeholder="Ej. Ana Martínez" required /></FormField>
      <FormField icon={<FiMail />} label="Correo electrónico" required><input className="form-control" id="correo" name="correo" type="email" value={form.correo} onChange={change} placeholder="nombre@universidad.edu" required /></FormField>
      <FormField icon={<FiLock />} label={usuarioEditar ? 'Nueva contraseña' : 'Contraseña'} hint={usuarioEditar ? 'Déjala vacía para mantener la actual.' : 'Mínimo 6 caracteres.'} required={!usuarioEditar}><input className="form-control" id="contrasena" name="contrasena" type="password" value={form.contrasena} onChange={change} placeholder="••••••••" required={!usuarioEditar} /></FormField>
    </div>
    <FormActions editing={!!usuarioEditar} onCancelar={onCancelar} />
  </form>;
}
export function FormField({ label, required, hint, children, wide = false, icon }) { return <div className={wide ? 'col-12' : 'col-12 col-lg-6'}><label className="form-label">{icon}<span>{label}</span>{required && <b>*</b>}</label>{children}{hint && <div className="form-text">{hint}</div>}</div>; }
export function FormActions({ editing, onCancelar }) { return <div className="form-actions"><button className="btn btn-primary btn-lg" type="submit"><FiSave />{editing ? 'Actualizar' : 'Guardar'}</button>{editing && <button className="btn btn-light btn-lg" type="button" onClick={onCancelar}><FiX />Cancelar</button>}</div>; }
export default UsuarioForm;
