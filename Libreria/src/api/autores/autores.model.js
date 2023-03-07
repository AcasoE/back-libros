const mongoose = require("mongoose")

const autorSchema = mongoose.Schema(
    {
        name: {type: String, required: true,  unique: true},
        age: {type: Number, required: true},
        photo: {type: String, required: true},
        genre: {type: String, enum: ["Novela Policiaca", "Terror", "Novela Romantica", "Niños"]},
        //Declaracion de la relacion en la bbdd
        libros: [{type: mongoose.Types.ObjectId, ref: "libros" }]
    })

    const Autor = mongoose.model("autores", autorSchema)
    module.exports = Autor