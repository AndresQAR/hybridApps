import express from 'express'
import { readFile } from 'fs';
import path from 'path'

const app = express()

app.use(express.static('public'))
//(Parse Body Url Encode)Se usa el urlencoded para que el express pueda intreprar en codigo encoded recibido en el body de post
app.use(express.urlencoded({extended: true}))

app.get('/contact', function(req, res){
    readFile('./view/contact.html', function(err, data){
        const html = data.toString().replace('<<nombre>>', req.query.nombre || '').replace('<<email>>', req.query.email || '')

        res.send(html)
    }) 
});

app.post('/contact', function(req, res){
    readFile('./view/contact.html', function(err, data){
        const html = data.toString().replace('<<nombre>>', req.body.nombre || '').replace('<<email>>', req.body.email || '')

        res.send(html)
    }) 
})

app.listen(80, function(){
    console.log("El server esta ON sarpado.")
});