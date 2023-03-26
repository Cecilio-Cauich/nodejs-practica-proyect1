const {conexion} = require("./basedatos/conexion");
const express = require("express");
const cors = require("cors")

//inicializar app
console.log("App de node arracada");

//conectar a la base de datos
conexion();

//crear servidor de node
const app = express();
const puerto = 3900;

//configurar cors
app.use(cors());

//convertir body a objeto js
app.use(express.json()); //recibir datos con content type app/json
app.use(express.urlencoded({extended:true})); //

//RUTAS
 const rutas_articulo = require("./rutas/articulo");

//cargar rutas
app.use("/api",rutas_articulo);

//RUTAS PRUEBA HARCODEADAS


//Crear servidor y escuchar peticiones http
app.listen(puerto,()=>{
    console.log("Servidor corriendo en el puerto "+puerto);
});
