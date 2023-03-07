const Autor = require("./autores.model")

const postAutor = async (req, res, next) => {
    try {
        const newAutor = await new Autor(req.body)
        await newAutor.save()
        return res.json(newAutor)
    } catch (error) {
        return next(error)
    }
}
const getAutores = async (req, res) =>{
    try {
        const autores = await Autor.find().populate("libros")
        return res.json(autores)
    } catch (err) {
        return res.json(err)
    }
}
module.exports = {postAutor, getAutores}