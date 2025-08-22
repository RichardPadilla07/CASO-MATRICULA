import mongoose from "mongoose";

const matriculaSchema = new mongoose.Schema({
  codigo: String,
  descripcion: String,
  id_estudiante: { type: mongoose.Schema.Types.ObjectId, ref: "Estudiante" },
  id_materia: { type: mongoose.Schema.Types.ObjectId, ref: "Materia" }
});

export default mongoose.model("Matricula", matriculaSchema);
