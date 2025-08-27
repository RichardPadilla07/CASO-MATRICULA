import http from 'k6/http';
import { check, sleep } from 'k6';

export let options = {
	vus: 10, // usuarios virtuales simultáneos
	iterations: 100 // total de peticiones
};

const API_URL = 'https://caso-matricula.onrender.com/api/materias';

export default function () {
	const idx = Math.floor(Math.random() * 10000);
	const materia = {
		nombre: `Materia${idx}`,
		codigo: `COD${idx}`,
		descripcion: `Descripción de la materia ${idx}`,
		creditos: Math.floor(Math.random() * 10) + 1
	};
	const res = http.post(API_URL, JSON.stringify(materia), {
		headers: { 'Content-Type': 'application/json' }
	});
	check(res, {
		'status is 201 or 200': r => r.status === 201 || r.status === 200
	});
	sleep(0.1);
}
