function UsuarioTable({ usuarios, onEditar, onEliminar }) {
  if (usuarios.length === 0) {
    return <p>No existen usuarios registrados.</p>;
  }

  return (
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Nombre</th>
          <th>Correo</th>
          <th>Fecha de creación</th>
          <th>Acciones</th>
        </tr>
      </thead>

      <tbody>
        {usuarios.map((usuario) => (
          <tr key={usuario.id}>
            <td>{usuario.id}</td>
            <td>{usuario.nombre}</td>
            <td>{usuario.correo}</td>
            <td>{usuario.created_at}</td>
            <td className="acciones">
              <button onClick={() => onEditar(usuario)}>
                Editar
              </button>

              <button onClick={() => onEliminar(usuario.id)}>
                Eliminar
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default UsuarioTable;