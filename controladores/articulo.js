const Articulo = require("../modelos/Articulo");
const {validarArticulo} = require("../helpers/validar");
const fs = require("fs");

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
        validarArticulo(parametros);
    } catch (error) {
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

    if(req.params.ultimos){
        consulta.limit(Number(req.params.ultimos));
    } 

    consulta.sort({fecha: -1})
                           .exec()
                           .then((articulos)=>{
        if(!articulos){
            return res.status(500).json({
                status: "error",
                mensaje: "No se ha encontrado articulos!!"
            });
        }

        return res.status(200).send({
            status: "succes",
            contador: articulos.length,
            articulos
        });

    });
}

const uno = (req,res) =>{
    //Recogger una id por la url
    let id = req.params.id;

    Articulo.findById(id).then((articulo)=>{

        //Si no encuentra el resultado
        if(!articulo){
            return res.status(404).json({
                status: "error",
                mensaje: "No se ha encontrado el articulo"
            });
        }

        //devuelve resultado
        return res.status(200).json({
            status: "succes",
            articulo
        });
    });
}

const borrar = (req,res)=>{
    let articuloId = req.params.id;

    Articulo.findOneAndDelete({_id: articuloId}).then((articuloBorrado)=>{
        if(!articuloBorrado){
            return res.status(200).json({
                status: "success",
                articulo: articuloBorrado,
                mensaje: "Error al borrar"
            })
        }

        return res.status(200).json({
            status: "succes",
            articulo: articuloBorrado,
            mensaje: "Metodo de borrar"
        });


    })
}

const editar = (req,res)=>{

    let articuloId = req.params.id;

    let parametros = req.body;

    //Validad datos
    try {
        validarArticulo(parametros);

    } catch (error) {
        return res.status(400).json({
            status: "error",
            mensaje: "Falta datos por enviar en editar",
        })
    }
    //buscar y actualizar
    Articulo.findOneAndUpdate({_id: articuloId}, req.body,{new:true}).then(articuloActualizado=>{

        if(!articuloActualizado){
            
            return res.status(500).json({
                status:"error",
                mensaje:"Error al actualizar"
            })
        }

        return res.status(200).json({
            status:"success",
            articulo: articuloActualizado
        })
    });

}

const subir = (req,res) => {

    //Configurar Multer

    //Recoger el fichero de imagen subido
    if(!req.file && !req.files){
        return res.status(404).json({
            status: "Error",
            mensaje: "Petición invalida"
        })
    }

    //Nombre del archivo
    let archivo = req.file.originalname;

    //Extension del archivo
    let archivo_split = archivo.split("\.");
    let extension = archivo_split[1];

    //Comprobar extensión correcta
    if(extension!= "png" && extension!="jpg" &&
       extension != "gpeg" && extension !="gif"){
        //Borrar archivo y dar respuestar
        fs.unlink(req.file.path,()=>{
            return res.status(400).json({
                status:"error",
                mensaje: "Imagen no valido"
            })
        })

    }else{
        return res.status(200).json({
            status: "success",
            extension,
            files: req.file
        })

    }

    //Actualizar articulo al que corresponde la imagen
}

module.exports = {
    prueba,
    curso,
    crear,
    listar,
    uno,
    borrar,
    editar,
    subir
}