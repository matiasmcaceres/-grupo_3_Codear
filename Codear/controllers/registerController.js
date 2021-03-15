const path = require("path");
const products = require(path.join("..","data","products")) // Requiere la ruta del JSON parseado.
const toThousand = (n) => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, "."); // Formula para los puntos de los miles.

const registerController ={
    registro:(req,res) =>{
        res.render('register',{
            title:"Registro",
            toThousand
        }); // Renderiza en la vista "productDetail" y crea los nuevos arrays y metodos para usar.
    }
}

module.exports = registerController;