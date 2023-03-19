const express = require("express");
const router = express.Router();
const ArticuloControlador = require("../controladores/articulo");

//Rutas de prueba
router.get("/ruta-de-prueba", ArticuloControlador.prueba);
router.get("/curso",ArticuloControlador.curso);


module.exports = router;