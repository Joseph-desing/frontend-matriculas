import { useEffect, useState } from 'react';
import { FiBookOpen, FiCalendar, FiLayers, FiUser } from 'react-icons/fi';
import { FormActions, FormField } from './UsuarioForm.jsx';
const initial = { estudiante_id: '', materia_id: '', periodo: '', fecha_matricula: '', estado: 'ACTIVA' };
function MatriculaForm({ matriculaSeleccionada, estudiantes, materias, onGuardar, onCancelar }) {
  const [form, setForm] = useState(initial);
  useEffect(() => setForm(matriculaSeleccionada ? {
    estudiante_id: matriculaSeleccionada.estudiante_id?.toString() || '', materia_id: matriculaSeleccionada.materia_id?.toString() || '',
    periodo: matriculaSeleccionada.periodo || '', fecha_matricula: matriculaSeleccionada.fecha_matricula || '', estado: matriculaSeleccionada.estado || 'ACTIVA'
  } : initial), [matriculaSeleccionada]);
  const change = ({ target }) => setForm((old) => ({ ...old, [target.name]: target.value }));
  const submit = (e) => { e.preventDefault(); onGuardar({ ...form, estudiante_id: Number(form.estudiante_id), materia_id: Number(form.materia_id) }); if (!matriculaSeleccionada) setForm(initial); };
  const cancel = () => { setForm(initial); onCancelar(); };
  return <form onSubmit={submit} className="form-card">
    <div className="form-card-header"><div className="form-title-icon orange"><FiLayers /></div><div><h2>{matriculaSeleccionada ? 'Editar matrícula' : 'Nueva matrícula'}</h2><p>Vincula un estudiante con una materia y periodo.</p></div></div>
    <div className="row g-4">
      <FormField icon={<FiUser />} label="Estudiante" required><select className="form-select" name="estudiante_id" value={form.estudiante_id} onChange={change} required><option value="">Selecciona un estudiante</option>{estudiantes.map((item) => <option key={item.id} value={item.id}>{item.cedula} - {item.nombres} {item.apellidos}</option>)}</select></FormField>
      <FormField icon={<FiBookOpen />} label="Materia" required><select className="form-select" name="materia_id" value={form.materia_id} onChange={change} required><option value="">Selecciona una materia</option>{materias.map((item) => <option key={item.id} value={item.id}>{item.codigo} - {item.nombre}</option>)}</select></FormField>
      <FormField icon={<FiCalendar />} label="Periodo" required><input className="form-control" name="periodo" value={form.periodo} onChange={change} placeholder="Ej. 2026-B" required /></FormField>
      <FormField icon={<FiCalendar />} label="Fecha de matrícula" required><input className="form-control" name="fecha_matricula" type="date" value={form.fecha_matricula} onChange={change} required /></FormField>
      <FormField icon={<FiLayers />} label="Estado" required><select className="form-select" name="estado" value={form.estado} onChange={change}><option value="ACTIVA">ACTIVA</option><option value="RETIRADA">RETIRADA</option></select></FormField>
    </div><FormActions editing={!!matriculaSeleccionada} onCancelar={cancel} />
  </form>;
}
export default MatriculaForm;
