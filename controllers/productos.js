const { response } = require("express");
const { Producto } = require("../models");

const crearProducto = async (req, res = response) => {
    const {estado,usuario,...body} = req.body

    const productoDB = await Producto.findOne({ nombre: body.nombre })
    if (productoDB) {
        return res.status(400).json({
            msg: `El producto ${productoDB.nombre}, ya existe`
        })
    }
    //generar la data a aguardar

    const data = {
        ...body,
        nombre: body.nombre.toUpperCase(),
        usuario: req.usuario._id
    }

    const producto = new Producto(data)

    //guardar en db
    await producto.save()

    res.status(201).json(producto)
}

//obtener categorias - paginado - total - populate
const obtenerProductos = async (req, res = response) => {
    const { limite = 5, desde = 0 } = req.query
    const query = { estado: true }

    const [total, productos] = await Promise.all([
        Producto.countDocuments(query),
        Producto.find(query)
            .populate('usuario', 'nombre')
            .populate('categoria', 'nombre')
            .skip(Number(desde))
            .limit(Number(limite))
    ])

    res.json({
        total,
        productos
    })
}
//obtener una sola catgoria
const obtenerProducto = async (req, res = response) => {
    const { id } = req.params
    const producto = await Producto.findById(id)
                    .populate('usuario', 'nombre')
                    .populate('categoria', 'nombre')
    res.json({
        producto
    })
}
//actualizar categoria
const actualizarProducto = async (req, res = response) => {
    const { id } = req.params
    const {usuario,estado, ...data} = req.body
    
    if (data.nombre) {
        data.nombre = data.nombre.toUpperCase()
        
    }
        data.usuario = req.usuario._id

    const producto = await Producto.findOneAndUpdate(id,data,{new:true})
    res.json({
        producto
    })
}
//eliminar categoria
const borrarProducto = async (req, res = response) => {
    const { id } = req.params

    const productoBorrada = await Producto.findOneAndUpdate(id,{estado: false},{new:true})
    res.json({
        productoBorrada
    })
}
module.exports = {
    crearProducto,
    obtenerProductos,
    obtenerProducto,
    actualizarProducto,
    borrarProducto
}