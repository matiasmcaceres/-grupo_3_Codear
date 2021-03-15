var express = require('express'); // Requiere express.
var router = express.Router(); // Permite crear múltiples "mini aplicaciones".

//Validaciones
const validationRegister = require("../validations/validationUserRegister");
const validationLogin = require("../validations/validationUserLogin");
//Middlewares
const adminCheck = require("../middlewares/adminCheck");
const imgPerfil = require("../utils/imgPerfil");
const logoutCheck = require("../middlewares/logoutCheck");
const logoutCheckEdit = require("../middlewares/logoutCheckEdit");


// Rutas a los controladores.
const { login, register, processRegister, processLogin, logout, editPerfil, updatePerfil, perfil } = require("../controllers/admin/userController");

//Registrarse
router.get("/register", logoutCheck, register)
router.post("/register",logoutCheck,imgPerfil.any(), validationRegister,processRegister)

//Ingresar
router.get("/login", logoutCheck, login);
router.post("/login", logoutCheck, validationLogin, processLogin);

//Editar Perfil
router.get("/edit/:id", logoutCheckEdit, editPerfil);
router.put("/update/:id", imgPerfil.any(), updatePerfil);


//Cerrar Sesión
router.get("/logout", logout)

//Perfil Usuario
router.get("/perfil",adminCheck, perfil)


module.exports = router;