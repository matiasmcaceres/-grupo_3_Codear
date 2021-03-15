const path = require("path");
const { getProducts, setProducts } = require(path.join("..", "data", "products")); // Requiere la ruta del JSON parseado.
const products = getProducts();
const toThousand = (n) => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, "."); // Formula para los puntos de los miles.


const productController = {
    //DETALLE
    detail: (req, res) => {
        const { id } = req.params

        let resultado = products.find(product => {
            return product.id === +id
        })

        res.render("productDetail", {
            title: "detalle",
            resultado,
            products,
            id
        })
    },

    //BUSCADOR
    search: (req, res) => {
        const buscar = req.query.search

        const resultado = products.filter(product => {
            return (product.nombreCurso.toLowerCase()).includes(buscar.toLowerCase())
        });

        res.render("resultados", {
            title: "Resultado de la búsqueda",
            products: resultado
        })
    },


    //--------------CARRITO-----------------//
    //--------------------------------------//
    //--------------CARRITO-----------------//


    carrito: (req, res) => {
        res.render('carritoViews/productCar', {
            title: "Cursos",
            products,
            toThousand
        }); // Renderiza en la vista "ProductCar" y crea los nuevos arrays y metodos para usar.
    },
    packCursos:(req,res)=>{
        const productoFiltra = products.filter(producto => {
            return producto.categoria === 'pack'
        })

        res.render("packs",{
            title:"Packs",
            productoFiltra
        })
    },


    //--------------CATEGORIAS-CARRITO-----------------//
    //-------------------------------------------------//
    //--------------CATEGORIAS-CARRITO-----------------//
    diseñoWeb:(req,res)=>{

        const productoFiltra = products.filter(producto => {
            return producto.categoria === 'diseñoWeb'
        })
        res.render('carritoViews/diseñoweb', {
            title: "Diseño Web",
            productoFiltra,
        });
        
    },
    js: (req, res) => {

        const productoFiltra = products.filter(producto => {
            return producto.categoria === 'JavaScript'
        })

        res.render('carritoViews/js', {
            title: "JavaScript",
            productoFiltra,
        });

    },
    videoJuegos:(req,res) =>{

        const productoFiltra = products.filter(producto => {
            return producto.categoria === 'Video Juegos'
        })
        res.render('carritoViews/videoJuegos', {
            title: "Video Juegos",
            productoFiltra,
        });
        
    } 

};

module.exports = productController;