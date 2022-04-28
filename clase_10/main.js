import express from 'express'
import studentsRoutes from './routes/students.routes.js'
const app = express()
app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: false }))
app.use('/', express.static('public'))
app.use('/', studentsRoutes)

app.listen(2024, function () { console.log('Me pude conectar a http://localhost:2024') })
