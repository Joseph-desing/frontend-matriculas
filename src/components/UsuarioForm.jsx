import { useEffect, useState } from 'react';

const formularioInicial = {
  nombre: '',
  correo: '',
  contrasena: '',
};

function UsuarioForm({ usuarioEditar, onGuardar, onCancelar }) {
  const [formulario, setFormulario] = useState(formularioInicial);

  useEffect(() => {
    if (usuarioEditar) {
      setFormulario({
        nombre: usuarioEditar.nombre || '',
        correo: usuarioEditar.correo || '',
        contrasena: '',
      });
    } else {
      setFormulario(formularioInicial);
    }
  }, [usuarioEditar]);

  function manejarCambio(evento) {
    const { name, value } = evento.target;

    setFormulario({
      ...formulario,
      [name]: value,
    });
  }

  function manejarEnvio(evento) {
    evento.preventDefault();

    onGuardar(formulario);

    if (!usuarioEditar) {
      setFormulario(formularioInicial);
    }
  }

  return (
    <form onSubmit={manejarEnvio} className="usuario-form">
      <h3>{usuarioEditar ? 'Editar usuario' : 'Crear usuario'}</h3>

      <label htmlFor="nombre">Nombre</label>
      <input
        id="nombre"
        name="nombre"
        type="text"
        value={formulario.nombre}
        onChange={manejarCambio}
        required
      />

      <label htmlFor="correo">Correo</label>
      <input
        id="correo"
        name="correo"
        type="email"
        value={formulario.correo}
        onChange={manejarCambio}
        required
      />

      <label htmlFor="contrasena">
        {usuarioEditar ? 'Nueva contraseña (opcional)' : 'Contraseña'}
      </label>
      <input
        id="contrasena"
        name="contrasena"
        type="password"
        value={formulario.contrasena}
        onChange={manejarCambio}
        required={!usuarioEditar}
      />

      <div className="form-actions">
        <button type="submit">
          {usuarioEditar ? 'Actualizar' : 'Guardar'}
        </button>

        {usuarioEditar && (
          <button type="button" onClick={onCancelar}>
            Cancelar
          </button>
        )}
      </div>
    </form>
  );
}

export default UsuarioForm;