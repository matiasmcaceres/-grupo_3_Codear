const fs = require("fs");
const { check, body } = require("express-validator");

const {getAdmins} = require("../data/usuarios");
let usuarios = getAdmins()

module.exports = [
  //Nombre de usuario
  check("nombreUsuario")
    .notEmpty()//Valida que el campo no este vacio.
    .withMessage("El nombre de usuario es requerido"), //Envia un mensaje.

  //Correo Electronico
  check("email")
    .notEmpty().withMessage("El email es requerido")
    .isEmail().withMessage("El email debe ser válido"),

    body("email").custom(value => {
      let result = usuarios.find(user => user.email === value.trim());
      if (result) {
        return false //Retorna falso si hay un usuario con ese email
      }else{
        return true //true es importante porq sino nunca nos va a validar
      }
    }).withMessage("El email ya está en uso"),


    //Contraseña
    check("pass")
      .isLength({ min: 8, max: 12 }) //Establece mínimo y máximo de caracteres para la contraseña.
      .withMessage("La contraseña debe tener mínimo de 8 y un máximo de 12 carácteres"), //Envia un mensaje.

    body("pass2").custom((value,{req} )=> {
      if (value !== req.body.pass) {
        return false //Retorna falso si hay un usuario con ese email
      } else {
        return true //true es importante porq sino nunca nos va a validar
      }
    }).withMessage("Las contraseñas no coinciden"),
  ]