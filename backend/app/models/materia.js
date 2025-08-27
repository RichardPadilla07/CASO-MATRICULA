import mongoose from "mongoose";

const materiaSchema = new mongoose.Schema({
  nombre: { type: String, required: true, maxlength: 30 },
  codigo: { type: String, required: true, unique: true, maxlength: 6 },
  descripcion: { type: String, maxlength: 30 },
  creditos: { type: Number },
});

const Materia = mongoose.model("Materia", materiaSchema);

export default Materia;
