import DataTable from './DataTable.jsx';
const columns = [
  { key: 'id', label: 'ID', render: (row) => <span className="id-badge">#{row.id}</span> },
  { key: 'nombre', label: 'Nombre', render: (row) => <div className="person-cell"><span>{row.nombre?.charAt(0)}</span><strong>{row.nombre}</strong></div> },
  { key: 'correo', label: 'Correo' },
  { key: 'created_at', label: 'Fecha de creación', render: (row) => row.created_at || '—' },
];
function UsuarioTable(props) { return <DataTable title="Directorio de usuarios" searchPlaceholder="Buscar por nombre o correo..." rows={props.usuarios} columns={columns} onEditar={props.onEditar} onEliminar={props.onEliminar} />; }
export default UsuarioTable;
