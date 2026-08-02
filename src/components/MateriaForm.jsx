import { useEffect, useState } from 'react';
import { FiBookOpen, FiHash, FiLayers } from 'react-icons/fi';
import { FormActions, FormField } from './UsuarioForm.jsx';
const initial = { codigo: '', nombre: '', descripcion: '', creditos: '' };
function MateriaForm({ materiaSeleccionada, onGuardar, onCancelar }) {
  const [form, setForm] = useState(initial);
  useEffect(() => setForm(materiaSeleccionada ? Object.fromEntries(Object.keys(initial).map((key) => [key, materiaSeleccionada[key] || ''])) : initial), [materiaSeleccionada]);
  const change = ({ target }) => setForm((old) => ({ ...old, [target.name]: target.value }));
  const submit = (e) => { e.preventDefault(); onGuardar({ ...form, creditos: Number(form.creditos) }); if (!materiaSeleccionada) setForm(initial); };
  const cancel = () => { setForm(initial); onCancelar(); };
  return <form onSubmit={submit} className="form-card">
    <div className="form-card-header"><div className="form-title-icon green"><FiBookOpen /></div><div><h2>{materiaSeleccionada ? 'Editar materia' : 'Nueva materia'}</h2><p>Define la información del catálogo académico.</p></div></div>
    <div className="row g-4">
      <FormField icon={<FiHash />} label="Código" required><input className="form-control" name="codigo" value={form.codigo} onChange={change} placeholder="Ej. MAT-101" required /></FormField>
      <FormField icon={<FiBookOpen />} label="Nombre" required><input className="form-control" name="nombre" value={form.nombre} onChange={change} placeholder="Nombre de la materia" required /></FormField>
      <FormField icon={<FiLayers />} label="Créditos" required><input className="form-control" name="creditos" type="number" min="1" value={form.creditos} onChange={change} placeholder="Ej. 4" required /></FormField>
      <FormField label="Descripción" wide><textarea className="form-control" name="descripcion" rows="3" value={form.descripcion} onChange={change} placeholder="Descripción breve de la materia" /></FormField>
    </div><FormActions editing={!!materiaSeleccionada} onCancelar={cancel} />
  </form>;
}
export default MateriaForm;
