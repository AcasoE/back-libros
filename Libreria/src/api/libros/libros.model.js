//? traemnos mongoos e porque vamos a usar la base de datos

const mongoose = require("mongoose");
//! Creamos el esquema con los parametros para crear un nuevo libro ennuestra base de datod
const libroSchema = new mongoose.Schema(
  {
    titulo: { type: String, required: true },
    caratula
    : { type: String, required: true },
    precio: { type: Number, required: true },
    ISBN: { type: String },
    categoria: {
      type: String,
      required: true,
      enum: ["aventura", "miedo", "policiaca", "pepe"],
    },
  },
  {
    timestamps: true,
    collection: "libros"
  }
);

const Libro = mongoose.model("libros", libroSchema);
module.exports = Libro 
