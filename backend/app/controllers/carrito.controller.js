// Controlador para la gestión de carritos.
// Aquí se definen las funciones que manejan las operaciones CRUD y consultas relacionadas con carritos.
// Puedes modificar la lógica, nombres de funciones o variables según la temática o cambios futuros en el proyecto.

import Carrito from '../models/carrito.js';

// Obtener todos los carritos
export const getAllCarritos = async (req, res) => {
    try {
        const carritos = await Carrito.find().populate('id_producto');
        res.json(carritos);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


// Obtener el carrito de un cliente con datos del producto y pedido
export const getCarritoByCliente = async (req, res) => {
    try {
        const carritos = await Carrito.find({ cedula_cliente: req.params.id }).populate('id_producto');
        res.json(carritos);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Crear un nuevo carrito
export const createCarrito = async (req, res) => {
    try {
        const data = {
            cedula_cliente: req.body.cedula_cliente || req.body.id_cliente,
            id_producto: req.body.id_producto,
            cantidad: req.body.cantidad
        };
        const carrito = new Carrito(data);
        await carrito.save();
        res.status(201).json({ message: 'Producto agregado al carrito', carrito });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Actualizar cantidad de producto en el carrito
export const updateCantidadCarrito = async (req, res) => {
    try {
        const id_carrito = req.params.id;
        const { cantidad } = req.body;
        const carrito = await Carrito.findByIdAndUpdate(id_carrito, { cantidad }, { new: true });
        if (!carrito) return res.status(404).json({ error: 'Carrito no encontrado' });
        res.json({ message: 'Cantidad actualizada', carrito });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Eliminar un carrito
export const deleteCarrito = async (req, res) => {
    try {
        const carrito = await Carrito.findByIdAndDelete(req.params.id);
        if (!carrito) return res.status(404).json({ error: 'Carrito no encontrado' });
        res.json({ message: 'Carrito eliminado' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

