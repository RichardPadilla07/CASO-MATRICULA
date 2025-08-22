// Script para la gestión del perfil del administrador en el panel.
// Aquí se definen funciones para ver y actualizar el perfil del administrador.
// Puedes modificar la lógica, nombres de funciones o variables según la temática o cambios futuros en el proyecto.

// Variables
let adminId = localStorage.getItem('adminId') || '';
let datosAdmin = {};

// Obtener datos del administrador
async function obtenerDatosAdmin() {
  try {
    if (!adminId) return;
    const res = await fetch(`http://localhost:3000/api/usuarios/${adminId}`);
    if (res.ok) {
      datosAdmin = await res.json();
      renderPerfil();
      renderSaludo();
    }
  } catch (err) {
    console.error('Error al obtener datos del admin:', err);
  }
}

// Renderizar perfil
function renderPerfil() {
  document.getElementById('datos-perfil').innerHTML = `
    <strong>Nombre:</strong> ${datosAdmin.nombre || ''}<br>
    <strong>Apellido:</strong> ${datosAdmin.apellido || ''}<br>
    <strong>Email:</strong> ${datosAdmin.email || ''}<br>
    <strong>Rol:</strong> ${datosAdmin.rol || 'Administrador'}
  `;
}

// Renderizar saludo
function renderSaludo() {
  document.getElementById('admin-nombre').textContent = `${datosAdmin.nombre || ''} ${datosAdmin.apellido || ''}`;
}

// Inicializar
document.addEventListener('DOMContentLoaded', obtenerDatosAdmin);

// Modal lógica
const btnActualizarPerfil = document.getElementById('btn-actualizar-perfil');
const modalActualizar = document.getElementById('modal-actualizar-perfil');
const formActualizar = document.getElementById('form-actualizar-perfil');
const btnCerrarModal = document.getElementById('btn-cerrar-modal');

// Abrir modal
if (btnActualizarPerfil && modalActualizar && formActualizar && btnCerrarModal) {
  btnActualizarPerfil.onclick = () => {
    formActualizar.nombre.value = datosAdmin.nombre || '';
    formActualizar.apellido.value = datosAdmin.apellido || '';
    formActualizar.email.value = datosAdmin.email || '';
    formActualizar.password.value = '';
    modalActualizar.style.display = 'flex';
  };

  // Cerrar modal
  btnCerrarModal.onclick = () => {
    modalActualizar.style.display = 'none';
  };

  // Manejar actualización de perfil
  formActualizar.onsubmit = async function(e) {
    e.preventDefault();
    const datos = {
      nombre: formActualizar.nombre.value.trim(),
      apellido: formActualizar.apellido.value.trim(),
      email: formActualizar.email.value.trim(),
      password: formActualizar.password.value.trim()
    };
    try {
      // Actualizar datos del administrador
      const res = await fetch(`http://localhost:3000/api/usuarios/${adminId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(datos)
      });
      if (res.ok) {
        await obtenerDatosAdmin();
        modalActualizar.style.display = 'none';
        alert('Perfil actualizado correctamente');
      } else {
        alert('Error al actualizar perfil');
      }
    } catch (err) {
      alert('Error de conexión');
    }
  };
}
