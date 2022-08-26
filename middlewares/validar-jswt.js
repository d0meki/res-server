
const { response } = require('express')
const jwt = require('jsonwebtoken')
const Usuario = require('../models/usuario')

const validarJWT = async(req, res = response, next)=>{
    const token = req.header('x-token')
    //por si no lo envian
    if (!token) {
        return res.status(401).json({
            msg: 'No hay token en la peticion'
        })
    }
    //para verificar si es un token valido
    try {
        const {uid} =  jwt.verify(token, process.env.SECRETORPRIVATEKEY)
        const usuario = await Usuario.findById( uid )
        
    //si el usuario noe xiste en la BD

    if (!usuario) {
        return res.status(401).json({
            msg: 'token no valido - usuario no existe en la BD'
        })
    }


    //verificar si el uid tiene estado en true

    if (!usuario.estado) {
        return res.status(401).json({
            msg: 'token no valido - usuario con estado : false'
        })
    }



        req.usuario = usuario

        next()
    } catch (error) {
        console.log(error);
        res.status(401).json({
            msg: 'Token no valido'
        })
    }
    
}

module.exports = {
    validarJWT
}