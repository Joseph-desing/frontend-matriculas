import { useEffect, useState } from 'react';

import UsuarioForm from '../components/UsuarioForm.jsx';
import UsuarioTable from '../components/UsuarioTable.jsx';

import {
  actualizarUsuario,
  crearUsuario,
  eliminarUsuario,
  obtenerUsuarios,
} from '../services/usuarioService.js';

function UsuariosPage() {
  const [usuarios, setUsuarios] = useState([]);
  const [usuarioEditar, setUsuarioEditar] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState('');
  const [mensaje, setMensaje] = useState('');

  useEffect(() => {
    cargarUsuarios();
  }, []);

  async function cargarUsuarios() {
    try {
      setCargando(true);
      setError('');

      const datos = await obtenerUsuarios();

      setUsuarios(datos.usuarios || []);
    } catch (error) {
      setError(error.message);
    } finally {
      setCargando(false);
    }
  }

  async function guardarUsuario(formulario) {
    try {
      setError('');
      setMensaje('');

      if (usuarioEditar) {
        const datosActualizar = { ...formulario };

        if (!datosActualizar.contrasena) {
          delete datosActualizar.contrasena;
        }

        await actualizarUsuario(usuarioEditar.id, datosActualizar);
        setMensaje('Usuario actualizado correctamente.');
        setUsuarioEditar(null);
      } else {
        await crearUsuario(formulario);
        setMensaje('Usuario creado correctamente.');
      }

      await cargarUsuarios();
    } catch (error) {
      setError(error.message);
    }
  }

  function editarUsuario(usuario) {
    setUsuarioEditar(usuario);
    setMensaje('');
    setError('');
  }

  function cancelarEdicion() {
    setUsuarioEditar(null);
  }

  async function borrarUsuario(id) {
    const confirmar = window.confirm(
      '¿Está seguro de eliminar este usuario?',
    );

    if (!confirmar) {
      return;
    }

    try {
      setError('');
      setMensaje('');

      await eliminarUsuario(id);

      setMensaje('Usuario eliminado correctamente.');

      if (usuarioEditar?.id === id) {
        setUsuarioEditar(null);
      }

      await cargarUsuarios();
    } catch (error) {
      setError(error.message);
    }
  }

  return (
    <section>
      <h2>Usuarios</h2>

      <UsuarioForm
        usuarioEditar={usuarioEditar}
        onGuardar={guardarUsuario}
        onCancelar={cancelarEdicion}
      />

      {mensaje && <p className="mensaje-exito">{mensaje}</p>}
      {error && <p className="mensaje-error">{error}</p>}
      {cargando && <p>Cargando usuarios...</p>}

      {!cargando && (
        <UsuarioTable
          usuarios={usuarios}
          onEditar={editarUsuario}
          onEliminar={borrarUsuario}
        />
      )}
    </section>
  );
}

export default UsuariosPage;