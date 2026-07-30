function MatriculaTable({
  matriculas,
  onEditar,
  onEliminar,
}) {
  if (matriculas.length === 0) {
    return <p>No existen matrículas registradas.</p>;
  }

  return (
    <div>
      <h3>Lista de matrículas</h3>

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Estudiante</th>
            <th>Materia</th>
            <th>Periodo</th>
            <th>Fecha</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>

        <tbody>
          {matriculas.map((matricula) => (
            <tr key={matricula.id}>
              <td>{matricula.id}</td>

              <td>
                {matricula.estudiante
                  ? `${matricula.estudiante.nombres} ${matricula.estudiante.apellidos}`
                  : `ID ${matricula.estudiante_id}`}
              </td>

              <td>
                {matricula.materia
                  ? `${matricula.materia.codigo} - ${matricula.materia.nombre}`
                  : `ID ${matricula.materia_id}`}
              </td>

              <td>{matricula.periodo}</td>
              <td>{matricula.fecha_matricula}</td>
              <td>{matricula.estado}</td>

              <td>
                <button
                  type="button"
                  onClick={() => onEditar(matricula)}
                >
                  Editar
                </button>

                <button
                  type="button"
                  onClick={() => onEliminar(matricula.id)}
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default MatriculaTable;