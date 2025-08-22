// Script principal para la navegación y gestión de secciones en el panel de administración.
// Aquí se definen funciones para mostrar secciones y cargar datos en el panel admin.
// Puedes modificar la lógica, nombres de funciones o variables según la temática o cambios futuros en el proyecto.
// Navegación de secciones en el panel admin

// Inicializar eventos
document.addEventListener('DOMContentLoaded', () => {
  const btnPerfil = document.getElementById('btn-perfil');
  const btnListar = document.getElementById('btn-listar');
  const btnCrear = document.getElementById('btn-crear');
  const btnPedidos = document.getElementById('btn-pedidos');
  const seccionPerfil = document.getElementById('seccion-perfil');
  const seccionListar = document.getElementById('seccion-listar');
  const seccionCrear = document.getElementById('seccion-crear');
  const seccionPedidos = document.getElementById('seccion-pedidos');

  // Mostrar sección
  function mostrarSeccion(seccion) {
    seccionPerfil.style.display = 'none';
    seccionListar.style.display = 'none';
    seccionCrear.style.display = 'none';
    seccionPedidos.style.display = 'none';
    seccion.style.display = 'block';
  }

  // Inicializar eventos
  btnPerfil.onclick = () => mostrarSeccion(seccionPerfil);
  btnListar.onclick = () => mostrarSeccion(seccionListar);
  btnCrear.onclick = () => mostrarSeccion(seccionCrear);
  btnPedidos.onclick = () => {
    mostrarSeccion(seccionPedidos);
    if (window.obtenerPedidos) window.obtenerPedidos();
  };

  // Mostrar perfil por defecto
  mostrarSeccion(seccionPerfil);

  // Exponer para otros módulos si lo necesitan
  window.mostrarSeccion = mostrarSeccion;
  window.seccionListar = seccionListar;

  // Carrusel para listar producto/cliente
  const slideListarProducto = document.getElementById('slide-listar-producto');
  const slideListarCliente = document.getElementById('slide-listar-cliente');
  const btnListarIzq = document.getElementById('btn-carrusel-listar-izq');
  const btnListarDer = document.getElementById('btn-carrusel-listar-der');
  let listarIndex = 0; // 0: producto, 1: cliente

  // Mostrar slide de listar
  function mostrarSlideListar(idx) {
    if (idx === 0) {
      slideListarProducto.style.display = '';
      slideListarCliente.style.display = 'none';
    } else {
      slideListarProducto.style.display = 'none';
      slideListarCliente.style.display = '';
    }
    listarIndex = idx;
  }
  btnListarIzq.onclick = () => mostrarSlideListar(0);
  btnListarDer.onclick = () => mostrarSlideListar(1);
  mostrarSlideListar(0);

  // Carrusel para crear producto/cliente
  const slideProducto = document.getElementById('slide-crear-producto');
  const slideCliente = document.getElementById('slide-crear-cliente');
  const btnIzq = document.getElementById('btn-carrusel-izq');
  const btnDer = document.getElementById('btn-carrusel-der');
  let crearIndex = 0; // 0: producto, 1: cliente

  // Mostrar slide de crear
  function mostrarSlideCrear(idx) {
    if (idx === 0) {
      slideProducto.style.display = '';
      slideCliente.style.display = 'none';
    } else {
      slideProducto.style.display = 'none';
      slideCliente.style.display = '';
    }
    crearIndex = idx;
  }
  btnIzq.onclick = () => mostrarSlideCrear(0);
  btnDer.onclick = () => mostrarSlideCrear(1);
  mostrarSlideCrear(0);
});
