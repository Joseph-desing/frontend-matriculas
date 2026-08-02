import Swal from 'sweetalert2';

export async function confirmarEliminacion(nombre) {
  const result = await Swal.fire({
    title: `¿Eliminar ${nombre}?`,
    text: 'Esta acción no se puede deshacer.',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Sí, eliminar',
    cancelButtonText: 'Cancelar',
    confirmButtonColor: '#dc3545',
    cancelButtonColor: '#64748b',
    reverseButtons: true,
    customClass: { popup: 'swal-modern' },
  });
  return result.isConfirmed;
}
