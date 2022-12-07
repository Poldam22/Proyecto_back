const express = require('express')


const { Router } = express;
const productosRouter = new Router();


// importamos la clase Container
const ContenedorArchivo = require('../contenedores/ContenedorArchivo')

// Se instancia la clase contenedor
const ProductService = new ContenedorArchivo("db/dbProductos.json")


// funcion Error
function crearErrorNoEsAdmin(ruta, metodo) {
    const error = {
        error: -1,
    }
    if (ruta && metodo) {
        error.descripcion = `ruta '${ruta}' metodo '${metodo}' no autorizado`
    } else {
        error.descripcion = 'no autorizado'
    }
    return error
}

// Middleware para Administrador
const esAdmin = true

function soloAdmins(req, res, next) {
    if (!esAdmin) {
        res.json(crearErrorNoEsAdmin(req.url, req.method))
    } else {
        next()
    }
}


// Endpoints
productosRouter.get('/', async (req, res) => {
    // logica
    const productosTodos = ProductService.listarAll()
    productosTodos.then(a=> res.json(a))
})
//    -->   /api/productos/5
productosRouter.get('/:id', async (req, res) => {
    // logica
    const {id} = req.params
    const producto = ProductService.listar(id)
    producto.then(a=>res.json(a))
})

// tiene permisos un admin
productosRouter.post('/', soloAdmins, async (req, res) => {
    const elem = req.body
    const guardarProducto = ProductService.guardar(elem)
    guardarProducto.then(a => res.send(a))
})

productosRouter.put('/:id', soloAdmins, async (req, res) => {
    // logica
    const {id} = req.params
    const idnum = parseInt(id)
    const elem = req.body
    const actualizarProduct = ProductService.actualizar(elem, idnum)
    actualizarProduct.then(a=>res.send(a))
})

productosRouter.delete('/:id', soloAdmins, async (req, res) => {
    // logica
    const {id} = req.params 
    const productoBorrar = ProductService.borrar(id)
    productoBorrar.then(a=>res.send(a))
})


module.exports = productosRouter