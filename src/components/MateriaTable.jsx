function MateriaTable({
  materias,
  onEditar,
  onEliminar,
}) {
  if (materias.length === 0) {
    return <p>No existen materias registradas.</p>;
  }

  return (
    <div>
      <h3>Lista de materias</h3>

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Código</th>
            <th>Nombre</th>
            <th>Descripción</th>
            <th>Créditos</th>
            <th>Fecha de creación</th>
            <th>Acciones</th>
          </tr>
        </thead>

        <tbody>
          {materias.map((materia) => (
            <tr key={materia.id}>
              <td>{materia.id}</td>
              <td>{materia.codigo}</td>
              <td>{materia.nombre}</td>
              <td>{materia.descripcion || "Sin descripción"}</td>
              <td>{materia.creditos}</td>
              <td>{materia.created_at || "Sin fecha"}</td>

              <td>
                <button
                  type="button"
                  onClick={() => onEditar(materia)}
                >
                  Editar
                </button>

                <button
                  type="button"
                  onClick={() => onEliminar(materia.id)}
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

export default MateriaTable;