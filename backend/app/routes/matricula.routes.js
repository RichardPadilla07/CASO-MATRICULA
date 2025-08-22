import express from "express";
import { createMatricula, getMatriculas, getMatriculaById, updateMatricula, deleteMatricula } from "../controllers/matricula.controller.js";

const router = express.Router();
router.post('/', createMatricula);
router.get('/', getMatriculas);
router.get('/:id', getMatriculaById);
router.put('/:id', updateMatricula);
router.delete('/:id', deleteMatricula);

export default router;
