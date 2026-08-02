import { useEffect, useState } from 'react';
import { FiCalendar, FiHome, FiMail, FiPhone, FiUser } from 'react-icons/fi';
import { FormActions, FormField } from './UsuarioForm.jsx';
const initial = { cedula: '', nombres: '', apellidos: '', correo: '', telefono: '', direccion: '', fecha_nacimiento: '' };
function EstudianteForm({ estudianteSeleccionado, onGuardar, onCancelar }) {
  const [form, setForm] = useState(initial);
  useEffect(() => setForm(estudianteSeleccionado ? Object.fromEntries(Object.keys(initial).map((key) => [key, estudianteSeleccionado[key] || ''])) : initial), [estudianteSeleccionado]);
  const change = ({ target }) => setForm((old) => ({ ...old, [target.name]: target.value }));
  const submit = (e) => { e.preventDefault(); onGuardar(form); if (!estudianteSeleccionado) setForm(initial); };
  const cancel = () => { setForm(initial); onCancelar(); };
  return <form onSubmit={submit} className="form-card">
    <div className="form-card-header"><div className="form-title-icon purple"><FiUser /></div><div><h2>{estudianteSeleccionado ? 'Editar estudiante' : 'Registrar estudiante'}</h2><p>Completa los datos personales y de contacto.</p></div></div>
    <div className="row g-4">
      <FormField icon={<FiUser />} label="Cédula" required><input className="form-control" name="cedula" value={form.cedula} onChange={change} maxLength="10" placeholder="10 dígitos" required /></FormField>
      <FormField icon={<FiUser />} label="Nombres" required><input className="form-control" name="nombres" value={form.nombres} onChange={change} placeholder="Nombres del estudiante" required /></FormField>
      <FormField icon={<FiUser />} label="Apellidos" required><input className="form-control" name="apellidos" value={form.apellidos} onChange={change} placeholder="Apellidos del estudiante" required /></FormField>
      <FormField icon={<FiMail />} label="Correo electrónico"><input className="form-control" name="correo" type="email" value={form.correo} onChange={change} placeholder="correo@ejemplo.com" /></FormField>
      <FormField icon={<FiPhone />} label="Teléfono"><input className="form-control" name="telefono" value={form.telefono} onChange={change} placeholder="Número de contacto" /></FormField>
      <FormField icon={<FiCalendar />} label="Fecha de nacimiento"><input className="form-control" name="fecha_nacimiento" type="date" value={form.fecha_nacimiento} onChange={change} /></FormField>
      <FormField icon={<FiHome />} label="Dirección" wide><input className="form-control" name="direccion" value={form.direccion} onChange={change} placeholder="Dirección domiciliaria" /></FormField>
    </div><FormActions editing={!!estudianteSeleccionado} onCancelar={cancel} />
  </form>;
}
export default EstudianteForm;
