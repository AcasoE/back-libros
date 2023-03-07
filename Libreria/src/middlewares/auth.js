const User = require("../api/users/users.model");
const { verifyJwt } = require("../utils/jsonwebtoken");



const isAuth = async (req,res, next)=>{
    try {
        
        const token = req.headers.authorization;

        if(!token){
            return res.json("No estas autorizado")
        }

        const parsedToken = token.replace("Bearer ","") // le quitamos el bearer y el espacion con el que viene elk token
        const validToken = verifyJwt(parsedToken)// nos devuelve el usuario
        const userLoged = await User.findById(validToken.id)


        userLoged.password = null;
        req.user = userLoged
        next()


    } catch (error) {
        return res.json(error)
    }
}
const isAdmin = async (req,res, next)=>{
    try {
        
        const token = req.headers.authorization;

        if(!token){
            return res.json("No estas autorizado")
        }

        const parsedToken = token.replace("Bearer ","") // le quitamos el bearer y el espacion con el que viene elk token
        const validToken = verifyJwt(parsedToken)// nos devuelve el usuario
        const userLoged = await User.findById(validToken.id)

        if(userLoged.rol === "admin"){
            userLoged.password = null;
            req.user = userLoged
            next()
        } else {
            return res.json("no eres admin")

        }
       


    } catch (error) {
        return res.json(error)
    }
}
module.exports = {isAuth, isAdmin}