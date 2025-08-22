// Script para la gestión del perfil del cliente.
// Aquí se definen funciones para ver y actualizar el perfil del cliente.
// Puedes modificar la lógica, nombres de funciones o variables según la temática o cambios futuros en el proyecto.

// Renderizar perfil del cliente
function renderPerfilCliente(datosCliente) {
    const perfilDiv = document.getElementById('datos-perfil');
    if (!perfilDiv || !datosCliente) return;
    perfilDiv.innerHTML = `
    <strong>Cédula:</strong> ${datosCliente.cedula || ''}<br>
    <strong>Nombre:</strong> ${datosCliente.nombre || ''}<br>
    <strong>Apellido:</strong> ${datosCliente.apellido || ''}<br>
    <strong>Email:</strong> ${datosCliente.email || ''}<br>
    <strong>Ciudad:</strong> ${datosCliente.ciudad || ''}<br>
    <strong>Dirección:</strong> ${datosCliente.direccion || ''}<br>
    <strong>Teléfono:</strong> ${datosCliente.telefono || ''}<br>
    <strong>Fecha nacimiento:</strong> ${datosCliente.fecha_nacimiento ? datosCliente.fecha_nacimiento.substring(0, 10) : ''}
  `;
}

// Renderizar saludo del cliente
function renderSaludoCliente(datosCliente) {
    const saludo = document.getElementById('cliente-nombre');
    if (saludo && datosCliente) {
        saludo.textContent = `${datosCliente.nombre || ''} ${datosCliente.apellido || ''}`;
    }
}


// Lógica de navegación y visualización inicial
document.addEventListener('DOMContentLoaded', () => {

    // Referencias a las secciones
    const seccionPerfil = document.getElementById('seccion-perfil');
    const seccionListar = document.getElementById('seccion-listar');
    const seccionCarrito = document.getElementById('seccion-carrito');
    const seccionPedidos = document.getElementById('seccion-pedidos');

    // Referencias a los botones
    const btnPerfil = document.getElementById('btn-perfil');
    const btnListar = document.getElementById('btn-listar');
    const btnCarrito = document.getElementById('btn-carrito');
    const btnPedidos = document.getElementById('btn-pedidos');

    // Función para mostrar una sección específica
    function mostrarSeccion(seccion) {
        seccionPerfil.style.display = 'none';
        seccionListar.style.display = 'none';
        seccionCarrito.style.display = 'none';
        seccionPedidos.style.display = 'none';
        seccion.style.display = 'block';
    }

    // Eventos de los botones
    btnPerfil.addEventListener('click', () => mostrarSeccion(seccionPerfil));
    btnListar.addEventListener('click', () => mostrarSeccion(seccionListar));
    btnCarrito.addEventListener('click', () => mostrarSeccion(seccionCarrito));
    btnPedidos.addEventListener('click', () => mostrarSeccion(seccionPedidos));

    // Mostrar perfil al iniciar
    mostrarSeccion(seccionPerfil);
});

// Obtener datos del cliente y mostrar perfil
async function obtenerDatosCliente() {
    // Obtener cédula del cliente
    const cedula = localStorage.getItem('cedulaCliente') || localStorage.getItem('clienteCedula');
    if (!cedula) return;
    try {
        const res = await fetch(`http://localhost:3000/api/clientes/${cedula}`);
        if (!res.ok) throw new Error('Error al obtener datos');
        const datosCliente = await res.json();
        renderPerfilCliente(datosCliente);
        renderSaludoCliente(datosCliente);
        window.datosCliente = datosCliente;
    } catch (err) {
        alert('Error al obtener datos del cliente');
    }
}

// Mostrar modal para actualizar perfil
function mostrarModalActualizar() {
    const modal = document.getElementById('modal-actualizar-perfil');
    const form = document.getElementById('form-actualizar-perfil');
    if (!window.datosCliente) return;
    Object.keys(window.datosCliente).forEach(key => {
        if (form[key]) form[key].value = window.datosCliente[key] || '';
    });
    modal.style.display = 'flex';
}

// Actualizar perfil
async function actualizarPerfil(e) {
    e.preventDefault();
    const cedula = localStorage.getItem('cedulaCliente') || localStorage.getItem('clienteCedula');
    const form = e.target;
    const datos = {
        nombre: form.nombre.value,
        apellido: form.apellido.value,
        email: form.email.value,
        ciudad: form.ciudad.value,
        direccion: form.direccion.value,
        telefono: form.telefono.value,
        fecha_nacimiento: form.fecha_nacimiento.value,
        passwordCliente: form.password.value
    };
    try {
        const res = await fetch(`http://localhost:3000/api/clientes/${cedula}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(datos)
        });
        if (!res.ok) throw new Error('Error al actualizar');
        document.getElementById('modal-actualizar-perfil').style.display = 'none';
        obtenerDatosCliente();
        alert('Perfil actualizado correctamente');
    } catch (err) {
        alert('Error al actualizar perfil');
    }
}

// Eventos
document.addEventListener('DOMContentLoaded', () => {
    obtenerDatosCliente();
    document.getElementById('btn-actualizar-perfil').addEventListener('click', mostrarModalActualizar);
    document.getElementById('form-actualizar-perfil').addEventListener('submit', actualizarPerfil);
    document.getElementById('btn-cerrar-modal').addEventListener('click', () => {
        document.getElementById('modal-actualizar-perfil').style.display = 'none';
    });
});
