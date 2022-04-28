import fs from 'fs'

export async function getAll (){
    return fs.promises.readFile('./data/instrumentos.json')
        .then(function(data){
            const instrumentos = JSON.parse(data)
            return instrumentos.filter(function(e){
                return e.deleted != true
            })
        })

}

export async function create (entity){
    return fs.promises.readFile('./data/instrumentos.json')
        //si pudo leer el archivo pasa a hacer los then
        .then(function(data){
            const instrumentos = JSON.parse(data)
            
            entity.id = instrumentos.length + 1

            instrumentos.push(entity)

            fs.promises.writeFile('./data/instrumentos.json', JSON.stringify(instrumentos))

        })
        // Si pudo guardar el nuevo instrumento devolvera un entity con los datos 
        .then(function(){
            return entity
        })
}

export default {
    getAll,
    create
    
}