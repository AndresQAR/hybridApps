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
//Encoding function above is for Body data when using POST  

app.get('/hello', function(req, res){
    res.send('Hi fella')
})

app.post('/save', function(req, res){
    fs.readFile("./data/students.json", function(err, data){
        const students = err ? [] : JSON.parse(data.toString())

        let student = {
            id: students.length +1, 
            name : req.body.name,
        }

        students.push(student)

        fs.writeFile("./data/students.json", JSON.stringify(students), function(err){
            console.log("Te mandaste alta macana pa...")
        })

        res.redirect("/students")
    })

})

app.get('/students', function(req, res){
    fs.readFile("./data/students.json", function(err,data){
        const students = err ? [] : JSON.parse(data.toString())

        res.write("<a href='/form.html'>New Student</a>")

         res.write('<html><body><ul>')
         for(let i=0; i<students.length; i++){
            res.write(`
                <li>
                    Name: ${students[i].name}   <a href="/student?id=${students[i].id}">More</a>
                </li>
             `)
         }
         res.write('</ul></body></html>')
         res.end()
    })
})

app.get('/student', function(req, res){
    const id = parseInt(req.query.id)

    fs.readFile("./data/students.json", function(err, data){
        const students = err ? [] : JSON.parse(data.toString())

        let student = null

        for(let i=0; i<students.length; i++){
            if(students[i].id === id){
                student = students[i]
            }
        }

        if(student){
            res.send(`
                <html>
                    <body>
                        <h1>Name: ${student.name}</h1>
                        <h2>ID: ${student.id}</h2>
                    </body>
                </html>
            `)
        }else{
            res.status(404).send(`The ID #${student.id} does not exist...`)
        }
    })
})
