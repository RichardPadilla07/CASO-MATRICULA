// Rutas para la gestión de usuarios.
// Aquí se definen los endpoints que permiten interactuar con los usuarios mediante el controlador correspondiente.
// Puedes modificar las rutas, nombres o lógica según la temática o cambios futuros en el proyecto.

// Importar las dependencias necesarias
import { Router } from 'express';
import { getAll, getById, create, update, remove } from '../controllers/usuario.controller.js';

const router = Router();

router.get('/', getAll);
router.get('/:id', getById);
router.post('/', create);
router.put('/:id', update);
router.delete('/:id', remove);

export default router;
