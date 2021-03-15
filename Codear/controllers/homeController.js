const path = require("path");
const { getProducts, setProducts } = require(path.join("..","data","products")); // Requiere la ruta del JSON parseado.
const products = getProducts();
const toThousand = (n) => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, "."); // Formula para los puntos de los miles.

const homeController ={
    // Home
    home:(req,res) =>{

        let html = products.filter(product=>{
            return product.nombreProfesor == "Máximo"
        })

        let diseñoWeb = {
            categoria:"HTML y CSS",
            introduccion:"El mundo del desarrollo web es tan amplio como la propia Internet. Gran parte de nuestra vida social y profesional se desarrolla en Internet, lo que ha fomentado la creación de nuevas industrias encaminadas a crear, administrar y depurar los sitios web y las aplicaciones de los que dependemos en cada vez mayor medida.",
            productos: products.filter(product => {
                return product.categoria == "diseñoWeb"
            })
        }

        let javascript = {
            categoria: "JavaScript",
            introduccion: "JavaScript es uno de los lenguajes de programación más extendidos del mundo, sobre todo porque es la columna vertebral de las aplicaciones web interactivas. Además, JavaScript es un lenguaje estupendo para los principiantes, porque les da la oportunidad de escribir un código que hace algo visual, lo que resulta útil y motivador cuando estás dando los primeros pasos en la programación.",
            productos: products.filter(product => {
                return product.categoria == "JavaScript"
            })
        }

        let videoJuegos = {
            categoria:"Desarrollo de Video Juegos",
            introduccion: "Sumergete en el mundo de desarrollo de videos juegos, de la mano de los mejores profesores del pais.",
            productos: products.filter(product => {
                return product.categoria == "Video Juegos"
            })
        }

        res.render('index', {
            title:"HOME",
            products,
            html,
            diseñoWeb,
            javascript,
            videoJuegos,
            toThousand
        }); // Renderiza en la vista "index" y crea los nuevos arrays y metodos para usar.
    },
};

module.exports = homeController;