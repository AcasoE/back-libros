const User = require("./users.model");
const bcrypt = require("bcrypt");
const { generateSign } = require("../../utils/jsonwebtoken");
const registro = async(req,res,next)=>{
try {
    if (req.body.rol === "admin") {
        req.body.rol = "user"
        
    }
    const newUser = await new User(req.body);
    await newUser.save()
    return res.status(201).json(newUser)
} catch (error) {
    next(error)
}
}


const login = async (req, res, next ) => {
    try {
        //? tenemos que comparar lo que envio con lo que tengo registrarlo
        //req.body.email es el mail del usuario que quiere logearse
        //req.body.password es la contraseña cin la que el usuario se quiere loggear


        const userToLog = await User.findOne({email: req.body.email})
        if (!userToLog) {
            return res.status(500).json("No se encuentra el usuario")
        }

        if (bcrypt.compareSync(req.body.password, userToLog.password)){
            const token = generateSign(userToLog._id, userToLog.email);
            return res.status(200).json({token, userToLog})
        } else {
            return res.status(500).json("te has equivocado de contraseña")
        }


    } catch (error) {
        next(error)
    }
}


const modifyUser = async (req, res, next)=>{
    try {
        //! recojo el id del usuario que quiero modificar( el que vendria en la url)
        const {id} = req.params

        //! comprobmamos el rol del usuiario que realiza la peticion ( el del token de autenticacion)
        //!, por lo que solo los admins podran poner a optros a admin

        if (!req.user.rol === "admin") {
            req.body.rol = "user"
        }
        //! quiero comprobar si la perdona wue esta modifiando al usuari es el propio usuario o un admin, en caso contrario no le dejo que actualice
        //! para ello comparamos el id del usuario a modificar, el de los parametros con el id del user que esta realizando la peticion
        //! idparsed es el id de la persona que quiere modifciar y el Id es el de la persona a quine modificamos
        //! si los ids son iguales, ponemos actualizar el mismo usuario. pero solo si eres admin puedes actualizar los roles.
        const idUser = JSON.stringify(req.user._id)
        const idUserParsed = idUser.slice(1, idUser.length - 1)

     if (idUserParsed === id || req.user.rol === "admin"){

        console.log(userToUpdate);
        const userUpdated = await User.findByIdAndUpdate(id, req.body, {new: true})
        return res.json(userUpdated)
        
     } else {
        return res.json("no eres admin y no puedes modificar los roles, ni a otros usuarios")
     }
        
    } catch (error) {
        next(error)
    }

}

module.exports = {registro, login, modifyUser}