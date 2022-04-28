import fs from 'fs';

export function enviarHTML(path,res){
    fs.readFile(path, function(err, data){
        if(!err){
            res.write(data)
            console.log("Termine de leer el archivo", data)
            res.end()
        }else{
            res.write('<h1>Me parece que te mandaste un 404 pa...</h1>')
            res.end()
        }
        
    })
}
