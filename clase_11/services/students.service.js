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

export default { findByID, find }
