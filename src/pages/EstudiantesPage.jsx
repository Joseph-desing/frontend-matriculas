import { useEffect, useState } from "react";

import EstudianteForm from "../components/EstudianteForm";
import EstudianteTable from "../components/EstudianteTable";

import {
  actualizarEstudiante,
  crearEstudiante,
  eliminarEstudiante,
  obtenerEstudiantes,
} from "../services/estudianteService";

function EstudiantesPage() {
  const [estudiantes, setEstudiantes] = useState([]);
  const [estudianteSeleccionado, setEstudianteSeleccionado] =
    useState(null);

  const [mensaje, setMensaje] = useState("");
  const [error, setError] = useState("");
  const [cargando, setCargando] = useState(true);

  async function cargarEstudiantes() {
    try {
      setCargando(true);
      setError("");

      const datos = await obtenerEstudiantes();
      setEstudiantes(datos);
    } catch (err) {
      setError(err.message);
    } finally {
      setCargando(false);
    }
  }

  useEffect(() => {
    cargarEstudiantes();
  }, []);

  async function guardarEstudiante(datosFormulario) {
    try {
      setMensaje("");
      setError("");

      if (estudianteSeleccionado) {
        const resultado = await actualizarEstudiante(
          estudianteSeleccionado.id,
          datosFormulario
        );

        setMensaje(
          resultado.message ||
            "Estudiante actualizado correctamente."
        );
      } else {
        const resultado = await crearEstudiante(datosFormulario);

        setMensaje(
          resultado.message ||
            "Estudiante creado correctamente."
        );
      }

      setEstudianteSeleccionado(null);
      await cargarEstudiantes();
    } catch (err) {
      setError(err.message);
    }
  }

  function editarEstudiante(estudiante) {
    setMensaje("");
    setError("");
    setEstudianteSeleccionado(estudiante);
  }

  function cancelarEdicion() {
    setEstudianteSeleccionado(null);
  }

  async function borrarEstudiante(id) {
    const confirmar = window.confirm(
      "¿Estás seguro de eliminar este estudiante?"
    );

    if (!confirmar) {
      return;
    }

    try {
      setMensaje("");
      setError("");

      const resultado = await eliminarEstudiante(id);

      setMensaje(
        resultado.message ||
          "Estudiante eliminado correctamente."
      );

      if (estudianteSeleccionado?.id === id) {
        setEstudianteSeleccionado(null);
      }

      await cargarEstudiantes();
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <main>
      <h1>Gestión de estudiantes</h1>

      {mensaje && <p>{mensaje}</p>}
      {error && <p>{error}</p>}

      <EstudianteForm
        estudianteSeleccionado={estudianteSeleccionado}
        onGuardar={guardarEstudiante}
        onCancelar={cancelarEdicion}
      />

      {cargando ? (
        <p>Cargando estudiantes...</p>
      ) : (
        <EstudianteTable
          estudiantes={estudiantes}
          onEditar={editarEstudiante}
          onEliminar={borrarEstudiante}
        />
      )}
    </main>
  );
}

export default EstudiantesPage;