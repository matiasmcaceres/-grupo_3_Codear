var express = require('express'); // Requiere express.
var router = express.Router(); // Permite crear múltiples "mini aplicaciones".
const path = require("path");

//middleware
const adminSession = require("../middlewares/checkAdmin");
const adminPerfil = require("../middlewares/admin-perfil");



// Rutas a los controladores.
const { createCurso, storeCurso, editCurso, updateCurso, deleteCurso, listCurso, index, ventas, usersList, deleteUser} = require("../controllers/admin/productAdminController");
const upload = require(path.join("..", "utils", "multerProducts"))

const { categorias } = require(path.join("..","controllers","admin","categoriaController"));



/* GET página Administración. */
router.get("/",adminPerfil, adminSession,index)

/* Página Lista de Cursos. */
router.get("/curso/list", adminSession, listCurso);
router.get("/usersList", adminSession, usersList);

// Crear Producto
router.get("/curso/create", adminSession,createCurso);
router.post("/curso/store",upload.any(),storeCurso);

//Editar Producto
router.get("/curso/edit/:id", adminSession,editCurso);
router.put("/curso/update/:id",upload.any(),updateCurso);

//ELiminar Producto
router.delete("/curso/delete/:id", deleteCurso)
router.delete("/user/delete/:id", deleteUser)



// OTRAS
router.get("/categoria",categorias);
router.get("/ventas", adminSession,ventas);
module.exports = router;