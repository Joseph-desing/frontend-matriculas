import DataTable from './DataTable.jsx';
const columns = [
  { key: 'codigo', label: 'Código', render: (row) => <span className="code-badge">{row.codigo}</span> },
  { key: 'nombre', label: 'Materia', render: (row) => <strong>{row.nombre}</strong> },
  { key: 'descripcion', label: 'Descripción', render: (row) => row.descripcion || 'Sin descripción' },
  { key: 'creditos', label: 'Créditos', render: (row) => <span className="credit-badge">{row.creditos} créditos</span> },
  { key: 'created_at', label: 'Creación', render: (row) => row.created_at || '—' },
];
function MateriaTable(props) { return <DataTable title="Catálogo de materias" searchPlaceholder="Buscar por código o materia..." rows={props.materias} columns={columns} onEditar={props.onEditar} onEliminar={props.onEliminar} />; }
export default MateriaTable;
