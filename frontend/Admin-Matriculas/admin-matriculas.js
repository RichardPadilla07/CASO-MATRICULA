// Script para la gestión de pedidos en el panel de administración.
// Aquí se definen funciones para la gestión y visualización de pedidos por el administrador.
// Puedes modificar la lógica, nombres de funciones o variables según la temática o cambios futuros en el proyecto.



// API para matrículas
const API_MATRICULAS = 'http://localhost:3000/api/matriculas';


async function obtenerMatriculas() {
  try {
    const res = await fetch(API_MATRICULAS);
    const matriculas = await res.json();
    mostrarMatriculas(matriculas);
  } catch (error) {
    console.error('Error al obtener matrículas:', error);
  }
}


// Mostrar matrículas
function mostrarMatriculas(matriculas) {
  const container = document.getElementById('matriculas-container');
  if (!container) return;
  container.innerHTML = '';
  matriculas.forEach((matricula, idx) => {
    const card = document.createElement('div');
    card.className = 'matricula-tarjeta';
    card.style = 'background:#f3f3f3;border-radius:16px;box-shadow:0 2px 8px rgba(106,17,203,0.08);padding:24px 18px;min-width:260px;max-width:320px;display:flex;flex-direction:column;align-items:flex-start;position:relative;margin-bottom:16px;';
    card.innerHTML = `
      <div style="font-size:16px;color:#888;margin-bottom:4px;">N° Matrícula: <strong>${idx + 1}</strong></div>
      <div style="font-size:20px;font-weight:bold;color:#2575fc;">Código Matrícula: ${matricula.codigo ?? ''}</div>
      <div style="margin-bottom:8px;color:#444;">Estudiante: <strong>${matricula.id_estudiante?.cedula ?? ''} - ${matricula.id_estudiante?.nombre ?? ''} ${matricula.id_estudiante?.apellido ?? ''}</strong></div>
      <div style="margin-bottom:8px;color:#444;">Materia: <strong>${matricula.id_materia?.nombre ?? ''}</strong></div>
      <div style="margin-bottom:8px;color:#444;">Código Materia: <strong>${matricula.id_materia?.codigo ?? ''}</strong></div>
      <div style="margin-bottom:8px;color:#444;">Créditos: <strong>${matricula.id_materia?.creditos ?? ''}</strong></div>
      <div style='display:flex;gap:10px;margin-top:10px;'>
        <button style='background:#2575fc;color:#fff;border:none;border-radius:8px;padding:8px 16px;font-weight:bold;cursor:pointer;' onclick='matricularMatricula("${matricula._id}")'>Matricular</button>
        <button style='background:#d32f2f;color:#fff;border:none;border-radius:8px;padding:8px 16px;font-weight:bold;cursor:pointer;' onclick='anularMatricula("${matricula._id}")'>Anular</button>
      </div>
    `;
    container.appendChild(card);
  });
}

// Acciones de los botones (solo ejemplo, implementar lógica según tu backend)
window.matricularMatricula = async function(id) {
  alert('Matricular matrícula: ' + id);
  // Aquí puedes implementar la lógica para aceptar/matricular
}

window.anularMatricula = async function(id) {
  alert('Anular matrícula: ' + id);
  // Aquí puedes implementar la lógica para anular/eliminar
}

// Cambiar estado de un pedido (NO FUNCIONO AUN LO DE ADMIN DE MODULO PEDIDOS)
window.cambiarEstadoPedido = async function (id, nuevoEstado) {
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
window.eliminarPedido = async function (id) {
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


// Inicializar matrículas
document.addEventListener('DOMContentLoaded', obtenerMatriculas);
