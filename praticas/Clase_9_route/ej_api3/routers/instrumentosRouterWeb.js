import express from "express";
import controller from '../controllers/instrumentosControllers.js'

const router = express.Router();

router.route('/')
.get(function (req, res){
    res.send('Hola genetee')
})

router.route('/listar')
.get(controller.listar)

router.route('/listarNuevo')
.get(controller.listarNuevo)

export default router