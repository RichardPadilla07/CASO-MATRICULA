import Matricula from "../models/matricula.js";

export const createMatricula = async (req, res) => {
  try {
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
