// Script para la gestión y listado de clientes en el panel de administración.
// Aquí se definen funciones para el CRUD y visualización de clientes.
// Puedes modificar la lógica, nombres de funciones o variables según la temática o cambios futuros en el proyecto.

// API para clientes
const API_ESTUDIANTES = 'https://caso-matricula.onrender.com/api/estudiantes';

// Cargar clientes
async function cargarClientes() {
  const tbody = document.getElementById('tabla-clientes-body');
  if (!tbody) return;
  tbody.innerHTML = '';
  try {
    const res = await fetch(API_ESTUDIANTES);
    const estudiantes = await res.json();
    estudiantes.forEach((est, idx) => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td>${idx + 1}</td>
        <td>${est.cedula}</td>
        <td>${est.nombre}</td>
        <td>${est.apellido}</td>
        <td>${est.ciudad}</td>
        <td>${est.email}</td>
        <td>${est.direccion || ''}</td>
        <td>${est.telefono || ''}</td>
        <td>${est.fecha_nacimiento ? est.fecha_nacimiento.substring(0,10) : ''}</td>
        <td style="display:flex;gap:8px;justify-content:center;align-items:center;">
          <button onclick="editarEstudiante('${est.cedula}')">✏️</button>
          <button onclick="eliminarEstudiante('${est.cedula}')">🗑️</button>
        </td>
      `;
      tbody.appendChild(tr);
    });
  } catch (err) {
    tbody.innerHTML = '<tr><td colspan="10">Error al cargar estudiantes</td></tr>';
  }
}

// Manejar creación de cliente
async function handleCrearEstudiante(e) {
  e.preventDefault();
  const form = e.target;
  const datos = {
    cedula: form.cedula.value.trim(),
    nombre: form.nombre.value.trim(),
    apellido: form.apellido.value.trim(),
    ciudad: form.ciudad.value.trim(),
    email: form.email.value.trim(),
    direccion: form.direccion.value.trim(),
    telefono: form.telefono.value.trim(),
    fecha_nacimiento: form.fecha_nacimiento.value,
    passwordEstudiante: form.passwordCliente.value.trim()
  };
  try {
    const res = await fetch(API_ESTUDIANTES, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(datos)
    });
    if (res.ok) {
      form.reset();
      cargarEstudiantes();
      alert('Estudiante creado correctamente');
    } else {
      alert('Error al crear estudiante');
    }
  } catch (err) {
    alert('Error de conexión');
  }
}

// Eliminar cliente
window.eliminarEstudiante = async function(cedula) {
  if (!confirm('¿Seguro que deseas eliminar este estudiante?')) return;
  try {
    const res = await fetch(`${API_ESTUDIANTES}/${cedula}`, { method: 'DELETE' });
    if (res.ok) cargarEstudiantes();
    else alert('Error al eliminar estudiante');
  } catch (err) {
    alert('Error de conexión');
  }
}

// Editar cliente
window.editarEstudiante = async function(cedula) {
  try {
    const res = await fetch(`${API_ESTUDIANTES}/${cedula}`);
    if (!res.ok) return alert('No se pudo obtener el estudiante');
    const est = await res.json();
    const modal = document.getElementById('modal-editar-cliente');
    const form = document.getElementById('form-editar-cliente');
    form.cedula.value = est.cedula || '';
    form.nombre.value = est.nombre || '';
    form.apellido.value = est.apellido || '';
    form.ciudad.value = est.ciudad || '';
    form.email.value = est.email || '';
    form.direccion.value = est.direccion || '';
    form.telefono.value = est.telefono || '';
    form.fecha_nacimiento.value = est.fecha_nacimiento ? est.fecha_nacimiento.substring(0,10) : '';
    form.passwordCliente.value = est.passwordEstudiante || '';
    modal.style.display = 'flex';
    form.onsubmit = async function(e) {
      e.preventDefault();
      const datos = {
        cedula: form.cedula.value.trim(),
        nombre: form.nombre.value.trim(),
        apellido: form.apellido.value.trim(),
        ciudad: form.ciudad.value.trim(),
        email: form.email.value.trim(),
        direccion: form.direccion.value.trim(),
        telefono: form.telefono.value.trim(),
        fecha_nacimiento: form.fecha_nacimiento.value,
        passwordEstudiante: form.passwordCliente.value.trim()
      };
      try {
        const res = await fetch(`${API_ESTUDIANTES}/${cedula}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(datos)
        });
        if (res.ok) {
          modal.style.display = 'none';
          cargarEstudiantes();
          alert('Estudiante actualizado correctamente');
        } else {
          alert('Error al actualizar estudiante');
        }
      } catch (err) {
        alert('Error de conexión');
      }
    };
    document.getElementById('btn-cerrar-modal-editar-cliente').onclick = () => {
      modal.style.display = 'none';
    };
  } catch (err) {
    alert('Error de conexión');
  }
}

// Inicializar clientes
document.addEventListener('DOMContentLoaded', () => {
  cargarEstudiantes();
  const formCliente = document.getElementById('form-cliente');
  if (formCliente) formCliente.onsubmit = handleCrearEstudiante;
});
