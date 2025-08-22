// Rutas para la gestión de clientes.
// Aquí se definen los endpoints que permiten interactuar con los clientes mediante el controlador correspondiente.
// Puedes modificar las rutas, nombres o lógica según la temática o cambios futuros en el proyecto.

// Importamos las dependecias necesarios 
import { Router } from 'express';
import { getByCedula, getAll, create, update, remove } from '../controllers/estudiante.controller.js';

const router = Router();

router.get('/:cedula', getByCedula);
router.get('/', getAll);
router.post('/', create);
router.put('/:cedula', update);
router.delete('/:cedula', remove);

export default router;
