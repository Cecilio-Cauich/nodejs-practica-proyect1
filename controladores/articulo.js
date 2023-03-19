
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

module.exports = {
    prueba,
    curso
}