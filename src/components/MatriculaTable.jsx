import DataTable from './DataTable.jsx';
const columns = [
  { key: 'id', label: 'N.º', render: (row) => <span className="id-badge">#{row.id}</span> },
  { key: 'estudiante', label: 'Estudiante', render: (row) => row.estudiante ? <strong>{row.estudiante.nombres} {row.estudiante.apellidos}</strong> : `ID ${row.estudiante_id}` },
  { key: 'materia', label: 'Materia', render: (row) => row.materia ? <><span className="code-badge">{row.materia.codigo}</span> {row.materia.nombre}</> : `ID ${row.materia_id}` },
  { key: 'periodo', label: 'Periodo' },
  { key: 'fecha_matricula', label: 'Fecha' },
  { key: 'estado', label: 'Estado', render: (row) => <span className={`status-badge ${row.estado === 'ACTIVA' ? 'active' : 'inactive'}`}>{row.estado}</span> },
];
function MatriculaTable(props) { return <DataTable title="Registro de matrículas" searchPlaceholder="Buscar matrícula..." rows={props.matriculas} columns={columns} onEditar={props.onEditar} onEliminar={props.onEliminar} />; }
export default MatriculaTable;
