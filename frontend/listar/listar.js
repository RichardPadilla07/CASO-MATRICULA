// Script para la gestión y listado de productos para el cliente.
// Aquí se definen funciones para agregar productos al carrito y visualizar productos.
// Puedes modificar la lógica, nombres de funciones o variables según la temática o cambios futuros en el proyecto.

// Agregar producto al carrito
async function agregarAlCarrito(idProducto) {
  const cedula = localStorage.getItem('cedulaCliente') || localStorage.getItem('clienteCedula');
  if (!cedula) return alert('No se encontró la cédula del cliente');
  try {
    const res = await fetch('http://localhost:3000/api/carrito', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ cedula_cliente: cedula, id_producto: idProducto, cantidad: 1 })
    });
    if (!res.ok) throw new Error('Error al agregar al carrito');
    alert('Producto agregado al carrito');
  } catch (err) {
    alert('Error al agregar al carrito');
  }
}

// Funcionalidad de listado de productos para cliente
function renderProductosTabla(productos) {
  const tbody = document.getElementById('tabla-productos-body');
  if (!tbody) return;
  tbody.innerHTML = '';
  productos.forEach((prod, idx) => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${idx + 1}</td>
      <td>${prod.nombre}</td>
      <td>${prod.codigo}</td>
      <td>${prod.descripcion}</td>
      <td>${prod.categoria}</td>
      <td>${prod.precio}</td>
      <td>${prod.stock}</td>
      <td>${prod.fecha_ingreso ? prod.fecha_ingreso.substring(0, 10) : ''}</td>
      <td>${prod.proveedor}</td>
  <td><button class="btn-login" onclick="agregarAlCarrito('${prod._id}')">Agregar al carrito</button></td>
    `;
    tbody.appendChild(tr);
  });
}


// Obtener productos del backend y renderizar tabla
async function obtenerYListarProductos() {
  try {
    const res = await fetch('http://localhost:3000/api/productos');
    if (!res.ok) throw new Error('Error al obtener productos');
    const productos = await res.json();
    renderProductosTabla(productos);
  } catch (err) {
    console.error('Error al listar productos:', err);
  }
}

// Ejecutar al mostrar la sección de listar
document.addEventListener('DOMContentLoaded', () => {
  const btnListar = document.getElementById('btn-listar');
  btnListar.addEventListener('click', obtenerYListarProductos);
});
