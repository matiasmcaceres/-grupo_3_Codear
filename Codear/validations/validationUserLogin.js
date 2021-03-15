const fs = require("fs");
const { check, body } = require("express-validator");

const { getAdmins } = require("../data/usuarios");
let usuario = getAdmins

module.exports = [
  //Correo Electronico
  check("email")
    .notEmpty().withMessage("El email es requerido")
    .isEmail().withMessage("El email debe ser válido"),

  //Contraseña
  check("pass")
    .notEmpty().withMessage("La contraseña es requerida"), 

]