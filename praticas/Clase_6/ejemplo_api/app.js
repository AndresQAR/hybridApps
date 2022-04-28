import express, { json } from 'express'
import { promises, readFile } from 'fs';
import path from 'path'

const app = express()

//(Parse Body Url Encode)Se usa el urlencoded para que el express pueda intreprar en codigo encoded recibido en el body de post
app.use(express.urlencoded({extended: true}))
//Parse Body JSON 
app.use(express.json());

app.get('/instrumentos', function(req, res){

    promises.readFile('./data/instrumentos.json')
    .then(function(data){
        const instrumentos = JSON.parse(data)

        res.status(200).json(instrumentos)
    })
    .catch(function(err){
        res.status(500).json({err: 500, msg: "No pudo leer la entidad..."})
    })
})

app.get('/instrumentos/:id', function(req, res){

    const id = req.params.id

    promises.readFile('./data/instrumentos.json')
    .then(function(data){
        const instrumentos = JSON.parse(data)

        let inst = instrumentos.find(element => element.id == id)

        if(inst){
            res.status(200).json(inst)
        }else{
            res.status(404).json({err: 404, msg: `El instrumento #${id} no se encuentra en la base de datos`})
        }
    })
    .catch(function(err){
        res.status(500).json({err: 505, msg: "No pudo leer la entidad..."})
    })
})

app.listen(80, function(){
    console.log("El server esta ON sarpado.")
});