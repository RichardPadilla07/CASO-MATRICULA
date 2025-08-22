// Mostrar materias guardadas del estudiante
async function mostrarMateriasGuardadas() {
  const cedula = localStorage.getItem('cedulaCliente');
  const contenedor = document.getElementById('materias-guardadas-body');
  if (!cedula || !contenedor) return;
  contenedor.innerHTML = '';
  try {
    const res = await fetch(`http://localhost:3000/api/materiasGuardadas/${cedula}`);
    const materias = await res.json();
    if (!materias.length) {
      contenedor.innerHTML = '<tr><td colspan="6">No tienes materias guardadas.</td></tr>';
      return;
    }
    materias.forEach((mat, idx) => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td>${idx + 1}</td>
        <td>${mat.nombre || ''}</td>
        <td>${mat.creditos || ''}</td>
        <td>${mat.codigo_materia || ''}</td>
        <td>${mat.codigo_matricula || ''}</td>
        <td><button class="btn-eliminar" onclick="eliminarMateriaGuardada('${mat.id_materia}')">Eliminar</button></td>
      `;
      contenedor.appendChild(tr);
    });
  } catch (err) {
    contenedor.innerHTML = '<tr><td colspan="5">Error al cargar materias guardadas.</td></tr>';
  }
}

document.addEventListener('DOMContentLoaded', () => {
// Eliminar materia guardada
async function eliminarMateriaGuardada(id_materia) {
  const cedula = localStorage.getItem('cedulaCliente');
  if (!id_materia || !cedula) return;
  if (!confirm('¿Seguro que deseas eliminar esta materia guardada?')) return;
  try {
    const res = await fetch('http://localhost:3000/api/materiasGuardadas/', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ cedula_estudiante: cedula, id_materia })
    });
    if (res.ok) {
      mostrarMateriasGuardadas();
    } else {
      alert('No se pudo eliminar la materia.');
    }
  } catch (err) {
    alert('Error al eliminar la materia.');
  }
}
  if (document.getElementById('materias-guardadas-body')) {
    mostrarMateriasGuardadas();
  }
});
