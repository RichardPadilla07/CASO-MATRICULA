// Obtener todas las matrículas de un estudiante por cédula
import Estudiante from '../models/estudiante.js';
import Matricula from "../models/matricula.js";
import Materia from "../models/materia.js";


export const getMatriculasByCedula = async (req, res) => {
  try {
    const cedula = req.params.cedula;
    const estudiante = await Estudiante.findOne({ cedula });
    if (!estudiante) return res.status(404).json({ error: 'Estudiante no encontrado' });
    const matriculas = await Matricula.find({ id_estudiante: estudiante._id })
      .populate('id_materia')
      .populate('id_estudiante');
    res.json(matriculas);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


export const createMatricula = async (req, res) => {
  try {
    const { id_materia } = req.body;
    // Verificar que la materia exista
    const materia = await Materia.findById(id_materia);
    if (!materia) {
      return res.status(404).json({ error: "No se encontró la materia" });
    }
    const matricula = new Matricula(req.body);
    await matricula.save();
    res.status(201).json(matricula);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const getMatriculas = async (req, res) => {
  try {
    const matriculas = await Matricula.find().populate("id_estudiante").populate("id_materia");
    res.json(matriculas);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getMatriculaById = async (req, res) => {
  try {
    const matricula = await Matricula.findById(req.params.id).populate("id_estudiante").populate("id_materia");
    if (!matricula) return res.status(404).json({ error: "Matricula not found" });
    res.json(matricula);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateMatricula = async (req, res) => {
  try {
    const matricula = await Matricula.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!matricula) return res.status(404).json({ error: "Matricula not found" });
    res.json(matricula);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const deleteMatricula = async (req, res) => {
  try {
    const matricula = await Matricula.findByIdAndDelete(req.params.id);
    if (!matricula) return res.status(404).json({ error: "Matricula not found" });
    res.json({ message: "Matricula deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const actualizarEstado = async (req, res) => {
  try {
    const { id } = req.params;
    const { estado } = req.body;
    if (!['pendiente', 'matriculado', 'anulado'].includes(estado)) {
      return res.status(400).json({ error: 'Estado inválido' });
    }
    const matricula = await Matricula.findByIdAndUpdate(id, { estado }, { new: true })
      .populate('id_estudiante')
      .populate('id_materia');
    if (!matricula) return res.status(404).json({ error: 'Matricula not found' });
    res.json(matricula);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
