import http from 'k6/http';
import { check, sleep } from 'k6';

export let options = {
	vus: 10, // usuarios virtuales simultáneos
	iterations: 100 // total de peticiones
};

const API_URL = 'https://caso-matricula.onrender.com/api/materias';

export default function () {
	const res = http.get(API_URL);
	check(res, {
		'status is 200': r => r.status === 200
	});
	sleep(0.1);
}
