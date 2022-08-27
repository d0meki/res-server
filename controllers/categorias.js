const { response } = require("express");
const { Categoria } = require("../models");

const crearCategoria = async (req, res = response) => {
    const nombre = req.body.nombre.toUpperCase()
    const categoriaDB = await Categoria.findOne({ nombre })
    if (categoriaDB) {
        return res.status(400).json({
            msg: `la categoria ${categoriaDB.nombre}, ya existe`
        })
    }
    //generar la data a aguardar

    const data = {
        nombre,
        usuario: req.usuario._id
    }

    const categoria = new Categoria(data)

    //guardar en db
    await categoria.save()

    res.status(201).json(categoria)
}

//obtener categorias - paginado - total - populate
const obtenerCategorias = async (req, res = response) => {
    const { limite = 5, desde = 0 } = req.query
    const query = { estado: true }

    const [total, categorias] = await Promise.all([
        Categoria.countDocuments(query),
        Categoria.find(query)
            .populate('usuario', 'nombre')
            .skip(Number(desde))
            .limit(Number(limite))
    ])

    res.json({
        total,
        categorias
    })


}
//obtener una sola catgoria
const obtenerCategoria = async (req, res = response) => {
    const { id } = req.params
    const categoria = await Categoria.findById(id).populate('usuario', 'nombre')
    res.json({
        categoria
    })
}
//actualizar categoria
const actualizarCategoria = async (req, res = response) => {
    const { id } = req.params
    const {usuario,estado, ...data} = req.body
    data.nombre = data.nombre.toUpperCase()
    data.usuario = req.usuario._id
    const categoria = await Categoria.findOneAndUpdate(id,data,{new:true})
    res.json({
        categoria
    })
}
//eliminar categoria
const borrarCategoria = async (req, res = response) => {
    const { id } = req.params

    const categoriaBorrada = await Categoria.findOneAndUpdate(id,{estado: false},{new:true})
    res.json({
        categoriaBorrada
    })
}
module.exports = {
    crearCategoria,
    obtenerCategorias,
    obtenerCategoria,
    actualizarCategoria,
    borrarCategoria
}