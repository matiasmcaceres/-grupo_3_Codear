var path = require('path'); // Facilita el uso de rutas de archivos y directorios
const fs = require("fs")
const toThousand = (n) => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, "."); // Formula para los puntos de los miles.

//Productos
const { getProducts, setProducts } = require(path.join("..","..","data","products")); // Requiere la ruta del JSON parseado.
const products = getProducts();

//Admin
const bcrypt = require("bcrypt");
const { getAdmins, setAdmins } = require("../../data/usuarios")
const usuarios = getAdmins();
const {validationResult} = require("express-validator");

//Controlador
const productAddController = {
    //ADMINISTRADOR
    index:(req,res)=>{
        res.render(path.join("admin","index"),{
            title:"Administración"
        })
    },

    //LISTADO DE CURSOS
    listCurso: (req, res) => {
        res.render("admin/productList", {
            title: "Listado de Productos",
            products
        }); // Renderiza en la vista "productAll" y crea los nuevos arrays y metodos para usar.
    },

    //VENTAS
    ventas: (req, res) => {
        res.render("admin/productSale", {
            title: "Listado de Productos",
            products
        }); // Renderiza en la vista "productAll" y crea los nuevos arrays y metodos para usar.
    },
    
    //PÁGINA PARA CREAR PRODUCTO
    createCurso: (req, res) => {
        res.render(path.join("admin",'productAdd'), {
            title: "Añadir Producto"
        }); // Renderiza en la vista "productAdd" y crea los nuevos arrays y metodos para usar.
    },

    //GUARDA EL NUEVO PRODUCTO
    storeCurso:(req,res,next) => {
        console.log(req.files)
        
        let lastID = 0;
        products.forEach(product => {
            if (product.id > lastID) {
                lastID = product.id
            }
        });

        const {nombreCurso, cursoCompleto, precio, precioRebaja, categoria, etiquetaCurso, descripcion, descripcionCorta, aQuienEstaDirigido, requisitos, cantidadDeCapitulos, cantidadDePracticas, audio, nivel, nombreProfesor, apellidoProfesor, correoProfesor, telefonoProfesor, ciudadProfesor, pais, tituloProfesor} = req.body;

        let nuevoProducto = {
            id: ++lastID,
            nombreCurso,
            fotoCurso : req.files[0].filename,
            cursoCompleto,
            precio,
            precioRebaja,
            categoria,
            etiquetaCurso,
            descripcion,
            descripcionCorta,
            aQuienEstaDirigido,
            requisitos,
            cantidadDeCapitulos,
            cantidadDePracticas,
            audio,
            nivel,
            nombreProfesor,
            apellidoProfesor,
            correoProfesor,
            telefonoProfesor,
            ciudadProfesor,
            pais,
            tituloProfesor,
            fotoProfesor: req.files[1].filename
        }
        products.push(nuevoProducto);

        setProducts(products);

        res.redirect("/admin/curso/list");
    },
    editCurso:(req,res)=>{

        const {id} = req.params;

        let product = products.find(product =>{
            return +id === +product.id
        }) 

        res.render("admin/productEdit",{
            product,
            title:"Editar"
        });
    },
    updateCurso:(req,res,next)=>{

        const {nombreCurso, cursoCompleto ,precio,precioRebaja,categoria,etiquetaCurso,descripcion,descripcionCorta,aQuienEstaDirigido,requisitos,cantidadDeCapitulos,cantidadDePracticas,audio,nivel,nombreProfesor,apellidoProfesor,correoProfesor,telefonoProfesor,ciudadProfesor,pais,tituloProfesor} = req.body;

        products.forEach(product=>{
            if(+product.id === +req.params.id){
                if (fs.existsSync(path.join("public", "images", "cursos", product.fotoCurso))) {
                    fs.unlinkSync(path.join("public", "images", "cursos", product.fotoCurso))
                }

                product.id = +req.params.id;
                product.nombreCurso = nombreCurso;
                product.fotoCurso = req.files[0].filename,
                product.cursoCompleto = cursoCompleto;
                product.precio = precio;
                product.precioRebajado = precioRebaja;
                product.categoria = categoria;
                product.etiquetaCurso = etiquetaCurso;
                product.descripcion = descripcion;
                product.descripcionCorta = descripcionCorta;
                product.aQuienEstaDirigido = aQuienEstaDirigido;
                product.requisitos = requisitos;
                product.cantidadDeCapitulos = cantidadDeCapitulos;
                product.cantidadDePracticas = cantidadDePracticas;
                product.audio = audio;
                product.nivel = nivel;
                product.nombreProfesor = nombreProfesor;
                product.apellidoProfesor = apellidoProfesor;
                product.correoProfesor = correoProfesor;
                product.telefonoProfesor = telefonoProfesor;
                product.ciudadProfesor = ciudadProfesor;
                product.pais = pais;
                product.tituloProfesor = tituloProfesor;
                product.fotoProfesor = req.files[0].filename
            };
        });

        setProducts(products)

        res.redirect("/admin/curso/list");
    },
    deleteCurso: (req, res) => {

        const {id} = req.params;

        products.forEach(product => {
            if (product.id === +id) {
                if(fs.existsSync(path.join("public","images","cursos", product.fotoCurso))){
                    fs.unlinkSync(path.join("public", "images", "cursos", product.fotoCurso))
                }
                if (fs.existsSync(path.join("public", "images", "cursos", product.fotoProfesor))) {
                    fs.unlinkSync(path.join("public", "images", "cursos", product.fotoProfesor))
                }
                let eliminar = products.indexOf(product);
                products.splice(eliminar, 1)
            }
        });

        setProducts(products)

        res.redirect("/admin/curso/list");

    },

    // LISTA DE USUARIOS 
    usersList: (req, res) => {
        res.render("admin/usersList", {
            title: "Lista de usuarios",
            usuarios
        })
    },
    deleteUser:(req,res)=>{
        const { id } = req.params;

        usuarios.forEach(user => {
            if (user.id === +id) {
                if (fs.existsSync(path.join("public", "images", "avatares", user.avatar))) {
                    fs.unlinkSync(path.join("public", "images", "avatares", user.avatar))
                }
                
                let eliminar = usuarios.indexOf(user);
                usuarios.splice(eliminar, 1)
            }
        });
        setAdmins(usuarios)
        res.redirect("/admin/curso/list");
    }
}

module.exports = productAddController;