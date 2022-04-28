// En este archivo guardaremos lo relacionado a la funcion router de la web 

// 1ero tenemos que importar express y luego declarar un const router = express.Router() para poder crear routers nuevos, serian como nuestro app. en archivos pasados 
import express from 'express'
import fs from 'fs'
import repository from "../repositories/instrumentosRepository.js"


const router = express.Router()

// Usamos <<APP.ROUTE>> para simplificar la lectura y escritura de codigo que se ejecutar en la mismas url
router.route('/instrumentos')
    //obtener todos los instrumentos <<GET>>
    .get(function(req, res){
        repository.getAll()
            .then(function(instrumentos){
                res.status(200).json(instrumentos)
            })
            .catch(function(err){
                res.status(500).json({err: 500, msg: "Error al leer los datos."})
            })
    })
    //Crear nuevo instrumento con <<POST>>
    .post(function(req, res){
        fs.promises.readFile('./data/instrumentos.json')
        .then(function(data){
            const instrumentos = JSON.parse(data)
            
            const instrumento = req.body
            instrumento.id = instrumentos.length + 1

            instrumentos.push(instrumento)

            fs.promises.writeFile('./data/instrumentos.json', JSON.stringify(instrumentos))
            .then(function(){
                res.status(201).json(instrumento)
            })
            .catch(function(err){
                res.status(500).json({err: 500, msj: "Error al escribir los datos"})
            })

        })
        .catch(function(err){
            res.status(500).json({err: 500, msj: "Error al leer los datos"})
        })
    })

    router.route('/instrumentos/:id')
    //obtener un instrumento especifico con su id <<GET>>
    .get(function(req, res){
        const id = parseInt(req.params.id) 
        
        fs.promises.readFile('./data/instrumentos.json')
        .then(function(data){
            const instrumentos = JSON.parse(data)
            const instrumento = instrumentos.find(function(e){
                return e.id === id
            })

            if(instrumento != undefined && instrumento.deleted != true){
                res.status(200).json(instrumento)
            }else{
                res.status(404).json({err: 404, msj: `No se encontro el instrumento con id: ${id}`})    

            }
        })
        .catch(function(err){
            res.status(500).json({err: 500, msj: "Error al leer los datos"})
        })
    })
    //Sobre escribir un parametro en el JSON CON <<PUT>>
    .put(function(req, res){
        const id = parseInt(req.params.id)

        fs.promises.readFile('./data/instrumentos.json')
        .then(function(data){
            const instrumentos = JSON.parse(data)

            const instrumento = instrumentos.find(function(e){
                return e.id = id;
            })    
            
            if(instrumento != undefined && instrumento.deleted != true){
                /* 1er intento de hacer un put (hay que testearlo a ver si era buena la idea) 
                instrumento.name = req.body
                instrumentos.push(instrumento)*/

                let index = instrumentos.indexOf(instrumento)
                instrumentos[index] = {...req.body, id:id}

                fs.promises.writeFile('./data/instrumentos.json', JSON.stringify(instrumentos))
                .then(function(){
                    res.status(200).json({msj: "Instrumento modificado con exito"})
                })
                .catch(function(err){
                    res.status(500).json({err: 500, msj: `Error al escribir los datos`})
                })
            }else{
                res.status(500).json({err: 500, msj: `No se encontro un instrumento con el id= ${id}`})
            }
        })
        .catch(function(err){
            res.status(500).json({err: 500, msj: "Error al leer los datos"})
        })
    })
    //Editar un parametro en el JSON CON <<PATH>> para no afectar todos los parametros
    .patch(function(req, res){
        const id = parseInt(req.params.id)

        fs.promises.readFile('./data/instrumentos.json')
        .then(function(data){
            const instrumentos = JSON.parse(data)

            const instrumento = instrumentos.find(function(e){
                return e.id = id;
            })    
            
            if(instrumento != undefined && instrumento.deleted != true){
                /* 1er intento de hacer un put (hay que testearlo a ver si era buena la idea) 
                instrumento.name = req.body
                instrumentos.push(instrumento)*/

                let index = instrumentos.indexOf(instrumento)
                instrumentos[index] = {...instrumentos[index], ...req.body, id:id}

                fs.promises.writeFile('./data/instrumentos.json', JSON.stringify(instrumentos))
                .then(function(){
                    res.status(200).json({msj: "Instrumento modificado con exito"})
                })
                .catch(function(err){
                    res.status(500).json({err: 500, msj: `Error al escribir los datos`})
                })
            }else{
                res.status(500).json({err: 500, msj: `No se encontro un instrumento con el id= ${id}`})
            }
        })
        .catch(function(err){
            res.status(500).json({err: 500, msj: "Error al leer los datos"})
        })
    })
    // Baja logica de un objeto con <<DELETE>> se le agrega el parametro deleted = true
    .delete(function(req, res){
        const id = parseInt(req.params.id)

        fs.promises.readFile('./data/instrumentos.json')
        .then(function(data){
            const instrumentos = JSON.parse(data)

            const instrumento = instrumentos.find(function(e){
                return e.id = id;
            })    
            
            if(instrumento != undefined && instrumento.deleted != true){

                instrumento.deleted = true
                fs.promises.writeFile('./data/instrumentos.json', JSON.stringify(instrumentos))
                .then(function(){
                    res.status(200).json({msj: "Instrumento eliminado con exito"})
                })
                .catch(function(err){
                    res.status(500).json({err: 500, msj: `Error al escribir los datos`})
                })
            }else{
                res.status(500).json({err: 500, msj: `No se encontro un instrumento con el id= ${id}`})
            }
        })
        .catch(function(err){
            res.status(500).json({err: 500, msj: "Error al leer los datos"})
        })
    })

// Exportameos el router para luego utilizarlo
export default router