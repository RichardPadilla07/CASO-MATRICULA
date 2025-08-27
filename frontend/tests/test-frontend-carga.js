import http from 'k6/http';
import { check, sleep } from 'k6';

export let options = {
  vus: 50, // usuarios virtuales
  duration: '30s', // duración de la prueba
};

export default function () {
  // Cambia la URL por la de tu frontend en Netlify
  let res = http.get('https://casomatriculafrontend.netlify.app/');
  check(res, { 'status is 200': (r) => r.status === 200 });
  sleep(1);
}