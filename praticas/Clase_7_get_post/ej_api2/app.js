import express, { json } from 'express'
import fs from 'fs'

const app = express()

// Para que la info recibida en el body este en formato json
app.use(express.json())

//obtener todos los instrumentos <<GET>>
app.get('/instrumentos', function(req, res){
    fs.promises.readFile('./data/instrumentos.json')
    .then(function(data){
        const instrumentos = JSON.parse(data)

        res.status(200).json(instrumentos.filter(function(e){
            return e.deleted != true
        }))
    })
    .catch(function(err){
        res.status(500).json({err: 500, msg: "Error al leer los datos."})
    })
})

//obtener un instrumento especifico con su id <<GET>>
app.get('/instrumentos/:id', function(req, res){
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

//Crear nuevo instrumento con <<POST>>
app.post('/instrumentos', function(req, res){
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

//Sobre escribir un parametro en el JSON CON <<PUT>>
app.put('/instrumentos/:id', function(req, res){
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
app.patch('/instrumentos/:id', function(req, res){
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
app.delete('/instrumentos/:id', function(req, res){
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


app.listen(80, function(){
    console.log("El sever esta ON paaaa") 
})

