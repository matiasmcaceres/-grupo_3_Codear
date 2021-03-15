const fs = require("fs");
const path = require("path");
const users_db = path.join("data","users.json");

module.exports = {
  getAdmins: ()=> JSON.parse(fs.readFileSync(users_db,"utf-8")),
  
  setAdmins: (data)=>{
    fs.writeFileSync(
      users_db,
      JSON.stringify(data,null,2),
      "utf-8"
    )
  }
}