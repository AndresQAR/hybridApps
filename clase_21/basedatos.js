import MongoDB from 'mongodb'
const client = new MongoDB.MongoClient('mongodb://127.0.0.1:27017')

client.connect()
  .then(async function () {
    console.log('Me pude conectar')
    const db = client.db('Clase15')
    const students = await db.collection('Alumnos').find().toArray()
    console.log(students)
    client.close()
  })
  .catch(function () {
    console.log('No me pude conectar')
  })
