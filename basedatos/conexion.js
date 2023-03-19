const mongoose = require("mongoose");

const conexion = async()=>{
    try{
        await mongoose.connect("mongodb://localhost:27017/mi_blog");
        //parametros dentro de objeto solo en caso de aviso
        //userNewUrlParser: true;
        //userUnifiedTopologu: true;
        //userCreateIndex: true;

        console.log("Conectado correctamente a la base de datos");

    }catch(error){
        console.log(error);
        throw new Error("No se ha podido conecta a la base de datos");
    }
}

module.exports = {
    conexion
}