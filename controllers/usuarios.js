const { response, request } = require('express')
const Usuario = require('../models/usuario')
const bcrypt = require('bcryptjs')
const usuariosGet = async (req = request, res = response) => {
    //res.send('Hello World')
    const { limite = 5, desde = 0 } = req.query
    const query = { estado: true }

    // const usuarios = await Usuario.find()
    //         .skip(Number(desde))
    //         .limit(Number(limite))
    const [total, usuarios] = await Promise.all([
        Usuario.countDocuments(query),
        Usuario.find(query)
            .skip(Number(desde))
            .limit(Number(limite))
    ])


    //en caso de que vengan con parametros
    //const query = req.query
    res.json({
        //  msg:'get Api - controlador-GET',
        //  query
        total,
        usuarios
    })
}
const usuariosPost = async (req = request, res = response) => {
    //VALIDAMOS CUELQUIER ERROR
    //const body = req.body
    const { nombre, correo, password, rol } = req.body
    const usuario = new Usuario({ nombre, correo, password, rol })
    //VERIFICAR SI EL CORREO YA EXISTE
    // const existeEmail = await Usuario.findOne({correo:correo})
    // if (existeEmail) {
    //     return res.status(400).json({
    //         msg: 'este correo ya esta registrado'
    //     })
    // }

    //ENCRIPTAR LA CONTRASEÑA
    const salt = bcrypt.genSaltSync();
    usuario.password = bcrypt.hashSync(usuario.password, salt)
    //GUARDAR EN LA BD
    //const usuario = new Usuario(body)
    await usuario.save()
    //const {nombre,edad} = req.query
    res.json({
        msg: 'get Api - controlador-POST',
        usuario
        //body
        // nombre,
        // edad
    })
}
const usuariosPut = async (req, res = response) => {

    const { id } = req.params

    const { _id, correo, password, google, ...resto } = req.body //excluimos lo que no queremos actualizar
    if (password) {
        const salt = bcrypt.genSaltSync();
        resto.password = bcrypt.hashSync(password, salt)
    }
    const usuario = await Usuario.findByIdAndUpdate(id, resto)

    res.json({
        msg: 'get Api - controlador-PUT',
        //  id
        usuario
    })
}
const usuariosDelete = async (req, res = response) => {
    const {id} = req.params
    //borrado fisicamente
    const usuario = await Usuario.findByIdAndDelete(id)
    res.json({
        //id
        usuario
    })
}



module.exports = {
    usuariosGet, usuariosPost, usuariosPut, usuariosDelete
}