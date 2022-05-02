import express from 'express'
import studentsControllers from '../controllers/students.controllers.js'
import studentsApiControllers from '../controllers/students.api.controllers.js'

const route = express.Router()

route.get('/students', studentsControllers.viewAll)

route.get('/student', studentsControllers.viewOne)

route.post('/save', studentsControllers.create)

route.get('/api/students/:studentId', studentsApiControllers.getByID)
route.get('/api/students', studentsApiControllers.getAll)
route.post('/api/students', studentsApiControllers.create)
route.delete('/api/students/:studentId', studentsApiControllers.remove)
route.put('/api/students/:studentId', studentsApiControllers.replace)

export default route
