// Buscar materia por código
export const getMateriaByCodigo = async (req, res) => {
  try {
    const materia = await Materia.findOne({ codigo: req.params.codigo });
    if (!materia) return res.status(404).json({ error: 'Materia not found' });
    res.json(materia);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
import Materia from "../models/materia.js";

export const createMateria = async (req, res) => {
  try {
    const materia = new Materia(req.body);
    await materia.save();
    res.status(201).json(materia);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const getMaterias = async (req, res) => {
  try {
    const materias = await Materia.find();
    res.json(materias);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getMateriaById = async (req, res) => {
  try {
    const materia = await Materia.findById(req.params.id);
    if (!materia) return res.status(404).json({ error: "Materia not found" });
    res.json(materia);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateMateria = async (req, res) => {
  try {
    const materia = await Materia.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!materia) return res.status(404).json({ error: "Materia not found" });
    res.json(materia);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const deleteMateria = async (req, res) => {
  try {
    const materia = await Materia.findByIdAndDelete(req.params.id);
    if (!materia) return res.status(404).json({ error: "Materia not found" });
    res.json({ message: "Materia deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
