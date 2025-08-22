import { Router } from 'express';
import { getMateriasGuardadasByEstudiante, guardarMateria, eliminarMateriaGuardada } from '../controllers/materiasGuardadas.controller.js';

const router = Router();

// Obtener todas las materias guardadas de un estudiante
router.get('/:cedula', getMateriasGuardadasByEstudiante);

// Guardar una materia para un estudiante
router.post('/', guardarMateria);

// Eliminar una materia guardada
router.delete('/', eliminarMateriaGuardada);

export default router;
