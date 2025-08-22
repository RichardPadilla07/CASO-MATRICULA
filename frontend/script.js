// Utilidades para mostrar/ocultar formularios.
function hideAllForms() {
  document.getElementById('admin-login').classList.add('hidden');
  document.getElementById('admin-register').classList.add('hidden');
  document.getElementById('cliente-login').classList.add('hidden');
  document.getElementById('cliente-register').classList.add('hidden');
}
function showAdminLogin() {
  hideAllForms();
  document.getElementById('role-select').style.display = 'none';
  document.getElementById('admin-login').classList.remove('hidden');
}
function showAdminRegister() {
  hideAllForms();
  document.getElementById('admin-register').classList.remove('hidden');
}
function showClienteLogin() {
  hideAllForms();
  document.getElementById('role-select').style.display = 'none';
  document.getElementById('cliente-login').classList.remove('hidden');
}
function showClienteRegister() {
  hideAllForms();
  document.getElementById('cliente-register').classList.remove('hidden');
}
// Notificaciones
function showNotification(id, message, type) {
  const notif = document.getElementById(id);
  if (!notif) return;
  notif.textContent = message;
  notif.className = 'notification ' + type;
  notif.style.display = 'block';
  setTimeout(() => { notif.style.display = 'none'; }, 4000);
}
// Validaciones y peticiones
async function handleAdminLogin(e) {
  e.preventDefault();
  const email = document.getElementById('admin-email').value.trim();
  const password = document.getElementById('admin-password').value.trim();
  if (!email || !password) {
    showNotification('admin-login-notif', 'Completa todos los campos.', 'error');
    return false;
  }
  // Petición al backend
  try {
    const res = await fetch('http://localhost:3000/api/usuarios', {
      method: 'GET'
    });
    const usuarios = await res.json();
    const user = usuarios.find(u => u.email === email && u.password === password);
    if (user) {
      showNotification('admin-login-notif', 'Login exitoso. Redirigiendo...', 'success');
      // Guardar el _id real del usuario admin en localStorage
      localStorage.setItem('adminId', user._id);
      setTimeout(() => { window.location.href = 'admin.html'; }, 1500);
    } else {
      showNotification('admin-login-notif', 'Credenciales incorrectas.', 'error');
    }
  } catch (err) {
    showNotification('admin-login-notif', 'Error de conexión.', 'error');
  }
  return false;
}
async function handleAdminRegister(e) {
  e.preventDefault();
  const nombre = document.getElementById('admin-nombre').value.trim();
  const apellido = document.getElementById('admin-apellido').value.trim();
  const email = document.getElementById('admin-reg-email').value.trim();
  const password = document.getElementById('admin-reg-password').value.trim();
  if (!nombre || !apellido || !email || !password) {
    showNotification('admin-register-notif', 'Completa todos los campos.', 'error');
    return false;
  }
  try {
    const res = await fetch('http://localhost:3000/api/usuarios', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nombre, apellido, email, password })
    });
    if (res.ok) {
      showNotification('admin-register-notif', 'Registro exitoso. Inicia sesión.', 'success');
      setTimeout(() => { showAdminLogin(); }, 1500);
    } else {
      const data = await res.json();
      showNotification('admin-register-notif', data.error || 'Error al registrar.', 'error');
    }
  } catch (err) {
    showNotification('admin-register-notif', 'Error de conexión.', 'error');
  }
  return false;
}
async function handleClienteLogin(e) {
  e.preventDefault();
  const cedula = document.getElementById('cliente-cedula').value.trim();
  const passwordCliente = document.getElementById('cliente-password').value.trim();
  if (!cedula || !passwordCliente) {
    showNotification('cliente-login-notif', 'Completa todos los campos.', 'error');
    return false;
  }
  try {
    const res = await fetch('http://localhost:3000/api/clientes', {
      method: 'GET'
    });
    const clientes = await res.json();
    const cliente = clientes.find(c => c.cedula == cedula && c.passwordCliente === passwordCliente);
    if (cliente) {
      showNotification('cliente-login-notif', 'Login exitoso. Redirigiendo...', 'success');
      localStorage.setItem('cedulaCliente', cliente.cedula);
      setTimeout(() => { window.location.href = 'cliente.html'; }, 1500);
    } else {
      showNotification('cliente-login-notif', 'Credenciales incorrectas.', 'error');
    }
  } catch (err) {
    showNotification('cliente-login-notif', 'Error de conexión.', 'error');
  }
  return false;
}
async function handleClienteRegister(e) {
  e.preventDefault();
  const cedula = document.getElementById('cliente-cedula-reg').value.trim();
  const nombre = document.getElementById('cliente-nombre').value.trim();
  const apellido = document.getElementById('cliente-apellido').value.trim();
  const ciudad = document.getElementById('cliente-ciudad').value.trim();
  const email = document.getElementById('cliente-email').value.trim();
  const direccion = document.getElementById('cliente-direccion').value.trim();
  const telefono = document.getElementById('cliente-telefono').value.trim();
  const fecha_nacimiento = document.getElementById('cliente-fecha-nacimiento').value;
  const passwordCliente = document.getElementById('cliente-reg-password').value.trim();
  if (!cedula || !nombre || !apellido || !ciudad || !email || !passwordCliente) {
    showNotification('cliente-register-notif', 'Completa los campos obligatorios.', 'error');
    return false;
  }
  try {
    const res = await fetch('http://localhost:3000/api/clientes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ cedula, nombre, apellido, ciudad, email, direccion, telefono, fecha_nacimiento, passwordCliente })
    });
    if (res.ok) {
      showNotification('cliente-register-notif', 'Registro exitoso. Inicia sesión.', 'success');
      setTimeout(() => { showClienteLogin(); }, 1500);
    } else {
      let errorMsg = 'Error al registrar.';
      try {
        const data = await res.json();
        if (typeof data.error === 'string') errorMsg = data.error;
        else if (typeof data.error === 'object' && data.error.message) errorMsg = data.error.message;
      } catch (e) {}
      showNotification('cliente-register-notif', errorMsg, 'error');
    }
  } catch (err) {
    showNotification('cliente-register-notif', 'Error de conexión.', 'error');
  }
  return false;
}



