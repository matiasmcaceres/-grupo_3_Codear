const path = require('path'); // Facilita el uso de rutas de archivos y directorios
const products = require(path.join("..","..","data","products")); // Requiere la ruta del JSON parseado.
const toThousand = (n) => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, "."); // Formula para los puntos de los miles.


const categoriaController = {
  categorias: (req, res) => {
    res.render(path.join("admin",'productCategorias'), {
      title: "Categorias",
      toThousand
    }); // Renderiza en la vista "productCategorias" y crea los nuevos arrays y metodos para usar.
  },
};

module.exports = categoriaController;