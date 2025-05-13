//importo el archivo de app

import app from "./app.js"


//importo el archivo de conexion de la base d e dtaos 

import"./database.js";

import{config} from "./src/config.js";

//creo un afuncion que ejecuta el servidor 

async function main() {

    app.listen(config.server.port)

    console.log("server functioning"+ config.server.port);
}
//ejecutamos la funcion  

main();