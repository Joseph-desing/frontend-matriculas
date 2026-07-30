const API_URL = "http://127.0.0.1:5000/api/usuarios";

// Obtener todos los usuarios
export async function obtenerUsuarios() {
  const respuesta = await fetch(
    "http://127.0.0.1:5000/api/usuarios"
  );

  const resultado = await respuesta.json();

  if (!respuesta.ok) {
    throw new Error(
      resultado.message || "Error al obtener usuarios."
    );
  }

  return resultado.data || resultado.usuarios || [];
}

// Crear usuario
export async function crearUsuario(usuario) {
  const respuesta = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(usuario),
  });

  const resultado = await respuesta.json();

  if (!respuesta.ok) {
    throw new Error(resultado.message || "Error al crear usuario.");
  }

  return resultado;
}

// Actualizar usuario
export async function actualizarUsuario(id, usuario) {
  const respuesta = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(usuario),
  });

  const resultado = await respuesta.json();

  if (!respuesta.ok) {
    throw new Error(resultado.message || "Error al actualizar usuario.");
  }

  return resultado;
}

// Eliminar usuario
export async function eliminarUsuario(id) {
  const respuesta = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });

  const resultado = await respuesta.json();

  if (!respuesta.ok) {
    throw new Error(resultado.message || "Error al eliminar usuario.");
  }

  return resultado;
}