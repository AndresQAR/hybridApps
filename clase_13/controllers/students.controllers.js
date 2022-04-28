import fs from 'fs'
import { findByID, find } from '../services/students.service.js'

function viewAll (req, res) {
  find()
    .then(function (students) {
      res.render('students', { students })
    })
}

function viewOne (req, res) {
  const id = parseInt(req.query.id)

  findByID(id).then(function (student) {
    if (student) {
      res.render('student', { student })
    } else {
      res.status(404).send(`The ID #${student.id} does not exist...`)
    }
  })
}

function create (req, res) {
  fs.readFile('./data/students.json', function (err, data) {
    const students = err ? [] : JSON.parse(data.toString())

    const student = {
      id: students.length + 1,
      name: req.body.name
    }

    students.push(student)

    fs.writeFile('./data/students.json', JSON.stringify(students), function (err) { console.log('Te mandaste alta macana pa...') })

    res.redirect('/students')
  })
}

export default {
  viewAll,
  viewOne,
  create
}
