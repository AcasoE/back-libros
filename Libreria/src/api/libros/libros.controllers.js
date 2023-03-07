const deleteFile = require("../../middlewares/deleteFile.js");
const Libro = require("./libros.model.js");

const getAllLibros = async (req, res, next) => {
  try {
    const libros = await Libro.find();
    return res.json(libros);
  } catch (error) {
    return next(error);
  }
};
const getLibroById = async (req, res, next) => {
  try {
    const { id } = req.params;
    console.log(id);
    const libro = await Libro.findById(id);
    return res.json(libro);
  } catch (error) {
    return next(error);

    }
};
const getByTittle = async (req, res, next) => {
  try {
    const { titulo } = req.params;
    console.log(titulo);
    const libro = await Libro.findOne({ titulo: titulo });
    return res.json(libro);
  } catch (error) {
    return next(error);
  }
};

const crearLibro = async (req, res, next) => {
  try {
    const newLibro = await new Libro(req.body);

    if(req.file){
      newLibro.caratula=req.file.path
    }
    await newLibro.save();

    return res.json(newLibro);
  } catch (error) {
    return next(error);
  }
};

const eliminarLibro = async (req, res, next) => {
  try {
    const { id } = req.params;

    const libroEliminado = await Libro.findByIdAndDelete(id);
    return res.status(200).json(libroEliminado);
  } catch (error) {
    return next(error);
  }
};
const eliminarLibroPOrTitulo = async (req, res, next) => {
  try {
    const { titulo } = req.params;

    const libroEliminado = await Libro.findOneAndDelete({titulo: titulo});
    return res.status(200).json(libroEliminado);
  } catch (error) {
    return next(error);
  }
};
const actualizarLibro = async (req, res, next) => {
  try {
    const {id} = req.params
    if(req.file){
      const oldLibro = await Libro.findById(id)
      if (oldLibro.caratula) {
      deleteFile(oldLibro.caratula)
      }
      req.caratula=req.file.path
    }
    
    const libroActualizado = await Libro.findByIdAndUpdate(id, req.body,{ new: true });
  
    return res.status(200).json(libroActualizado)

  } catch (error) {
    return next(error);


  }
};
module.exports = {
  getAllLibros,
  getLibroById,
  getByTittle,
  crearLibro,
  eliminarLibro,
  eliminarLibroPOrTitulo,
  actualizarLibro,
};
