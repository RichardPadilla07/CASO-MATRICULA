// Modelo para la gestión de usuarios.
// Aquí se define la estructura y configuración para la tabla de usuarios en la base de datos.
// Puedes modificar la estructura, nombres de campos o lógica según la temática o cambios futuros en el proyecto.

import mongoose from "mongoose";

const usuarioSchema = new mongoose.Schema({
  nombre: { type: String, required: true, maxlength: 10 },
  apellido: { type: String, required: true, maxlength: 10 },
  email: { type: String, required: true, unique: true, maxlength: 30 },
  password: { type: String, required: true, maxlength: 30 }
});

const Usuario = mongoose.model("Usuario", usuarioSchema);

export default Usuario;