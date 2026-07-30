import { useEffect, useState } from "react";

import MateriaForm from "../components/MateriaForm";
import MateriaTable from "../components/MateriaTable";

import {
  actualizarMateria,
  crearMateria,
  eliminarMateria,
  obtenerMaterias,
} from "../services/materiaService";

function MateriasPage() {
  const [materias, setMaterias] = useState([]);
  const [materiaSeleccionada, setMateriaSeleccionada] =
    useState(null);

  const [cargando, setCargando] = useState(true);
  const [mensaje, setMensaje] = useState("");
  const [error, setError] = useState("");

  async function cargarMaterias() {
    try {
      setCargando(true);
      setError("");

      const datos = await obtenerMaterias();
      setMaterias(datos || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setCargando(false);
    }
  }

  useEffect(() => {
    cargarMaterias();
  }, []);

  async function guardarMateria(formulario) {
    try {
      setMensaje("");
      setError("");

      if (materiaSeleccionada) {
        const resultado = await actualizarMateria(
          materiaSeleccionada.id,
          formulario
        );

        setMensaje(
          resultado.message ||
            "Materia actualizada correctamente."
        );
      } else {
        const resultado = await crearMateria(formulario);

        setMensaje(
          resultado.message ||
            "Materia creada correctamente."
        );
      }

      setMateriaSeleccionada(null);
      await cargarMaterias();
    } catch (err) {
      setError(err.message);
    }
  }

  function editarMateria(materia) {
    setMensaje("");
    setError("");
    setMateriaSeleccionada(materia);
  }

  function cancelarEdicion() {
    setMateriaSeleccionada(null);
  }

  async function borrarMateria(id) {
    const confirmar = window.confirm(
      "¿Está seguro de eliminar esta materia?"
    );

    if (!confirmar) {
      return;
    }

    try {
      setMensaje("");
      setError("");

      const resultado = await eliminarMateria(id);

      setMensaje(
        resultado.message ||
          "Materia eliminada correctamente."
      );

      if (materiaSeleccionada?.id === id) {
        setMateriaSeleccionada(null);
      }

      await cargarMaterias();
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <section>
      <h2>Materias</h2>

      <MateriaForm
        materiaSeleccionada={materiaSeleccionada}
        onGuardar={guardarMateria}
        onCancelar={cancelarEdicion}
      />

      {mensaje && (
        <p className="mensaje-exito">{mensaje}</p>
      )}

      {error && (
        <p className="mensaje-error">{error}</p>
      )}

      {cargando ? (
        <p>Cargando materias...</p>
      ) : (
        <MateriaTable
          materias={materias}
          onEditar={editarMateria}
          onEliminar={borrarMateria}
        />
      )}
    </section>
  );
}

export default MateriasPage;