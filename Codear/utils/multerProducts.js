const path = require("path");
const multer = require("multer"); //Carga de archivos

const storage = multer.diskStorage({
  destination: (res, file, cb) => {
    cb(null, "public/images/cursos") // Ubicacion de los archivos cargados
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + "-" + Date.now() + path.extname(file.originalname)) // Establece nombres para que no hayan archivos con el mismo nombre.
  }
})

const upload = multer({ storage });

module.exports = upload;