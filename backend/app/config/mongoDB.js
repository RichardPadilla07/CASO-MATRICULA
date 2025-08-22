// Configuración y conexión a la base de datos.
// Este archivo gestiona la conexión con la base de datos usando los parámetros definidos en config/db.config.js.

import mongoose from "mongoose";
import dbConfig from "./mongoDB.config.js";

mongoose.connect(dbConfig.MONGO_URI);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "❌ Error al conectar a MongoDB:"));
db.once("open", () => {
  console.log("✅ Conexión a MongoDB exitosa.");
});

export default mongoose;
