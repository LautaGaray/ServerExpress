const express = require('express');
const app = express();
const PORT = 8080

const server = app.listen(PORT, () =>{
    console.log('puerto 8080 activo...');
});
server.on("error", error => console.log(`Error en el servidor ${error}`));

app.get('/productos', (req , res) =>{
    let productos = new Contenedor('productos');
    let arrayProductos = productos.getAll()
    res.send({
        arrayProductos
    });
});

app.get('/productoRandom', (req , res) =>{

    function getProductoRandom(array){
        let max = array.length;
        let x = 0;     
        if(max > 0){
             x = Math.floor(Math.random()*(max+1));        
        }
        return x; 
    }
    let productos = new Contenedor('productos');
    let arrayProductos = productos.getAll()
    let productoRandom =  getProductoRandom(arrayProductos);
    res.send({
        productoRandom
    });
});

class Contenedor{
    constructor(archivo){
        this.nombre = archivo
    }
    async Save(obj){
        try{    
            let generarIndice = await fs.promises.readFile(this.nombre+'.txt', 'utf-8'); 
            let arrayToInsert = []
            let arrayOriginal = (generarIndice.length > 0) ? generarIndice.toArray() : [];
            
            if(indice == 0){
                indice += 1;
            }
               
            var objeto = new Object({
                id: indice,
                producto: {obj}
            })             
            arrayOriginal.push(objeto);
            let save = await fs.promises.appendFile(this.nombre +'.txt', arrayOriginal);
            console.log('archivo' + ' ' + this.nombre + ' ' + 'guardado...');
    
        }catch(error){
            console.log(error)
        }
    }
    async getById(idToFind){
        try{
        let findObjeto = await fs.promises.readFile(this.nombre+'.txt', 'utf-8');        
        let indice = findObjeto.findIndex(x => x.id == idToFind);
        if(indice != -1){
            return findObjeto[indice];
        }
        else{
            console.log('no se encuentra el objeto buscado');
        }
    }catch(error){
        console.log(error);
    }

    }
    async getAll(){
        try{
        let buscarObjetos = await fs.promises.readFile(this.nombre+'.txt', 'utf-8'); 
        return array = f(buscarObjetos.length > 0) ? buscarObjetos.toArray() : [];                 
    }
    catch(error){
        console.log(error);
    }
  }
  deleteById(id){
      try{          
          let all = this.getAll();
          let deleted = all.filter(x => x.id == id);
          await fs.promises.writeFile(this.nombre + '.txt', JSON.stringify(deleted));
      }catch(error){
          console.log(error);
      }
  }
  async deletedAll(){
      try{
          let overWriting = "";
        await fs.promises.writeFile(this.nombre + '.txt', overWriting);
      }catch(error){
          console.log(error);
      }
  }
}


