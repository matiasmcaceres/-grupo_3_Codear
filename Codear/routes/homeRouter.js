var express = require('express'); // Requiere express.
var router = express.Router(); // Permite crear múltiples "mini aplicaciones".
const path = require("path");

// Rutas a los controladores.
const {home} = require(path.join("..","controllers","homeController"));

/* GET Página HOME. */
router.get('/', home)

module.exports = router;