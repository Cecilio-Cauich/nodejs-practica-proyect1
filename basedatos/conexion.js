const mongoose = require("mongoose");

const conexion = async()=>{
    try{
        mongoose.connect("mongodb://localhost:27017/mi_blog");
        //parametros dentro de objeto
        //userNewUrlParser: true;
        //userUnifiedTopologu: true;
        //userCreateIndex: true;

    }catch(error){
        console.log(error);
        throw new Error("No se ha podido conecta a la base de datos");
    }
}