// esto no tiene nada que ver con nuestro proyecto, es como si fuera otro
const bcrypt = require("bcrypt")

const password = "Pepe123*";
const password2 = "pepe123*";
const passwprdEncripted = (bcrypt.hashSync(password2, 10));

if (bcrypt.compareSync(password2, passwprdEncripted)) {
    console.log("Las contraseñas coinciden");
} else {
    console.log("Las contrasñas no coinciden");
}