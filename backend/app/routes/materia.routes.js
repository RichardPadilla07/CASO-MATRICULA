import express from "express";
import { createMateria, getMaterias, getMateriaById, updateMateria, deleteMateria } from "../controllers/materia.controller.js";
import { getMateriaByCodigo } from '../controllers/materia.controller.js';

const router = express.Router();
router.post('/', createMateria);
router.get('/', getMaterias);
router.get('/:id', getMateriaById);
router.get('/codigo/:codigo', getMateriaByCodigo);
router.put('/:id', updateMateria);
router.delete('/:id', deleteMateria);

export default router;
