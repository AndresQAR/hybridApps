export function listar (req, res){
    res.render("listarInstrumentos", //vista
    // {name: "Andy", type: "Alumno"}) //modelo
    {list:[{id: 1, name: "Andy"}, {id: 2, name: "Joha"}, {id: 3, name: "Bjorn"}] }
    )
}


export function listarNuevo (req, res){
    res.render("formulario", {})    
}
export default {
    listar,
    listarNuevo
}