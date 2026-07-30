const API_URL = "http://127.0.0.1:5000/api/materias";

export async function obtenerMaterias() {
  const respuesta = await fetch(API_URL);
  const resultado = await respuesta.json();

  if (!respuesta.ok) {
    throw new Error(
      resultado.message || "Error al obtener las materias."
    );
  }

  return resultado.data || [];
}

export async function crearMateria(materia) {
  const respuesta = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(materia),
  });

  const resultado = await respuesta.json();

  if (!respuesta.ok) {
    throw new Error(
      resultado.message || "Error al crear la materia."
    );
  }

  return resultado;
}

export async function actualizarMateria(id, materia) {
  const respuesta = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(materia),
  });

  const resultado = await respuesta.json();

  if (!respuesta.ok) {
    throw new Error(
      resultado.message || "Error al actualizar la materia."
    );
  }

  return resultado;
}

export async function eliminarMateria(id) {
  const respuesta = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });

  const resultado = await respuesta.json();

  if (!respuesta.ok) {
    throw new Error(
      resultado.message || "Error al eliminar la materia."
    );
  }

  return resultado;
}