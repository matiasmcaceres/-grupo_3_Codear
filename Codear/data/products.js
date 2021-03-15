const fs = require("fs") // Requiero FS
const path = require('path'); // Requiero PATH , señala la localización exacta de un archivo o directorio mediante una cadena de caracteres concreta.
const product_db = path.join("data", "productos.json") // Señalo la ruta JSON con path

const products = {
  getProducts: ()=> JSON.parse(fs.readFileSync(product_db, "utf-8")), // Parse el JSON para poder leerlo y utilizarlo 

  setProducts:(productos)=> {
    fs.writeFileSync(
      product_db,
      JSON.stringify(productos, null, 2),//El "null, 2"  Hacen que el documento JSON al sobreescribirle nueva informacion, este tenga formato para que sea mas legible
      'utf-8') // Sobreescribo el JSON
  } 
}

module.exports = products
