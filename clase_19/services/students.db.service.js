import MongoDB from 'mongodb'
const client = new MongoDB.MongoClient('mongodb://127.0.0.1:27017')

async function find () {
  return client.connect()
    .then(async function () {
      console.log('Me pude conectar')
      const db = client.db('Clase15')
      const students = await db.collection('Alumnos').find().toArray()
      client.close()
      return students
    })
    .catch(function () {
      console.log('No me pude conectar')
    })
}

export {
  find
}
