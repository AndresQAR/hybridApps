import express, { json } from 'express'
// Importamos muestro archivo router para luego indicarle a express que lo use
import routerAPI from './routers/instrumentosRoutersAPI.js'
// Importamos muestro archivo routerWeb para luego indicarle a express que lo use
import routerWeb from './routers/instrumentosRouterWeb.js'

const app = express()

app.set('views', './views'); // specify the views directory
app.set('view engine', 'ejs'); // register the template engine

// Para que la info recibida en el body este en formato json
app.use(express.json())
// Para que la info recibida en el body este en formato Url encoded
app.use(express.urlencoded({extended: true}))

// Le indicamos a express que use nuestro nuevo Router (router del api)
app.use(routerAPI)

// Le indicamos a express que use nuestro nuevo Router para el index de la pagina
app.use(routerWeb)

// Pasamos todos los routes-api al archivo /routes/instrumentosRouterAPI.js

app.listen(80, function(){
    console.log("El sever esta ON paaaa") 
})

