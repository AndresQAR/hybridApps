import express from "express"
import fs from "fs"

const app = express()

app.listen(2023, function(){
    console.log('Me pude conectar a http://localhost:2023')
})

app.use(express.static('public'))
//Static replaced the functions below 
/*app.get('/andy', function(req, res){
    res.sendFile('E:/clasesDaVinciAndres/4toCuatrimestre/aplicacionesHibridas/clase_6/views/andy.html')
})

app.get('/form', function(req, res){
    res.sendFile('E:/clasesDaVinciAndres/4toCuatrimestre/aplicacionesHibridas/clase_6/views/form.html')
})*/

app.use(express.urlencoded({
    extended:false
}))
//Encoding function for Body data when using POST  

app.get('/hola', function(req, res){
    res.send('Hola amigo')
})

app.post('/save', function(req, res){
    fs.readFile("./data/students.json", function(err, data){
        const students = err ? [] : JSON.parse(data.toString())

        let student = {
            name : req.body.name,
        }

        students.push(student)

        fs.writeFile("./data/students.json", JSON.stringify(students), function(err){
            console.log("Te mandaste alta macana pa...")
        })

        res.send("Saving new data...")
    })

})

app.get('/students', function(req, res){
    fs.readFile("./data/students.json", function(err,data){
        const students = JSON.parse(data.toString())

         res.write('<html><body><ul>')
         for(let i=0; i<students.length; i++){
            res.write(`
                <li>
                    Name: ${students[i].name}
                </li>
             `)
         }
         res.write('</ul></body></html>')
         res.end()
    })
})
