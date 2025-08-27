// Modelo para la gestión de clientes.
// Aquí se define la estructura y configuración para la tabla de clientes en la base de datos.
// Puedes modificar la estructura, nombres de campos o lógica según la temática o cambios futuros en el proyecto.

import mongoose from "mongoose";

const estudianteSchema = new mongoose.Schema({
  cedula: { type: Number, required: true, unique: true },
  nombre: { type: String, required: true, maxlength: 10 },
  apellido: { type: String, required: true, maxlength: 10 },
  ciudad: { type: String, required: true, maxlength: 10 },
  email: { type: String, required: true, unique: true, maxlength: 30 },
  direccion: { type: String, maxlength: 20 },
  telefono: { type: String, maxlength: 10 },
  fecha_nacimiento: { type: Date },
  passwordEstudiante: { type: String, maxlength: 20 }
});

const Estudiante = mongoose.model("Estudiante", estudianteSchema);

export default Estudiante;