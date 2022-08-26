const { response } = require("express");
const { Categoria } = require("../models");

const crearCategoria = async(req, res = response) => {
    const nombre = req.body.nombre.toUpperCase()
    const categoriaDB = await Categoria.findOne({nombre})
    if (categoriaDB) {
        return res.status(400).json({
            msg: `la categoria ${ categoriaDB.nombre}, ya existe`
        })
    }
    //generar la data a aguardar

    const data = {
        nombre,
        usuario: req.usuario._id
    }

    const categoria = new Categoria( data )

    //guardar en db
    await categoria.save()

    res.status(201).json(categoria)
}


module.exports = {
    crearCategoria
}