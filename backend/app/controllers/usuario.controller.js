// Controlador para la gestión de usuarios.
// Aquí se definen las funciones que manejan las operaciones CRUD y consultas relacionadas con usuarios.
// Puedes modificar la lógica, nombres de funciones o variables según la temática o cambios futuros en el proyecto.
import Usuario from '../models/usuario.js';

// Listar todos los usuarios
export const getAll = async (req, res) => {
  try {
    const usuarios = await Usuario.find();
    res.json(usuarios);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Crear usuario
export const create = async (req, res) => {
  try {
    const { email } = req.body;
    const existe = await Usuario.findOne({ email });
    if (existe) {
      return res.status(400).json({ error: 'Ya existe un usuario con ese correo.' });
    }
    const usuario = new Usuario(req.body);
    await usuario.save();
    res.json(usuario);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Actualizar usuario
export const update = async (req, res) => {
  try {
    const { id } = req.params;
    const usuario = await Usuario.findByIdAndUpdate(id, req.body, { new: true });
    if (!usuario) return res.status(404).json({ error: 'Usuario no encontrado' });
    res.json(usuario);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// Obtener usuario por id
export const getById = async (req, res) => {
  try {
    const { id } = req.params;
    const usuario = await Usuario.findById(id);
    if (!usuario) return res.status(404).json({ error: 'Usuario no encontrado' });
    res.json(usuario);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Eliminar usuario
export const remove = async (req, res) => {
  try {
    const { id } = req.params;
    const usuario = await Usuario.findByIdAndDelete(id);
    if (!usuario) return res.status(404).json({ error: 'Usuario no encontrado' });
    res.json({ message: 'Usuario eliminado' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

