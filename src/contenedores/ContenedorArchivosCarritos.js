// const { promises: fs } = require('fs')
const fs = require('fs');


class ContenedorArchivoCarritos {

    constructor(ruta) {
        this.ruta = ruta;
    }

    async listar(id) {
        try {
            const leer = await fs.promises.readFile(this.ruta,"utf-8")
            const data = JSON.parse(leer);
            const obj = data.find(e => e.id == id);
            if (!obj){
                return null
            } 
            return obj.products
            
        } catch (error) {
            console.log(error);
        }
    }

    async listarAll() {
        try {
            const leer = await fs.promises.readFile(this.ruta,"utf-8")
            return JSON.parse(leer)
        } catch (error) {
            console.log('no se pudo leer');
        }
    }

    async guardar(obj) {
        try {
            const leer = await fs.promises.readFile(this.ruta,"utf-8")
            const data = JSON.parse(leer);
            let id = 0;
            let timeStamp = Date.now()
            data.length == 0 ? (id=1) : (id=data[data.length-1].id + 1);
            const newProduct = {...obj, id, timeStamp};
           const datacarrito = newProduct.products
           
            const timeStProd = Date.now()
            if (datacarrito.length) {
                for(let i = 0; i<datacarrito.length; i++){
                let idprod = i +1;
                let carFull ={...datacarrito[i], idprod, timeStProd}
            
                newProduct.products[i] = carFull}
                data.push(newProduct)

            }
            
            await fs.promises.writeFile(this.ruta, JSON.stringify(data,null,2), "utf-8")
            return (`Carrito guardado: id= ${id}`)
            
        } catch (e) {
            console.log(e);
        }
    }

    async actualizar(elem, id) {
       
        const leer = await fs.promises.readFile(this.ruta,"utf-8")
        const data = JSON.parse(leer);
        const posicion = data.findIndex(e =>e.id == id )
            if(posicion > 0){
                const idprod = data[posicion].products.length + 1
                const timeStProd = Date.now()
                const sumarobj = {...elem, idprod, timeStProd}
                data[posicion].products.push(sumarobj)
                await fs.promises.writeFile(this.ruta, JSON.stringify(data,null,2), "utf-8")
                return (`Productos incorporados al carrito: id=${id}`)
            }else{
                return ({error:'producto no encontrado'})
            }
    }

    async borrar(id, idprod) {
        try {
            const leer = await fs.promises.readFile(this.ruta,"utf-8")
            const data = JSON.parse(leer);
            const obj = data.find(e => e.id == id);
            let prod = obj.products.find(a=>a.idprod == idprod)
            const index = obj.products.indexOf(prod)
            obj.products.splice(index,1);
           
            await fs.promises.writeFile(this.ruta, JSON.stringify(data,null,2), "utf-8")
            return ("Producto borrado")
        } catch (error) {
            console.log(error);
        }
    }

    async borrarAll() {
        try {
            await fs.promises.writeFile(this.ruta, JSON.stringify([],null,2), "utf-8")
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = ContenedorArchivoCarritos