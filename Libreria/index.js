//? funcionamiento del servidor
//! Rutas del servidor
//* confiugraciones

//*traemos la libreria dotenv para leer las variables en .env
require("dotenv").config();
const PORT = process.env.PORT;
//? requiero las cors para permitir o ne¡¡deegar accesos a mi bacjk, hay que declararlo luego antes de las rutas
const cors = require("cors");
//!traemos cloudinary par a todo el tema de subidas de archivos
const cloudinary = require("cloudinary").v2
//! importo las rutas de los controladores
const librosRoutes = require("./src/api/libros/libros.routes");

//* traemos la base de datos

const db = require("./src/utils/db.js");

db.connectDB();
//? traemos la libreria express para tener las pociones del servidor
//!contiguracion de cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET
})
const express = require("express");
const AutoresRoutes = require("./src/api/autores/autores.routes");
const userRoutes = require("./src/api/users/users.routes");

//? ejecutamos la variable que tiene la función express para tener las funciones que ejecutar para que realize el sevidor
const server = express();
server.use(cors());

//! MIDDELWARES PARA PODER INTERPRETAR BODYS DE UNA PETICION
server.use(express.json());
server.use(express.urlencoded({ extended: true }));

//!controlador de errores recibe 4 parametros next( pasar a lo siguiente)



//declaramos loas accesos que queremos permitir con el cors antes de declarar las rutas, ahora acceso cualquiera
server.use("/libros", librosRoutes);
server.use("/autores", AutoresRoutes);
server.use("/usuarios", userRoutes)
//? función que ejecuta mi servidor, en este caso usa una ruta para mostrar algo
server.use("/", (req, res) => {
  res.send("funcionando");
});
server.use((err, req, res, next) => {
    return res.status(err.status || 500).json(err.message || "error inesperado");
  });
  server.use("*", (req, res, next) => {
    return res.status(404).json("Route not found");
  });
//?Función que ejecuta mi servidor, en este caso se levanta para "escuchar"
server.listen(PORT, () => {
  console.log(`el servidor esta disponible en http://localhost:${PORT}`);
});
