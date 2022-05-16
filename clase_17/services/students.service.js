import fs from 'fs'

export async function find (deleted = false) {
  return fs.promises.readFile('./data/students.json')
    .then(function (students) {
      return JSON.parse(students.toString())
    })
    .then(function (students) {
      if (deleted) {
        return students
      }
      const noDeletedStudents = []

      for (let i = 0; i < students.length; i++) {
        if (!students[i].deleted) {
          noDeletedStudents.push(students[i])
        }
      }
      return noDeletedStudents
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
  return find(true)
    .then(function (students) {
      newStudent = { ...student, id: students.length + 1 }
      students.push(newStudent)
      return fs.promises.writeFile('./data/students.json', JSON.stringify(students))
    })
    .then(function () {
      return newStudent
    })
}

export async function remove (id) {
  let student = null
  return find(true)
    .then(function (students) {
      for (let i = 0; i < students.length; i++) {
        if (students[i].id === id) {
          student = students[i]
        }
      }
      if (student) {
        student.deleted = true
        return fs.promises.writeFile('./data/students.json', JSON.stringify(students))
      }
    })
    .then(function () {
      return student
    })
}

export async function replace (id, studentData) {
  let student = null
  return find()
    .then(function (students) {
      let index = -1
      for (let i = 0; i < students.length; i++) {
        if (students[i].id === id) {
          index = i
        }
      }
      if (index !== -1) {
        student = students[index] = {
          ...studentData,
          id
        }
        return fs.promises.writeFile('./data/students.json', JSON.stringify(students))
      }
    })
    .then(function () {
      return student
    })
}

export async function update (id, studentData) {
  let student = null
  return find()
    .then(function (students) {
      let index = -1
      for (let i = 0; i < students.length; i++) {
        if (students[i].id === id) {
          index = i
        }
      }
      if (index !== -1) {
        student = students[index] = {
          ...students[index],
          ...studentData
        }
        return fs.promises.writeFile('./data/students.json', JSON.stringify(students))
      }
    })
    .then(function () {
      return student
    })
}

export default { findByID, find, create, remove, replace }
