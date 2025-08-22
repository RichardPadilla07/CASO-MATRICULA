// Script para la gestión del carrito de compras del cliente.
// Aquí se definen funciones para mostrar, actualizar y eliminar productos del carrito.
// Puedes modificar la lógica, nombres de funciones o variables según la temática o cambios futuros en el proyecto.

// Mostrar notificación del carrito
function mostrarNotificacionCarrito(mensaje, tipo = 'success') {
  let notif = document.getElementById('carrito-notif');
  if (!notif) {
    notif = document.createElement('div');
    notif.id = 'carrito-notif';
    notif.style = 'position:fixed;top:30px;right:30px;z-index:9999;padding:16px 32px;border-radius:10px;font-size:18px;box-shadow:0 2px 8px rgba(106,17,203,0.12);display:none;';
    document.body.appendChild(notif);
  }
  notif.textContent = mensaje;
  notif.style.background = tipo === 'success' ? '#2575fc' : '#d32f2f';
  notif.style.color = '#fff';
  notif.style.display = 'block';
  setTimeout(() => { notif.style.display = 'none'; }, 2500);
}


// Obtener y mostrar productos del carrito
async function mostrarCarritoCliente() {
  const cedulaInput = document.getElementById('cedula_cliente');
  let cedula = '';
  if (cedulaInput && cedulaInput.value) {
    cedula = cedulaInput.value;
  } else {
    cedula = localStorage.getItem('cedulaCliente') || localStorage.getItem('clienteCedula');
  }
  if (!cedula) return;
  try {
    const res = await fetch(`http://localhost:3000/api/carrito/${cedula}`);
    if (!res.ok) throw new Error('Error al obtener carrito');
    const productos = await res.json();
    renderCarrito(productos);
  } catch (err) {
    mostrarNotificacionCarrito('Error al mostrar carrito', 'error');
  }
}

// Renderizar carrito
function renderCarrito(productos) {
  const lista = document.getElementById('carrito-lista');
  const vacio = document.getElementById('carrito-vacio');

  // Limpiar lista
  lista.innerHTML = '';
  if (!productos.length) {
    vacio.style.display = 'block';
    return;
  }
  vacio.style.display = 'none';
  productos.forEach(item => {
    const prod = item.id_producto || {};
    const card = document.createElement('div');
    card.style = 'background:#f3f3f3;border-radius:16px;box-shadow:0 2px 8px rgba(106,17,203,0.08);padding:24px 18px;min-width:260px;max-width:320px;display:flex;flex-direction:column;align-items:flex-start;position:relative;margin-bottom:16px;';
    card.innerHTML = `
      <div style="font-size:16px;color:#888;margin-bottom:4px;">ID Carrito: <strong>${item._id}</strong></div>
      <div style="font-size:20px;font-weight:bold;color:#2575fc;">${prod.nombre || ''}</div>
      <div style="margin-bottom:8px;color:#444;">Categoría: <strong>${prod.categoria || ''}</strong></div>
      <div style="margin-bottom:8px;color:#444;">Stock: <strong>${prod.stock ?? ''}</strong></div>
      <div style="margin-bottom:8px;color:#444;">Precio: <strong>$${prod.precio ?? ''}</strong></div>
      <div style="margin-bottom:8px;color:#444;">Cantidad: <input type='number' min='1' max='${prod.stock ?? 1}' value='${item.cantidad ?? 1}' style='width:60px;padding:4px;border-radius:6px;border:1px solid #ccc;' id='cantidad-${item._id}'></div>
      <div style="display:flex;gap:10px;">
        <button style='background:#2575fc;color:#fff;border:none;border-radius:8px;padding:8px 16px;font-weight:bold;cursor:pointer;' onclick='actualizarCantidadCarrito("${item._id}")'>Actualizar</button>
        <button style='background:#d32f2f;color:#fff;border:none;border-radius:8px;padding:8px 16px;font-weight:bold;cursor:pointer;' onclick='eliminarDelCarrito("${item._id}")'>Eliminar</button>
      </div>
    `;
    lista.appendChild(card);
  });
}

// Actualizar cantidad en el carrito
async function actualizarCantidadCarrito(id) {
  const input = document.getElementById(`cantidad-${id}`);
  const cantidad = input ? parseInt(input.value) : 1;
  // Obtener el stock máximo desde el atributo max del input
  const stockMax = input ? parseInt(input.max) : 1;
  if (isNaN(cantidad) || cantidad < 1) {
    mostrarNotificacionCarrito('Cantidad inválida', 'error');
    return;
  }
  if (cantidad > stockMax) {
    window.alert('La cantidad no debe exceder el stock');
    return;
  }
  try {
    // Actualizar cantidad en el carrito
    const res = await fetch(`http://localhost:3000/api/carrito/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ cantidad })
    });
    if (!res.ok) throw new Error('Error al actualizar cantidad');
    window.alert('Cantidad actualizada');
    mostrarCarritoCliente();
  } catch (err) {
    mostrarNotificacionCarrito('Error al actualizar cantidad', 'error');
  }
}

// Eliminar producto del carrito
async function eliminarDelCarrito(id) {
  if (!confirm('¿Eliminar este producto del carrito?')) return;
  try {
    const res = await fetch(`http://localhost:3000/api/carrito/${id}`, { method: 'DELETE' });
    if (!res.ok) throw new Error('Error al eliminar');
    window.alert('Producto eliminado');
    mostrarCarritoCliente();
  } catch (err) {
    mostrarNotificacionCarrito('Error al eliminar', 'error');
  }
}

// Evento para mostrar carrito al navegar
document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('btn-carrito').addEventListener('click', mostrarCarritoCliente);
});