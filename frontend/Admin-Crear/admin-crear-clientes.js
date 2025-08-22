// Script para la gestión y creación de clientes en el panel de administración.
// Aquí se definen funciones para el CRUD de clientes.
// Puedes modificar la lógica, nombres de funciones o variables según la temática o cambios futuros en el proyecto.

// API para clientes
const API_CLIENTES = 'http://localhost:3000/api/clientes';

// Cargar clientes
async function cargarClientes() {
  const tbody = document.getElementById('tabla-clientes-body');
  if (!tbody) return;
  tbody.innerHTML = '';
  try {
    const res = await fetch(API_CLIENTES);
    const clientes = await res.json();
    clientes.forEach((cli, idx) => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td>${idx + 1}</td>
        <td>${cli.cedula}</td>
        <td>${cli.nombre}</td>
        <td>${cli.apellido}</td>
        <td>${cli.ciudad}</td>
        <td>${cli.email}</td>
        <td>${cli.direccion || ''}</td>
        <td>${cli.telefono || ''}</td>
        <td>${cli.fecha_nacimiento ? cli.fecha_nacimiento.substring(0,10) : ''}</td>
        <td style="display:flex;gap:8px;justify-content:center;align-items:center;">
          <button onclick="editarCliente('${cli.cedula}')">✏️</button>
          <button onclick="eliminarCliente('${cli.cedula}')">🗑️</button>
        </td>
      `;
      tbody.appendChild(tr);
    });
  } catch (err) {
    tbody.innerHTML = '<tr><td colspan="10">Error al cargar clientes</td></tr>';
  }
}

// Manejar creación de cliente
async function handleCrearCliente(e) {
  e.preventDefault();
  const form = e.target;
  const cliente = {
    cedula: form.cedula.value.trim(),
    nombre: form.nombre.value.trim(),
    apellido: form.apellido.value.trim(),
    ciudad: form.ciudad.value.trim(),
    email: form.email.value.trim(),
    direccion: form.direccion.value.trim(),
    telefono: form.telefono.value.trim(),
    fecha_nacimiento: form.fecha_nacimiento.value,
    passwordCliente: form.passwordCliente.value.trim()
  };
  try {
    const res = await fetch(API_CLIENTES, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(cliente)
    });
    if (res.ok) {
      form.reset();
  alert('Cliente creado correctamente');
  cargarClientes();
    } else {
      const data = await res.json();
      alert(data.error || 'Error al crear cliente');
    }
  } catch (err) {
    alert('Error de conexión');
  }
}

// Eliminar cliente
window.eliminarCliente = async function(cedula) {
  if (!confirm('¿Seguro que deseas eliminar este cliente?')) return;
  try {
    const res = await fetch(`${API_CLIENTES}/${cedula}`, { method: 'DELETE' });
    if (res.ok) cargarClientes();
    else alert('Error al eliminar cliente');
  } catch (err) {
    alert('Error de conexión');
  }
}

// Editar cliente
window.editarCliente = async function(cedula) {
  try {
    const res = await fetch(`${API_CLIENTES}/${cedula}`);
    if (!res.ok) return alert('No se pudo obtener el cliente');
    const cli = await res.json();
    const modal = document.getElementById('modal-editar-cliente');
    const form = document.getElementById('form-editar-cliente');
    form.cedula.value = cli.cedula || '';
    form.nombre.value = cli.nombre || '';
    form.apellido.value = cli.apellido || '';
    form.ciudad.value = cli.ciudad || '';
    form.email.value = cli.email || '';
    form.direccion.value = cli.direccion || '';
    form.telefono.value = cli.telefono || '';
    form.fecha_nacimiento.value = cli.fecha_nacimiento ? cli.fecha_nacimiento.substring(0,10) : '';
    form.passwordCliente.value = cli.passwordCliente || '';
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
        passwordCliente: form.passwordCliente.value.trim()
      };
      try {
        const res = await fetch(`${API_CLIENTES}/${cedula}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(datos)
        });
        if (res.ok) {
          modal.style.display = 'none';
          cargarClientes();
          alert('Cliente actualizado correctamente');
        } else {
          alert('Error al actualizar cliente');
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

// Inicialización
document.addEventListener('DOMContentLoaded', () => {
  cargarClientes();
  const formCliente = document.getElementById('form-cliente');
  if (formCliente) formCliente.onsubmit = handleCrearCliente;
});
