const { getAllLibros, getLibroById, getByTittle, crearLibro, eliminarLibro, eliminarLibroPOrTitulo, actualizarLibro} = require("./libros.controllers")
const {isAuth, isAdmin} = require("../../middlewares/auth");
const upload = require("../../middlewares/file");
const librosRoutes = require("express").Router()
librosRoutes.get("/", getAllLibros);
librosRoutes.get("/:id",[isAuth], getLibroById)
librosRoutes.get("/getByTittle/:titulo", getByTittle)
librosRoutes.post("/",[isAdmin], upload.single("caratula"), crearLibro)
librosRoutes.delete("/:id", [isAdmin], eliminarLibro)
librosRoutes.delete("/deleteTitulo/:titulo",[isAdmin], eliminarLibroPOrTitulo)
librosRoutes.put("/:id",[isAdmin], upload.single("caratula"), actualizarLibro, )

module.exports = librosRoutes