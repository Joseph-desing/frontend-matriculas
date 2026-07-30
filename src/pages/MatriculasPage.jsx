import { useEffect, useState } from "react";

import MatriculaForm from "../components/MatriculaForm";
import MatriculaTable from "../components/MatriculaTable";

import {
  obtenerEstudiantes,
} from "../services/estudianteService";

import {
  obtenerMaterias,
} from "../services/materiaService";

import {
  actualizarMatricula,
  crearMatricula,
  eliminarMatricula,
  obtenerMatriculas,
} from "../services/matriculaService";

function MatriculasPage() {
  const [matriculas, setMatriculas] = useState([]);
  const [estudiantes, setEstudiantes] = useState([]);
  const [materias, setMaterias] = useState([]);

  const [matriculaSeleccionada, setMatriculaSeleccionada] =
    useState(null);

  const [cargando, setCargando] = useState(true);
  const [mensaje, setMensaje] = useState("");
  const [error, setError] = useState("");

  async function cargarDatos() {
    try {
      setCargando(true);
      setError("");

      const [
        datosMatriculas,
        datosEstudiantes,
        datosMaterias,
      ] = await Promise.all([
        obtenerMatriculas(),
        obtenerEstudiantes(),
        obtenerMaterias(),
      ]);

      setMatriculas(datosMatriculas || []);
      setEstudiantes(datosEstudiantes || []);
      setMaterias(datosMaterias || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setCargando(false);
    }
  }

  useEffect(() => {
    cargarDatos();
  }, []);

  async function guardarMatricula(formulario) {
    try {
      setMensaje("");
      setError("");

      if (matriculaSeleccionada) {
        const resultado = await actualizarMatricula(
          matriculaSeleccionada.id,
          formulario
        );

        setMensaje(
          resultado.message ||
            "Matrícula actualizada correctamente."
        );
      } else {
        const resultado = await crearMatricula(formulario);

        setMensaje(
          resultado.message ||
            "Matrícula creada correctamente."
        );
      }

      setMatriculaSeleccionada(null);
      await cargarDatos();
    } catch (err) {
      setError(err.message);
    }
  }

  function editarMatricula(matricula) {
    setMensaje("");
    setError("");
    setMatriculaSeleccionada(matricula);
  }

  function cancelarEdicion() {
    setMatriculaSeleccionada(null);
  }

  async function borrarMatricula(id) {
    const confirmar = window.confirm(
      "¿Está seguro de eliminar esta matrícula?"
    );

    if (!confirmar) {
      return;
    }

    try {
      setMensaje("");
      setError("");

      const resultado = await eliminarMatricula(id);

      setMensaje(
        resultado.message ||
          "Matrícula eliminada correctamente."
      );

      if (matriculaSeleccionada?.id === id) {
        setMatriculaSeleccionada(null);
      }

      await cargarDatos();
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <section>
      <h2>Matrículas</h2>

      <MatriculaForm
        matriculaSeleccionada={matriculaSeleccionada}
        estudiantes={estudiantes}
        materias={materias}
        onGuardar={guardarMatricula}
        onCancelar={cancelarEdicion}
      />

      {mensaje && (
        <p className="mensaje-exito">{mensaje}</p>
      )}

      {error && (
        <p className="mensaje-error">{error}</p>
      )}

      {cargando ? (
        <p>Cargando matrículas...</p>
      ) : (
        <MatriculaTable
          matriculas={matriculas}
          onEditar={editarMatricula}
          onEliminar={borrarMatricula}
        />
      )}
    </section>
  );
}

export default MatriculasPage;