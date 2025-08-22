// Script para la gestión de pedidos en el panel de administración.
// Aquí se definen funciones para la gestión y visualización de pedidos por el administrador.
// Puedes modificar la lógica, nombres de funciones o variables según la temática o cambios futuros en el proyecto.


// API para pedidos
const API_PEDIDOS = 'http://localhost:3000/api/pedidos';

async function obtenerPedidos() {
  try {
    const res = await fetch(API_PEDIDOS);
    const pedidos = await res.json();
    mostrarPedidos(pedidos);
  } catch (error) {
    console.error('Error al obtener pedidos:', error);
  }
}

// Mostrar pedidos
function mostrarPedidos(pedidos) {
  const container = document.getElementById('pedidos-container');
  if (!container) return;
  container.innerHTML = '';
  pedidos.forEach(pedido => {
    const card = document.createElement('div');
    card.className = 'pedido-tarjeta';
    card.style = 'background:#f3f3f3;border-radius:16px;box-shadow:0 2px 8px rgba(106,17,203,0.08);padding:24px 18px;min-width:260px;max-width:320px;display:flex;flex-direction:column;align-items:flex-start;position:relative;margin-bottom:16px;';
    card.innerHTML = `
      <div style="font-size:16px;color:#888;margin-bottom:4px;">ID Pedido: <strong>${pedido.id ?? ''}</strong></div>
      <div style="font-size:20px;font-weight:bold;color:#2575fc;">Pedido #${pedido.codigo_pedido ?? ''}</div>
      <div style="margin-bottom:8px;color:#444;">Cliente: <strong>${pedido.cedula_cliente ?? ''}</strong></div>
      <div style="margin-bottom:8px;color:#444;">Producto: <strong>${pedido.codigo_producto ?? ''}</strong></div>
      <div style="margin-bottom:8px;color:#444;">Cantidad: <strong>${pedido.cantidad ?? ''}</strong></div>
      <div style="margin-bottom:8px;color:#444;">Estado: <span id="estado-${pedido._id}" style="font-weight:bold;">${pedido.estado || 'pendiente'}</span></div>
      <div style="display:flex;gap:10px;">
        <button style='background:#2575fc;color:#fff;border:none;border-radius:8px;padding:8px 16px;font-weight:bold;cursor:pointer;' onclick='cambiarEstadoPedido("${pedido._id}", "aceptado")'>Aceptar</button>
        <button style='background:#ff9800;color:#fff;border:none;border-radius:8px;padding:8px 16px;font-weight:bold;cursor:pointer;' onclick='cambiarEstadoPedido("${pedido._id}", "no disponible")'>Rechazar</button>
        <button style='background:#d32f2f;color:#fff;border:none;border-radius:8px;padding:8px 16px;font-weight:bold;cursor:pointer;' onclick='cambiarEstadoPedido("${pedido._id}", "eliminado")'>Eliminar</button>
      </div>
    `;
    container.appendChild(card);
  });
}

// Cambiar estado de un pedido (NO FUNCIONO AUN LO DE ADMIN DE MODULO PEDIDOS)
window.cambiarEstadoPedido = async function(id, nuevoEstado) {
  try {
    const res = await fetch(`${API_PEDIDOS}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ estado: nuevoEstado })
    });
    if (res.ok) {
      document.getElementById(`estado-${id}`).textContent = nuevoEstado;
    }
  } catch (error) {
    console.error('Error al cambiar estado:', error);
  }
}

// Eliminar pedido
window.eliminarPedido = async function(id) {
  if (!confirm('¿Seguro que deseas eliminar este pedido?')) return;
  try {
    const res = await fetch(`${API_PEDIDOS}/${id}`, {
      method: 'DELETE'
    });
    if (res.ok) obtenerPedidos();
    else alert('Error al eliminar pedido');
  } catch (error) {
    console.error('Error al eliminar pedido:', error);
  }
}

// Inicializar pedidos
document.addEventListener('DOMContentLoaded', obtenerPedidos);
