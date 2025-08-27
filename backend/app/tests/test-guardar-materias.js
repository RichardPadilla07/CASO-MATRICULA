import http from 'k6/http';
import { sleep } from 'k6';

export let options = {
  vus: 10, // usuarios virtuales simultáneos
  iterations: 100 // total de peticiones (100 guardados)
};

const BASE_URL = 'https://caso-matricula.onrender.com/api/materiasGuardadas';

// Valores simulados para la prueba
const cedula_estudiante = 100001; // Cambia por un valor real si lo tienes
const id_materia = '64e0b2f2c2a4e2a1b8c1d2e3'; // Cambia por un ObjectId real de materia

function generarGuardado(i) {
  return {
    cedula_estudiante,
    id_materia,
    codigo_matricula: `MAT${i}`
  };
}

export default function () {
  const i = Math.floor(Math.random() * 100) + 1;
  const guardado = generarGuardado(i);
  const res = http.post(BASE_URL, JSON.stringify(guardado), {
    headers: { 'Content-Type': 'application/json' }
  });
  // Validación opcional
  // if (res.status !== 200 && res.status !== 201) {
  //   console.error('Error:', res.status, res.body);
  // }
  sleep(0.1);
}
