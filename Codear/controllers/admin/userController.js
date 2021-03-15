//Base de datos de usuarios
const {getAdmins,setAdmins} = require("../../data/usuarios")
const usuarios = getAdmins();

const bcrypt = require("bcrypt");

//validacion
const {validationResult} = require("express-validator");



const productAddController = {
  // REGISTER
  register:(req,res) => {
    res.render("admin/register",{
      title:"Registro"
    })
  },

  //REGISTER PROCESS
  processRegister:(req,res)=>{

      let errores = validationResult(req); //valida lo que entre por req

      // res.send(errores);

      if(!errores.isEmpty()){//si no está vacio
        return res.render("admin/register",{ //renderisa register pasandole los errores
          errores: errores.errors,
          title : "Registro"
        });
      }

    let { nombreUsuario, pass, email} = req.body; //Recibimos los name
    
    let lastID = 0;
    usuarios.forEach(usuario=>{
      if (usuario.id > lastID){
        lastID = usuario.id
      }
    }); //Buscamos en el JSON el ultimo ID

    let passHash = bcrypt.hashSync(pass.trim(),12); //Hasheamos la contraseña

    let newUser = {
      id: +lastID +1,
      nombreUsuario: nombreUsuario.trim(),
      email,
      pass: passHash,
      avatar : req.files[0].filename,
      admin:false,
    } //Creamos el nuevo usuario

    usuarios.push(newUser); //Guardamos el usuario
        setAdmins(usuarios);//Guardamos el usuario

    res.redirect("/users/login");
  },



  // LOGIN 
  login: (req, res) => {
    res.render("admin/login",{
      title:"Login"
    })
    
    
  },
  processLogin:(req,res)=>{
    let errores = validationResult(req)

    const{email,pass} = req.body;

    if (!errores.isEmpty()) {
      res.render("admin/login", {
          errores: errores.errors,
          title: "Login"
      });
    } else{
      let resultado = usuarios.find(user => user.email === email);

      if(resultado){
        if(bcrypt.compareSync(pass.trim(),resultado.pass)){

          req.session.userAdmin = {
            id: resultado.id,
            nombreUsuario: resultado.nombreUsuario,
            email:resultado.email,
            pass:resultado.pass,
            nombrePerfil: resultado.nombrePerfil,
            apellidoPerfil: resultado.apellidoPerfil,
            documento:resultado.documento,
            telefonoPerfil:resultado.telefonoPerfil,
            domicilioPerfil: resultado.domicilioPerfil,
            avatar:resultado.avatar,
            admin:resultado.admin
          }

          // res.redirect("/users/perfil")
          res.redirect("/admin")
        }
      }
      res.render("admin/login",{
        errores : [
          {
            msg: "credenciales invalidas"
          }
        ]
      })
    }
  },

  // EDITAR CARACTERISTICAS
  editPerfil:(req,res) =>{

    const { id } = req.params;

    let usuario = usuarios.find(user => {
      return +id === +user.id
    })

    res.render("admin/users/perfilEdit", {
      usuario,
      title: "Editar Perfil"
    });
  },
  updatePerfil:(req,res,next) =>{

    const{nombreUsuario,nombrePerfil,apellidoPerfil,email,pass,documento,domicilioPerfil,telefonoPerfil,avatar} = req.body

    usuarios.forEach(usuario=>{
      if(+usuario.id === +req.params.id){
        if (fs.existsSync(path.join("public", "images", "avatares", usuario.avatar))) {
          fs.unlinkSync(path.join("public", "images", "avatares", usuario.avatar))
        }

        id = +req.params.id,
        nombreUsuario = usuario.nombreUsuario, 
        nombrePerfil = usuario.nombrePerfil, 
        apellidoPerfil = usuario.apellidoPerfil, 
        email = usuario.email, 
        pass = usuario.pass, 
        documento = usuario.documento, 
        domicilioPerfil = usuario.domicilioPerfil, 
        telefonoPerfil = usuario.telefonoPerfil, 
        avatar = req.files[0].filename
      }
    })

    setAdmins(usuarios)

    res.redirect("/users/perfil");
  },

  //CERRAR SESION
  logout:(req,res)=>{
    delete req.session.userAdmin
    res.redirect("/")
  },

  //Perfil de usuario
  perfil:(req,res) => {
    res.render("admin/users/perfil",{
      title:"Mi Perfil"
    })
  } 
}

module.exports = productAddController;