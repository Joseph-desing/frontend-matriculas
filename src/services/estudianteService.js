const API_URL = "http://127.0.0.1:5000/api/estudiantes";

// Obtener todos los estudiantes
export async function obtenerEstudiantes() {
  const respuesta = await fetch(API_URL);
  const resultado = await respuesta.json();

  if (!respuesta.ok) {
    throw new Error(resultado.message || "Error al obtener estudiantes.");
  }

  return resultado.data;
}

// Crear estudiante
export async function crearEstudiante(estudiante) {
  const respuesta = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(estudiante),
  });

  const resultado = await respuesta.json();

  if (!respuesta.ok) {
    throw new Error(resultado.message || "Error al crear estudiante.");
  }

  return resultado;
}

// Actualizar estudiante
export async function actualizarEstudiante(id, estudiante) {
  const respuesta = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(estudiante),
  });

  const resultado = await respuesta.json();

  if (!respuesta.ok) {
    throw new Error(resultado.message || "Error al actualizar estudiante.");
  }

  return resultado;
}

// Eliminar estudiante
export async function eliminarEstudiante(id) {
  const respuesta = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });

  const resultado = await respuesta.json();

  if (!respuesta.ok) {
    throw new Error(resultado.message || "Error al eliminar estudiante.");
  }

  return resultado;
}