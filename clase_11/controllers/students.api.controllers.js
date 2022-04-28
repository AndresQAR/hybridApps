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

export default {
  getByID,
  getAll
}
