// Este archivo contiene la configuración de la base de datos.
// Aquí se definen los parámetros de conexión (host, usuario, contraseña y nombre de la BD).

// Configuración para MongoDB

import dotenv from "dotenv";
dotenv.config();
const config = {
  MONGO_URI: process.env.MONGO_URI
};

export default config;
