import http from 'k6/http';
import { sleep } from 'k6';

export let options = {
  vus: 10, // usuarios virtuales simultáneos
  iterations: 100 // total de peticiones (100 estudiantes)
};

const BASE_URL = 'https://caso-matricula.onrender.com/api/estudiantes';

function generarEstudiante(i) {
  return {
    cedula: 100000 + i,
    nombre: `Est${i}`,
    apellido: `Ape${i}`,
    ciudad: `Ciudad${i}`,
    email: `estudiante${i}@correo.com`,
    direccion: `Calle Falsa ${i}`,
    telefono: `099${Math.floor(100000 + Math.random() * 899999)}`,
    fecha_nacimiento: '2000-01-01', // puedes randomizar si lo deseas
    passwordEstudiante: `pass${i}`
  };
}

export default function () {
  const i = Math.floor(Math.random() * 100) + 1;
  const estudiante = generarEstudiante(i);
  const res = http.post(BASE_URL, JSON.stringify(estudiante), {
    headers: { 'Content-Type': 'application/json' }
  });
  // Validación opcional
  // if (res.status !== 200 && res.status !== 201) {
  //   console.error('Error:', res.status, res.body);
  // }
  sleep(0.1);
}
