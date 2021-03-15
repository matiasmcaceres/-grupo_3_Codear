const path = require('path'); // Facilita el uso de rutas de archivos y directorios
const { getProducts, setProducts } = require(path.join("..","..","data","products")); // Requiere la ruta del JSON parseado.
const products = getProducts();

const fs = require("fs")
const toThousand = (n) => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, "."); // Formula para los puntos de los miles.

const ventasController = {
  ventas: (req, res) => {
    res.render("admin/productSale", {
      title: "Listado de Productos",
      products
    }); // Renderiza en la vista "productAll" y crea los nuevos arrays y metodos para usar.
  }
};

module.exports = ventasController;