// Script para la gestión de pedidos del cliente.
// Aquí se definen funciones para crear, buscar y mostrar pedidos.
// Puedes modificar la lógica, nombres de funciones o variables según la temática o cambios futuros en el proyecto.

// Pintar cédula del cliente
function pintarCedulaCliente() {
  setTimeout(() => {
    const cedulaInput = document.getElementById('cedula_cliente');
    if (!window.clienteCedula) {
      window.clienteCedula = localStorage.getItem('cedulaCliente') || localStorage.getItem('clienteCedula');
    }
    const cedula = window.clienteCedula;
    if (cedulaInput && cedula) {
      cedulaInput.value = cedula;
      cedulaInput.readOnly = true;
    } else if (cedulaInput) {
      cedulaInput.value = '';
    }
  }, 100);
}


// Buscar materia guardada por código de matrícula
async function buscarProducto() {
  const codigoMatricula = document.getElementById('codigo_producto').value.trim();
  const cedula = document.getElementById('cedula_cliente').value.trim();
  if (!codigoMatricula || !cedula) return;
  try {
    // Obtener todas las materias guardadas del estudiante
    const res = await fetch(`http://localhost:3000/api/materiasGuardadas/${cedula}`);
    if (!res.ok) throw new Error('No se pudo consultar materias guardadas');
    const materias = await res.json();
    // Buscar la materia por código de matrícula
    const materia = materias.find(m => m.codigo_matricula === codigoMatricula);
    if (materia) {
      mostrarDatosMateriaGuardada(materia);
    } else {
      document.getElementById('productoMsg').textContent = 'Materia no guardada';
      document.getElementById('productoMsg').style.display = 'block';
      document.getElementById('datosProducto').style.display = 'none';
    }
  } catch (err) {
    document.getElementById('productoMsg').textContent = 'Error al buscar materia';
    document.getElementById('productoMsg').style.display = 'block';
    document.getElementById('datosProducto').style.display = 'none';
  }
}

// Mostrar datos de la materia guardada encontrada
function mostrarDatosMateriaGuardada(materia) {
  document.getElementById('nombreProducto').textContent = materia.nombre;
  document.getElementById('codigoMateria').textContent = materia.codigo_materia;
  document.getElementById('creditosMateria').textContent = materia.creditos;
  document.getElementById('codigoMatricula').textContent = materia.codigo_matricula;
  document.getElementById('datosProducto').style.display = 'block';
  document.getElementById('productoMsg').style.display = 'none';
}


// Mostrar datos del producto
function mostrarDatosProducto(producto) {
  document.getElementById('nombreProducto').textContent = producto.nombre;
  document.getElementById('categoriaProducto').textContent = producto.categoria;
  document.getElementById('precioProducto').textContent = producto.precio;
  document.getElementById('stockProducto').textContent = producto.stock;
  document.getElementById('datosProducto').style.display = 'block';
  document.getElementById('productoMsg').style.display = 'none';
}

// Crear pedido
async function crearPedido(e) {
  e.preventDefault();
  const cedula = document.getElementById('cedula_cliente').value;
  const codigo = document.getElementById('codigo_producto').value;
  const cantidad = document.getElementById('cantidadProducto').value;
  try {
    // Obtener producto para el código
    const resProd = await fetch(`http://localhost:3000/api/productos/codigo/${codigo}`);
    if (!resProd.ok) throw new Error('Producto no encontrado');
    const producto = await resProd.json();
    // Generar un código de pedido único como número
    const codigo_pedido = Date.now();
    const pedido = {
      codigo_pedido,
      cedula_cliente: cedula,
      codigo_producto: producto.codigo,
      cantidad: cantidad
    };
    const res = await fetch('http://localhost:3000/api/pedidos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(pedido)
    });
    if (!res.ok) throw new Error('Error al crear pedido');
    window.alert('¡Pedido creado exitosamente!');
    // Restablecer formulario y ocultar producto buscado
    document.getElementById('codigo_producto').value = '';
    document.getElementById('cantidadProducto').value = 1;
    document.getElementById('datosProducto').style.display = 'none';
    mostrarPedidosCliente();
  } catch (err) {
    alert('Error al crear pedido');
  }
}

// Mostrar pedidos del cliente
async function mostrarPedidosCliente() {
  const cedula = document.getElementById('cedula_cliente').value;
  try {
    // Cambiar la ruta para obtener matrículas por cédula
    const res = await fetch(`http://localhost:3000/api/matricula/${cedula}`);
    if (!res.ok) throw new Error('Error al obtener matrículas');
    const matriculas = await res.json();
    renderPedidosTabla(matriculas);
  } catch (err) {
    console.error('Error al mostrar matrículas:', err);
  }
}

// Renderizar tabla de pedidos
function renderPedidosTabla(pedidos) {
  const tbody = document.querySelector('#tablaPedidos tbody');
  tbody.innerHTML = '';
  pedidos.forEach(ped => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${ped._id}</td>
      <td>${ped.codigo_pedido || ''}</td>
      <td>${ped.cedula_cliente}</td>
      <td>${ped.codigo_producto || ''}</td>
      <td>${ped.cantidad}</td>
      <td>${ped.nombre || ''}</td>
      <td>${ped.categoria || ''}</td>
      <td>${ped.precio || ''}</td>
      <td>${ped.stock || ''}</td>
      <td>${ped.estado || 'pendiente'}</td>
    `;
    tbody.appendChild(tr);
  });
}

// Eventos
document.addEventListener('DOMContentLoaded', () => {
  pintarCedulaCliente();
  document.getElementById('buscarProducto').addEventListener('click', buscarProducto);
  document.getElementById('pedidoForm').addEventListener('submit', crearPedido);
  document.getElementById('btn-pedidos').addEventListener('click', mostrarPedidosCliente);
});
