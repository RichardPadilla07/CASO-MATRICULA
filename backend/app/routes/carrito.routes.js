// Rutas para la gestión de carritos.
// Aquí se definen los endpoints que permiten interactuar con los carritos mediante el controlador correspondiente.
// Puedes modificar las rutas, nombres o lógica según la temática o cambios futuros en el proyecto.

// Importar las dependencias necesarias
import { Router } from 'express';
import { getAllCarritos, getCarritoByCliente, createCarrito, updateCantidadCarrito, deleteCarrito } from '../controllers/carrito.controller.js';

const router = Router();

router.get('/', getAllCarritos);
router.get('/:id', getCarritoByCliente);
router.post('/', createCarrito);
router.put('/:id', updateCantidadCarrito);
router.delete('/:id', deleteCarrito);

export default router;
