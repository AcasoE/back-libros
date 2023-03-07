//! EN ESTE ARCHIVO VAMOS A CONECTAR CON LA BASE DE DATOS CON UNA FUNCION Y PARA ELLO NECESITAMOS MONGOOSE


//? TRAEMOS LA LIBRERIA MONGOOSE
const mongoose = require("mongoose");


//? GUARDAMOS EN UNA VARIABLE NUESTRO LINK A LA BASE DE DATOS PARA PODER CONECTARNOS

const db_url = process.env.DB_URL;

//?funcion para conectarsea la base de datos que luego exportamos al index para poder usarla
const connectDB = async () => {

    try {
        mongoose.set("strictQuery", true)
        const db = await mongoose.connect(db_url)
        const  {host} =db.connection;
        console.log("conectado con éxtido a host " + host); 

    } catch (error) {
        console.log("no me puedo conectar a la base de datos, comprueba este error =>", error);
    }
}

module.exports = {connectDB}