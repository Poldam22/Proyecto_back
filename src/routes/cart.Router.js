const express = require('express')


const { Router } = express;
const carritosRouter = new Router();


// importamos la clase Container
const ContenedorArchivo = require('../contenedores/ContenedorArchivosCarritos')

// Se instancia la clase contenedor
const ProductService = new ContenedorArchivo("db/dbCarritos.json")



// Endpoints
carritosRouter.post('/', async (req, res) => {
    // logica
    const elem = req.body
    const guardarCarrito = ProductService.guardar(elem)
    guardarCarrito.then(a=>res.send(a))
})

carritosRouter.delete('/:id', async (req, res) => {
    // logica
    const {id} = req.params
    const borrarCarrito = ProductService.borrar(id)
    borrarCarrito.then(a=>res.send(a))
})

carritosRouter.get('/:id/products', async (req, res) => {
    // logica
    const {id} = req.params
    const carrito = ProductService.listar(id)
    carrito.then(a=>res.json(a))
    
})


carritosRouter.post('/:id/products', async (req, res) => {
    // logica
    const {id} = req.params
    const elem = req.body
    const actualizacionCarrito = ProductService.actualizar(elem, id) 
    actualizacionCarrito.then(a=>res.send(a))
})


carritosRouter.delete('/:id/products/:idprod', async (req, res) => {
    // logica
    const {id} = req.params
    const {idprod} = req.params
    const borrarProd = ProductService.borrar(id, idprod)
    borrarProd.then(a=> res.send(a))
})

module.exports = carritosRouter