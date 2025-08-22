// Script para la gestión y listado de productos en el panel de administración.
// Aquí se definen funciones para el CRUD y visualización de productos.
// Puedes modificar la lógica, nombres de funciones o variables según la temática o cambios futuros en el proyecto.
// CRUD de productos para el panel admin
const API_URL = 'http://localhost:4000/api/materias';

async function cargarMaterias() {
  const tbody = document.getElementById('tabla-materias-body');
  tbody.innerHTML = '';
  try {
    const res = await fetch(API_URL);
    const materias = await res.json();
    materias.forEach((mat, idx) => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td>${idx + 1}</td>
        <td>${mat.nombre}</td>
        <td>${mat.codigo}</td>
        <td>${mat.descripcion || ''}</td>
          <td>${mat.creditos || ''}</td>
        <td style="display:flex;gap:8px;justify-content:center;align-items:center;">
            <button onclick="editarMateria('${mat._id}')">✏️</button>
            <button onclick="eliminarMateria('${mat._id}')">🗑️</button>
        </td>
      `;
      tbody.appendChild(tr);
    });
  } catch (err) {
    tbody.innerHTML = '<tr><td colspan="10">Error al cargar materias</td></tr>';
  }
}

async function handleCrearMateria(e) {
  e.preventDefault();
  const form = e.target;
  const datos = {
    nombre: form.nombre.value.trim(),
    codigo: form.codigo.value.trim(),
    descripcion: form.descripcion.value.trim(),
    creditos: parseInt(form.creditos.value)
  };
  try {
    const res = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(datos)
    });
    if (res.ok) {
      form.reset();
      cargarProductos();
      alert('Producto creado correctamente');
    } else {
      alert('Error al crear producto');
    }
  } catch (err) {
    alert('Error de conexión');
  }
}

window.eliminarMateria = async function(id) {
  if (!confirm('¿Seguro que deseas eliminar esta materia?')) return;
  try {
    const res = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
    if (res.ok) cargarMaterias();
    else alert('Error al eliminar materia');
  } catch (err) {
    alert('Error de conexión');
  }
}

window.editarMateria = async function(id) {
  try {
    const res = await fetch(`${API_URL}/${id}`);
    if (!res.ok) return alert('No se pudo obtener la materia');
    const materia = await res.json();
    const modal = document.getElementById('modal-editar-materia');
    const form = document.getElementById('form-editar-materia');
  form.nombre.value = materia.nombre || '';
  form.codigo.value = materia.codigo || '';
  form.descripcion.value = materia.descripcion || '';
  form.creditos.value = materia.creditos || '';
    modal.style.display = 'flex';
    form.onsubmit = async function(e) {
      e.preventDefault();
      const datos = {
        nombre: form.nombre.value.trim(),
        codigo: form.codigo.value.trim(),
        descripcion: form.descripcion.value.trim(),
        creditos: parseInt(form.creditos.value)
      };
      try {
        const res = await fetch(`${API_URL}/${id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(datos)
        });
        if (res.ok) {
          modal.style.display = 'none';
          cargarMaterias();
          alert('Materia actualizada correctamente');
        } else {
          alert('Error al actualizar producto');
        }
      } catch (err) {
        alert('Error de conexión');
      }
    };
    document.getElementById('btn-cerrar-modal-editar').onclick = () => {
      modal.style.display = 'none';
    };
  } catch (err) {
    alert('Error de conexión');
  }
}

document.addEventListener('DOMContentLoaded', () => {
  cargarMaterias();
  const formMateria = document.getElementById('form-materia');
  if (formMateria) formMateria.onsubmit = handleCrearMateria;
});
