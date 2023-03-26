const validator = require("validator")
const Articulo = require("../modelos/Articulo");


const prueba = (req,res)=>{
    return res.status(200).json({
        mensaje: "Soy una accion de prueba en mi controlador de artículos"
    })
}
const curso = (req,res)=>{
    return res.status(200).json([{
        curso: "Master en React",
        autor: "Victor Robles",
        url: "victorroblesweb.es/master-react"
    },
    {
        curso: "Master en React",
        autor: "Victor Robles",
        url: "victorroblesweb.es/master-react"
    }
   ]); 
}

const crear = (req,res)=>{
    //recoger los param por post a guardar
    let parametros = req.body;


    //validar datos
    try {
        let validar_titulo = !validator.isEmpty(parametros.titulo) &&
                             validator.isLength(parametros.titulo,{min:5, max:15});
        let validar_contenido = !validator.isEmpty(parametros.contenido);

        if(!validar_titulo || !validar_contenido){
            throw new Error("No se ha validado la informacion!!")
        }

    } catch (error) {
        console.log(error);
        return res.status(400).json({
            status: "error",
            mensaje: "Falta datos por enviar",
        })
    }
    //crear el objeto a guardar
    const articulo = new Articulo(parametros); //aquí se guardan los parametros que se mandan

    //guardar el objeto en la base de datos
    // articulo.save((error, articuloGuardado)=>{

    //     if(error || !articuloGuardado){
    //         return res.status(400).json({
    //             status: "error",
    //             mensaje: "No se han gurdado el articuo",
    //         })
    //     }

    //     return res.status(2000).json({
    //         status: "Succes",
    //         articulo: articuloGuardado,
    //         mensaje: "Articulo creado con éxito"
    //     })

    // });

    articulo.save()
    .then((articuloGuardado) => {
        if (!articuloGuardado) {
            return res.status(400).json({
                status: "error",
                message: "Falta datos por mandar"
            });
        }
 
        // return result
        return res.status(200).json({
            status: "success",
            article: articuloGuardado,
            message: "Articulo guardado correctamente"
        });
    })
    .catch((err) => {
        console.log(err);
    });

}

const listar = (req,res)=>{
    let consulta = Articulo.find({})
                           .sort({fecha: -1})
                           .exec()
                           .then((articulos)=>{
        if(!articulos){
            return res.status(404).json({
                status: "error",
                mensaje: "No se ha encontrado articulos!!"
            });
        }

        return res.status(200).send({
            status: "succes",
            articulos
        });

    });
}

module.exports = {
    prueba,
    curso,
    crear,
    listar
}