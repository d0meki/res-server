
const { Categoria, Producto } = require('../models')
const Role = require('../models/role')
const Usuario = require('../models/usuario')
const esRolValido = async(rol='')=>{
    const existeRol = await Role.findOne({rol})
    if (!existeRol) {
        throw new Error(`el rol ${ rol } no está registrado en la BD`)
    }
}

const esteEmailExiste = async(correo='')=>{
    const existeEmail = await Usuario.findOne({correo})
    if (existeEmail) {
        throw new Error(`el correo ${ correo } ya existe en la BD`)
    }
} 
const existeUsuarioPorId = async(id)=>{
   const existeId = await Usuario.findById(id)

    if (!existeId) {
        throw new Error(`el Id ${ id } no existe`)
    }
} 
const existeCategoriaPorId = async(id)=>{
   const  existeIdCategoria = await Categoria.findById(id)

    if (!existeIdCategoria) {
        throw new Error(`el Id ${ id } no existe`)
    }
} 

const existeProductoPorId = async(id)=>{
    const  existeIdProducto = await Producto.findById(id)
 
     if (!existeIdProducto) {
         throw new Error(`el Id ${ id } no existe`)
     }
 } 

module.exports = {
    esRolValido,
    esteEmailExiste,
    existeUsuarioPorId,
    existeCategoriaPorId,
    existeProductoPorId
}