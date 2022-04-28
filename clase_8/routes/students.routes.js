import express from "express"
import fs from "fs"
import studentsControllers from "../controllers/students.controllers.js"

const route = express.Router()

route.get('/students', studentsControllers.viewAll)

route.get('/student', studentsControllers.viewOne)

route.post('/save', studentsControllers.create)

export default route