import { useEffect, useState } from "react";

const formularioInicial = {
  codigo: "",
  nombre: "",
  descripcion: "",
  creditos: "",
};

function MateriaForm({
  materiaSeleccionada,
  onGuardar,
  onCancelar,
}) {
  const [formulario, setFormulario] = useState(formularioInicial);

  useEffect(() => {
    if (materiaSeleccionada) {
      setFormulario({
        codigo: materiaSeleccionada.codigo || "",
        nombre: materiaSeleccionada.nombre || "",
        descripcion: materiaSeleccionada.descripcion || "",
        creditos: materiaSeleccionada.creditos || "",
      });
    } else {
      setFormulario(formularioInicial);
    }
  }, [materiaSeleccionada]);

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
      creditos: Number(formulario.creditos),
    });

    if (!materiaSeleccionada) {
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
        {materiaSeleccionada
          ? "Editar materia"
          : "Crear materia"}
      </h3>

      <label htmlFor="codigo">Código</label>
      <input
        id="codigo"
        type="text"
        name="codigo"
        value={formulario.codigo}
        onChange={manejarCambio}
        required
      />

      <label htmlFor="nombre">Nombre</label>
      <input
        id="nombre"
        type="text"
        name="nombre"
        value={formulario.nombre}
        onChange={manejarCambio}
        required
      />

      <label htmlFor="descripcion">Descripción</label>
      <textarea
        id="descripcion"
        name="descripcion"
        value={formulario.descripcion}
        onChange={manejarCambio}
        rows="3"
      />

      <label htmlFor="creditos">Créditos</label>
      <input
        id="creditos"
        type="number"
        name="creditos"
        value={formulario.creditos}
        onChange={manejarCambio}
        min="1"
        required
      />

      <button type="submit">
        {materiaSeleccionada ? "Actualizar" : "Guardar"}
      </button>

      {materiaSeleccionada && (
        <button type="button" onClick={manejarCancelacion}>
          Cancelar
        </button>
      )}
    </form>
  );
}

export default MateriaForm;