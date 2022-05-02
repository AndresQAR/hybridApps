import * as studentsModel from '../services/students.service.js'

function getByID (req, res) {
  const id = parseInt(req.params.studentId)

  studentsModel.findByID(id)
    .then(function (student) {
      if (student) {
        res.status(200).json(student)
      } else {
        res.status(404).json({ message: `Student #${id} cannot be found` })
      }
    })
}

function getAll (req, res) {
  studentsModel.find()
    .then(function (student) {
      res.status(200).json(student)
    })
}

function create (req, res) {
  const student = req.body
  studentsModel.create(student)
    .then(function (newStudent) {
      res.status(201).json(newStudent)
    })
    .catch(function (err) {
      res.status(500).json({ err })
    })
}

function remove (req, res) {
  const id = parseInt(req.params.studentId)

  studentsModel.remove(id)
    .then(function (student) {
      if (student) {
        res.status(200).json(student)
      } else {
        res.status(404).json({ message: `Student #${id} cannot be found` })
      }
    })
    .catch(function (err) {
      res.status(500).json({ err })
    })
}

function replace (req, res) {
  const id = parseInt(req.params.studentId)
  const studentData = req.body

  studentsModel.replace(id, studentData)
    .then(function (student) {
      if (student) {
        res.status(200).json(student)
      } else {
        res.status(404).json({ message: `Student #${id} cannot be found` })
      }
    })
    .catch(function (err) {
      res.status(500).json({ err })
    })
}

export default {
  getByID,
  getAll,
  create,
  remove,
  replace
}
