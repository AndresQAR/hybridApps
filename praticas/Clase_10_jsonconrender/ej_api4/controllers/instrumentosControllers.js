import repository from "../repositories/instrumentosRepository.js"

export function listar (req, res){ //Controlador
    repository.getAll()
        .then(function(instrumentos){
            res.render ( 
                "listarInstrumentos", //vista
                { list: instrumentos }//modelo
            )
        })
        .catch(function(err){
            res.status(500).send(err.message)
        })
}

export function formularioNuevo (req, res) {
    res.render("formulario.ejs", {})
}

export function crearNuevo (req, res){
    repository.create(req.body)
        .then(function(entity){
            res.render("exito", {entity})
        })
            
}
export default {
    formularioNuevo,
    listar,
    crearNuevo
}