import DataTable from './DataTable.jsx';
const columns = [
  { key: 'cedula', label: 'Cédula', render: (row) => <span className="id-badge">{row.cedula}</span> },
  { key: 'nombres', label: 'Estudiante', render: (row) => <div className="person-cell"><span>{row.nombres?.charAt(0)}</span><div><strong>{row.nombres} {row.apellidos}</strong><small>{row.correo || 'Sin correo'}</small></div></div> },
  { key: 'telefono', label: 'Teléfono', render: (row) => row.telefono || '—' },
  { key: 'direccion', label: 'Dirección', render: (row) => row.direccion || '—' },
  { key: 'fecha_nacimiento', label: 'Nacimiento', render: (row) => row.fecha_nacimiento || '—' },
];
function EstudianteTable(props) { return <DataTable title="Directorio de estudiantes" searchPlaceholder="Buscar estudiante..." rows={props.estudiantes} columns={columns} onEditar={props.onEditar} onEliminar={props.onEliminar} />; }
export default EstudianteTable;
