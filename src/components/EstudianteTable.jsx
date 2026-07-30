function EstudianteTable({
  estudiantes,
  onEditar,
  onEliminar,
}) {
  if (estudiantes.length === 0) {
    return <p>No hay estudiantes registrados.</p>;
  }

  return (
    <div>
      <h2>Lista de estudiantes</h2>

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Cédula</th>
            <th>Nombres</th>
            <th>Apellidos</th>
            <th>Correo</th>
            <th>Teléfono</th>
            <th>Dirección</th>
            <th>Fecha de nacimiento</th>
            <th>Acciones</th>
          </tr>
        </thead>

        <tbody>
          {estudiantes.map((estudiante) => (
            <tr key={estudiante.id}>
              <td>{estudiante.id}</td>
              <td>{estudiante.cedula}</td>
              <td>{estudiante.nombres}</td>
              <td>{estudiante.apellidos}</td>
              <td>{estudiante.correo || "Sin correo"}</td>
              <td>{estudiante.telefono || "Sin teléfono"}</td>
              <td>{estudiante.direccion || "Sin dirección"}</td>
              <td>
                {estudiante.fecha_nacimiento || "Sin fecha"}
              </td>
              <td>
                <button
                  type="button"
                  onClick={() => onEditar(estudiante)}
                >
                  Editar
                </button>

                <button
                  type="button"
                  onClick={() => onEliminar(estudiante.id)}
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

export default EstudianteTable;