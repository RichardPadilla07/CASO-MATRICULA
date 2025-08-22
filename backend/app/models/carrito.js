// Modelo para la gestión de carritos.
// Aquí se definen las funciones y estructura para interactuar con la tabla de carritos en la base de datos.
// Puedes modificar la lógica, nombres de funciones, variables o estructura según la temática o cambios futuros en el proyecto.

import mongoose from "mongoose";

const carritoSchema = new mongoose.Schema({
    cedula_cliente: { type: Number, required: true },
    id_producto: { type: mongoose.Schema.Types.ObjectId, ref: "Producto", required: true },
    cantidad: { type: Number, required: true },
    fecha_agregado: { type: Date, default: Date.now }
});

const Carrito = mongoose.model("Carrito", carritoSchema);



export default Carrito;


