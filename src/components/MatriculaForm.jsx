import { useEffect, useState } from "react";

const formularioInicial = {
  estudiante_id: "",
  materia_id: "",
  periodo: "",
  fecha_matricula: "",
  estado: "ACTIVA",
};

function MatriculaForm({
  matriculaSeleccionada,
  estudiantes,
  materias,
  onGuardar,
  onCancelar,
}) {
  const [formulario, setFormulario] = useState(formularioInicial);

  useEffect(() => {
    if (matriculaSeleccionada) {
      setFormulario({
        estudiante_id:
          matriculaSeleccionada.estudiante_id?.toString() || "",
        materia_id:
          matriculaSeleccionada.materia_id?.toString() || "",
        periodo: matriculaSeleccionada.periodo || "",
        fecha_matricula:
          matriculaSeleccionada.fecha_matricula || "",
        estado: matriculaSeleccionada.estado || "ACTIVA",
      });
    } else {
      setFormulario(formularioInicial);
    }
  }, [matriculaSeleccionada]);

  function manejarCambio(evento) {
    const { name, value } = evento.target;

    setFormulario((anterior) => ({
      ...anterior,
      [name]: value,
    }));
  }

  function manejarEnvio(evento) {
    evento.preventDefault();

    onGuardar({
      ...formulario,
      estudiante_id: Number(formulario.estudiante_id),
      materia_id: Number(formulario.materia_id),
    });

    if (!matriculaSeleccionada) {
      setFormulario(formularioInicial);
    }
  }

  function manejarCancelacion() {
    setFormulario(formularioInicial);
    onCancelar();
  }

  return (
    <form onSubmit={manejarEnvio}>
      <h3>
        {matriculaSeleccionada
          ? "Editar matrícula"
          : "Crear matrícula"}
      </h3>

      <label htmlFor="estudiante_id">Estudiante</label>
      <select
        id="estudiante_id"
        name="estudiante_id"
        value={formulario.estudiante_id}
        onChange={manejarCambio}
        required
      >
        <option value="">Seleccione un estudiante</option>

        {estudiantes.map((estudiante) => (
          <option key={estudiante.id} value={estudiante.id}>
            {estudiante.cedula} - {estudiante.nombres}{" "}
            {estudiante.apellidos}
          </option>
        ))}
      </select>

      <label htmlFor="materia_id">Materia</label>
      <select
        id="materia_id"
        name="materia_id"
        value={formulario.materia_id}
        onChange={manejarCambio}
        required
      >
        <option value="">Seleccione una materia</option>

        {materias.map((materia) => (
          <option key={materia.id} value={materia.id}>
            {materia.codigo} - {materia.nombre}
          </option>
        ))}
      </select>

      <label htmlFor="periodo">Periodo</label>
      <input
        id="periodo"
        type="text"
        name="periodo"
        placeholder="Ejemplo: 2026-B"
        value={formulario.periodo}
        onChange={manejarCambio}
        required
      />

      <label htmlFor="fecha_matricula">Fecha de matrícula</label>
      <input
        id="fecha_matricula"
        type="date"
        name="fecha_matricula"
        value={formulario.fecha_matricula}
        onChange={manejarCambio}
        required
      />

      <label htmlFor="estado">Estado</label>
      <select
        id="estado"
        name="estado"
        value={formulario.estado}
        onChange={manejarCambio}
        required
      >
        <option value="ACTIVA">ACTIVA</option>
        <option value="RETIRADA">RETIRADA</option>
      </select>

      <button type="submit">
        {matriculaSeleccionada ? "Actualizar" : "Guardar"}
      </button>

      {matriculaSeleccionada && (
        <button type="button" onClick={manejarCancelacion}>
          Cancelar
        </button>
      )}
    </form>
  );
}

export default MatriculaForm;