import { useEffect, useState } from "react";

const formularioInicial = {
  cedula: "",
  nombres: "",
  apellidos: "",
  correo: "",
  telefono: "",
  direccion: "",
  fecha_nacimiento: "",
};

function EstudianteForm({
  estudianteSeleccionado,
  onGuardar,
  onCancelar,
}) {
  const [formulario, setFormulario] = useState(formularioInicial);

  useEffect(() => {
    if (estudianteSeleccionado) {
      setFormulario({
        cedula: estudianteSeleccionado.cedula || "",
        nombres: estudianteSeleccionado.nombres || "",
        apellidos: estudianteSeleccionado.apellidos || "",
        correo: estudianteSeleccionado.correo || "",
        telefono: estudianteSeleccionado.telefono || "",
        direccion: estudianteSeleccionado.direccion || "",
        fecha_nacimiento:
          estudianteSeleccionado.fecha_nacimiento || "",
      });
    } else {
      setFormulario(formularioInicial);
    }
  }, [estudianteSeleccionado]);

  function manejarCambio(evento) {
    const { name, value } = evento.target;

    setFormulario((anterior) => ({
      ...anterior,
      [name]: value,
    }));
  }

  function manejarEnvio(evento) {
    evento.preventDefault();

    onGuardar(formulario);

    if (!estudianteSeleccionado) {
      setFormulario(formularioInicial);
    }
  }

  function manejarCancelacion() {
    setFormulario(formularioInicial);
    onCancelar();
  }

  return (
    <form onSubmit={manejarEnvio}>
      <h2>
        {estudianteSeleccionado
          ? "Editar estudiante"
          : "Registrar estudiante"}
      </h2>

      <input
        type="text"
        name="cedula"
        placeholder="Cédula"
        value={formulario.cedula}
        onChange={manejarCambio}
        maxLength="10"
        required
      />

      <input
        type="text"
        name="nombres"
        placeholder="Nombres"
        value={formulario.nombres}
        onChange={manejarCambio}
        required
      />

      <input
        type="text"
        name="apellidos"
        placeholder="Apellidos"
        value={formulario.apellidos}
        onChange={manejarCambio}
        required
      />

      <input
        type="email"
        name="correo"
        placeholder="Correo"
        value={formulario.correo}
        onChange={manejarCambio}
      />

      <input
        type="text"
        name="telefono"
        placeholder="Teléfono"
        value={formulario.telefono}
        onChange={manejarCambio}
      />

      <input
        type="text"
        name="direccion"
        placeholder="Dirección"
        value={formulario.direccion}
        onChange={manejarCambio}
      />

      <label htmlFor="fecha_nacimiento">
        Fecha de nacimiento
      </label>

      <input
        id="fecha_nacimiento"
        type="date"
        name="fecha_nacimiento"
        value={formulario.fecha_nacimiento}
        onChange={manejarCambio}
      />

      <button type="submit">
        {estudianteSeleccionado ? "Actualizar" : "Guardar"}
      </button>

      {estudianteSeleccionado && (
        <button type="button" onClick={manejarCancelacion}>
          Cancelar
        </button>
      )}
    </form>
  );
}

export default EstudianteForm;