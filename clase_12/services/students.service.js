import fs from 'fs'

export async function find () {
  return fs.promises.readFile('./data/students.json')
    .then(function (data) {
      return JSON.parse(data.toString())
    })
    .catch(function (data) {
      return []
    })
}

export async function findByID (id) {
  return find()
    .then(function (students) {
      for (let i = 0; i < students.length; i++) {
        if (students[i].id === id) {
          return students[i]
        }
      }
    })
}

export async function create (student) {
  let newStudent = null
  return find()
    .then(function (students) {
      newStudent = { ...student, id: students.length + 1 }
      students.push(newStudent)
      return fs.promises.writeFile('./data/students.json', JSON.stringify(students))
    })
    .then(function () {
      return newStudent
    })
}

export default { findByID, find, create }
