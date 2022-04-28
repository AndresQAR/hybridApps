import fs from 'fs'

function viewAll(req, res){
    fs.readFile("./data/students.json", function(err,data){
        const students = err ? [] : JSON.parse(data.toString())

        res.render('students', {students})
    })
}

function viewOne(req, res){
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
}

function create(req, res){
    fs.readFile("./data/students.json", function(err, data){
        const students = err ? [] : JSON.parse(data.toString())

        let student = {
            id: students.length +1, 
            name : req.body.name
        }

        students.push(student)

        fs.writeFile("./data/students.json", JSON.stringify(students), function(err){
            console.log("Te mandaste alta macana pa...")
        })

        res.redirect("/students")
    })
}

export default{
    viewAll,
    viewOne,
    create
}