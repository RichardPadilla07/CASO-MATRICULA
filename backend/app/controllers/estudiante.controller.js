// Controlador para la gestión de clientes.
// Aquí se definen las funciones que manejan las operaciones CRUD y consultas relacionadas con clientes.
// Puedes modificar la lógica, nombres de funciones o variables según la temática o cambios futuros en el proyecto.

import Cliente from '../models/estudiante.js';

// Obtener cliente por cédula
export const getByCedula = async (req, res) => {
  try {
    const { cedula } = req.params;
    const cliente = await Cliente.findOne({ cedula });
    if (!cliente) return res.status(404).json({ error: 'Cliente no encontrado' });
    res.json(cliente);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Obtener todos los clientes
export const getAll = async (req, res) => {
  try {
    const clientes = await Cliente.find();
    res.json(clientes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Crear un nuevo cliente
export const create = async (req, res) => {
  try {
    const { cedula, email } = req.body;
    const existe = await Cliente.findOne({ $or: [{ cedula }, { email }] });
    if (existe) {
      return res.status(400).json({ error: 'Ya existe un cliente con esa cédula o correo.' });
    }
    // Encriptar la contraseña antes de guardar
    const bcrypt = await import('bcryptjs');
    let body = { ...req.body };
    if (body.passwordEstudiante) {
      const salt = await bcrypt.genSalt(10);
      body.passwordEstudiante = await bcrypt.hash(body.passwordEstudiante, salt);
    }
    const cliente = new Cliente(body);
    await cliente.save();
    res.json(cliente);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Actualizar un cliente
export const update = async (req, res) => {
  try {
    const { cedula } = req.params;
    const cliente = await Cliente.findOneAndUpdate({ cedula }, req.body, { new: true });
    if (!cliente) return res.status(404).json({ error: 'Cliente no encontrado' });
    res.json(cliente);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Eliminar un cliente
export const remove = async (req, res) => {
  try {
    const { cedula } = req.params;
    const cliente = await Cliente.findOneAndDelete({ cedula });
    if (!cliente) return res.status(404).json({ error: 'Cliente no encontrado' });
    res.json({ message: 'Cliente eliminado' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
