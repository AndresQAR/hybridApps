import express from "express"

const app = express()

app.listen(2022, function(){
    console.log('Me pude conectar a http://localhost:2022')
})

app.get('/andy', function(req, res){
    res.sendFile('E:/clasesDaVinciAndres/4toCuatrimestre/aplicacionesHibridas/clase_5/andy.html')
})

app.get('/hola', function(req, res){
    res.send('Hola amigo')
})
