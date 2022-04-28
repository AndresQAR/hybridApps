import express from 'express'
import path from 'path'
import fs from 'fs'

		
const app = express()

app.use("/", express.static('./public'))
app.listen(1880, function(){
    console.log('Me pude conectar a http://localhost:1880')
})
app.use(express.urlencoded({
    extended:false
}))

app.get('/new', function(req, res){
    res.sendFile('views/new.html', {root: path.resolve()})
})
app.post('/new', function(req, res){
    fs.readFile('./data/persons.json', function(err, data){
        const persons = err ? [] : JSON.parse(data.toString())

        let person = {
            name: req.body.name,
            type: req.body.type
        }

        persons.push(person)

        fs.writeFile("./data/persons.json", JSON.stringify(persons), function(err){
            console.log("Hubo un error, intentalo mas tarde...")
        })
        
        res.send("Los datos se han guardado...")
    })
})
app.get('/persons', function(req, res){
    fs.readFile('./data/persons.json', function(err, data){
        const persons = err ? [] : JSON.parse(data.toString())

        res.write('<!DOCTYPE HTML><html lang="es">')
        res.write('<head><meta charset="UTF-8"><meta http-equiv="X-UA-Compatible" content="IE=edge"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>Persons</title><link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;700&display=swap" rel="stylesheet"><link rel="stylesheet" href="css/estilos.css"/></head><body><header><h1>Personas agregadas</h1></header><ul>')
        
        for(let i=0; i<persons.length; i++){
           res.write(`
               <li>
                   <span>Nombre: ${persons[i].name}</span>   
                   Tipo: ${persons[i].type}
               </li>
            `)
        }
        res.write('</ul></body></html>')
        res.end()
    })
})