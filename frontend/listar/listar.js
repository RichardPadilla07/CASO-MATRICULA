// Script para la gestión y listado de productos para el cliente.
// Aquí se definen funciones para agregar productos al carrito y visualizar productos.
// Puedes modificar la lógica, nombres de funciones o variables según la temática o cambios futuros en el proyecto.

// Agregar producto al carrito
async function agregarAlCarrito(idProducto) {
  const cedula = localStorage.getItem('cedulaCliente') || localStorage.getItem('clienteCedula');
  if (!cedula) return alert('No se encontró la cédula del estudiante');
  try {
    // Generar código de matrícula único mezclando letras y números
    function generarCodigoMatricula(longitud = 8) {
      const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
      let codigo = '';
      for (let i = 0; i < longitud; i++) {
        codigo += chars.charAt(Math.floor(Math.random() * chars.length));
      }
      return codigo;
    }
    const codigoMatricula = generarCodigoMatricula();
    const res = await fetch('http://localhost:4000/api/materiasGuardadas/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ cedula_estudiante: cedula, id_materia: idProducto, codigo_matricula: codigoMatricula })
    });
    if (!res.ok) throw new Error('Error al guardar la materia');
    alert('Materia guardada exitosamente');
    if (window.mostrarMateriasGuardadas) {
      window.mostrarMateriasGuardadas();
    }
  } catch (err) {
    alert('Error al guardar la materia');
  }
}

// Funcionalidad de listado de productos para cliente
function renderProductosTabla(productos) {
  const tbody = document.getElementById('tabla-materias-body');
  if (!tbody) return;
  tbody.innerHTML = '';
  productos.forEach((prod, idx) => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${idx + 1}</td>
      <td>${prod.nombre}</td>
      <td>${prod.codigo}</td>
      <td>${prod.descripcion}</td>
      <td>${prod.creditos}</td>
  <td><button class="btn-login" onclick="agregarAlCarrito('${prod._id}')">Guardar materia</button></td>
    `;
    tbody.appendChild(tr);
  });
}


// Obtener productos del backend y renderizar tabla
async function obtenerYListarProductos() {
  try {
  const res = await fetch('http://localhost:4000/api/materias');
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
