const API_URL = "http://127.0.0.1:5000/api/matriculas";

export async function obtenerMatriculas() {
  const respuesta = await fetch(API_URL);
  const resultado = await respuesta.json();

  if (!respuesta.ok) {
    throw new Error(
      resultado.message || "Error al obtener las matrículas."
    );
  }

  return resultado.data || [];
}

export async function crearMatricula(matricula) {
  const respuesta = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(matricula),
  });

  const resultado = await respuesta.json();

  if (!respuesta.ok) {
    throw new Error(
      resultado.message || "Error al crear la matrícula."
    );
  }

  return resultado;
}

export async function actualizarMatricula(id, matricula) {
  const respuesta = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(matricula),
  });

  const resultado = await respuesta.json();

  if (!respuesta.ok) {
    throw new Error(
      resultado.message || "Error al actualizar la matrícula."
    );
  }

  return resultado;
}

export async function eliminarMatricula(id) {
  const respuesta = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });

  const resultado = await respuesta.json();

  if (!respuesta.ok) {
    throw new Error(
      resultado.message || "Error al eliminar la matrícula."
    );
  }

  return resultado;
}