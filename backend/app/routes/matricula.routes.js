import express from "express";
import { createMatricula, getMatriculas, getMatriculaById, updateMatricula, deleteMatricula, actualizarEstado } from "../controllers/matricula.controller.js";
import { getMatriculasByCedula } from '../controllers/matricula.controller.js';


const router = express.Router();
router.post('/', createMatricula);
router.get('/', getMatriculas);
router.get('/:id', getMatriculaById);
router.put('/:id', updateMatricula);
router.delete('/:id', deleteMatricula);
router.get('/estudiante/:cedula', getMatriculasByCedula);
router.put('/:id/estado', actualizarEstado);


export default router;
