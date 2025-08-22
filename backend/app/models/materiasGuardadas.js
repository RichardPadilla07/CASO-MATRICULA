// Modelo para la gestión de carritos.
// Aquí se definen las funciones y estructura para interactuar con la tabla de carritos en la base de datos.
// Puedes modificar la lógica, nombres de funciones, variables o estructura según la temática o cambios futuros en el proyecto.

import mongoose from "mongoose";

const materiasGuardadasSchema = new mongoose.Schema({
  cedula_estudiante: { type: Number, required: true },
  materias: [{ type: mongoose.Schema.Types.ObjectId, ref: "Materia" }],
  codigo_matricula: { type: String },
  fecha_guardado: { type: Date, default: Date.now }
});

const MateriasGuardadas = mongoose.model("MateriasGuardadas", materiasGuardadasSchema);

export default MateriasGuardadas;