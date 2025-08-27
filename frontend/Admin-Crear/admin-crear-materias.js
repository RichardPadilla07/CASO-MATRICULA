// Script para la gestión y creación de productos en el panel de administración.
// Aquí se definen funciones para el CRUD de productos y gestión de pedidos.
// Puedes modificar la lógica, nombres de funciones o variables según la temática o cambios futuros en el proyecto.

// API para materias
const API_URL_MATERIAS = 'https://caso-matricula.onrender.com/api/materias'; 


// Cargar productos
document.addEventListener('DOMContentLoaded', () => {
  const formMateria = document.getElementById('form-materia');
  if (formMateria) formMateria.onsubmit = handleCrearMateria;
});

// Cargar productos
async function cargarProductos() {
  const tbody = document.getElementById('tabla-productos-body');
  tbody.innerHTML = '';
  try {
    const res = await fetch(API_URL_MATERIAS);
    const productos = await res.json();
    productos.forEach((prod, idx) => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td>${idx + 1}</td>
        <td>${prod.nombre}</td>
        <td>${prod.codigo}</td>
        <td>${prod.descripcion || ''}</td>
        <td>${prod.categoria || ''}</td>
        <td>${prod.precio}</td>
        <td>${prod.stock}</td>
        <td>${prod.fecha_ingreso ? prod.fecha_ingreso.substring(0, 10) : ''}</td>
        <td>${prod.proveedor || ''}</td>
        <td style="display:flex;gap:8px;justify-content:center;align-items:center;">
          <button onclick="editarProducto('${prod._id}')">✏️</button>
          <button onclick="eliminarProducto('${prod._id}')">🗑️</button>
        </td>
      `;
      tbody.appendChild(tr);
    });
  } catch (err) {
    tbody.innerHTML = '<tr><td colspan="10">Error al cargar productos</td></tr>';
  }
}

// Manejar creación de materia
async function handleCrearMateria(e) {
  e.preventDefault();
  const form = e.target;
  const materia = {
    nombre: form.nombre.value.trim(),
    codigo: form.codigo.value.trim(),
    descripcion: form.descripcion.value.trim(),
    creditos: parseInt(form.creditos.value)
  };
  try {
  const res = await fetch(API_URL_MATERIAS, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(materia)
    });
    if (res.ok) {
      form.reset();
      alert('Materia creada correctamente');
      // cargarMaterias(); // Si tienes una función para recargar la lista de materias
    } else {
      const data = await res.json();
      let msg = 'Error al crear materia';
      if (typeof data === 'object') {
        msg = data.error || JSON.stringify(data);
      }
      alert(msg);
    }
  } catch (err) {
    alert('Error de conexión');
  }
}

// Eliminar producto
window.eliminarProducto = async function (id) {
  if (!confirm('¿Seguro que deseas eliminar este producto?')) return;
  try {
    const res = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
    if (res.ok) cargarProductos();
    else alert('Error al eliminar producto');
  } catch (err) {
    alert('Error de conexión');
  }
}

// Editar producto
window.editarProducto = async function (id) {
  try {
    const res = await fetch(`${API_URL}/${id}`);
    if (!res.ok) return alert('No se pudo obtener el producto');
    const prod = await res.json();
    const modal = document.getElementById('modal-editar-producto');
    const form = document.getElementById('form-editar-producto');
    form.nombre.value = prod.nombre || '';
    form.codigo.value = prod.codigo || '';
    form.descripcion.value = prod.descripcion || '';
    form.categoria.value = prod.categoria || '';
    form.precio.value = prod.precio || '';
    form.stock.value = prod.stock || '';
    form.fecha_ingreso.value = prod.fecha_ingreso ? prod.fecha_ingreso.substring(0, 10) : '';
    form.proveedor.value = prod.proveedor || '';
    modal.style.display = 'flex';
    form.onsubmit = async function (e) {
      e.preventDefault();
      const datos = {
        nombre: form.nombre.value.trim(),
        codigo: form.codigo.value.trim(),
        descripcion: form.descripcion.value.trim(),
        categoria: form.categoria.value.trim(),
        precio: parseFloat(form.precio.value),
        stock: parseInt(form.stock.value),
        fecha_ingreso: form.fecha_ingreso.value,
        proveedor: form.proveedor.value.trim()
      };
      try {
        const res = await fetch(`${API_URL}/${id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(datos)
        });
        if (res.ok) {
          modal.style.display = 'none';
          cargarProductos();
          alert('Producto actualizado correctamente');
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
