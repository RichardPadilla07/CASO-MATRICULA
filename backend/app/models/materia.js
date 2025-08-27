import mongoose from "mongoose";

const materiaSchema = new mongoose.Schema({
  nombre: String,
  codigo: String,
  descripcion: String,
  creditos: Number
});

export default mongoose.model("Materia", materiaSchema);
