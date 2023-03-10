const AutoresRoutes = require("express").Router()
const {isAuth, isAdmin} = require("../../middlewares/auth")

const { postAutor, getAutores} = require("./autores.controllers")

AutoresRoutes.post("/",[isAdmin], postAutor)
AutoresRoutes.get("/",[isAdmin], getAutores)
module.exports = AutoresRoutes