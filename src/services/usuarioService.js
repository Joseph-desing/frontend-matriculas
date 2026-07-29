const API_URL = 'http://127.0.0.1:5000/api/usuarios';

export async function obtenerUsuarios() {
  const respuesta = await fetch(API_URL);

  if (!respuesta.ok) {
    throw new Error('No se pudieron obtener los usuarios');
  }

  return respuesta.json();
}

export async function crearUsuario(usuario) {
  const respuesta = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(usuario),
  });

  const datos = await respuesta.json();

  if (!respuesta.ok) {
    throw new Error(datos.mensaje || 'No se pudo crear el usuario');
  }

  return datos;
}

export async function actualizarUsuario(id, usuario) {
  const respuesta = await fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(usuario),
  });

  const datos = await respuesta.json();

  if (!respuesta.ok) {
    throw new Error(datos.mensaje || 'No se pudo actualizar el usuario');
  }

  return datos;
}

export async function eliminarUsuario(id) {
  const respuesta = await fetch(`${API_URL}/${id}`, {
    method: 'DELETE',
  });

  const datos = await respuesta.json();

  if (!respuesta.ok) {
    throw new Error(datos.mensaje || 'No se pudo eliminar el usuario');
  }

  return datos;
}