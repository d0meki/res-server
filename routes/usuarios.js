
const { Router } = require('express')
const { check } = require('express-validator')
const { validarCampos } = require('../middlewares/validar-campos')
const { usuariosGet, usuariosPost, usuariosPut } = require('../controllers/usuarios')
const { esRolValido, esteEmailExiste, existeUsuarioPorId } = require('../helpers/db-validators')


const router = Router()

router.get('/',usuariosGet)
router.post('/',[
    check('nombre','el nombre es obligatorio').not().isEmpty(),
    check('password','el password debe ser de mas de 6 caracteres').isLength({min:6}),
    check('correo','el correo no es valido').isEmail(),
    check('correo').custom(esteEmailExiste),
    //check('rol','no es un rol valido').isIn(['ADMIN_ROL','USER_ROL']),
    check('rol').custom(esRolValido), // (rol)=>esRolValido(rol) se puede simplificar 
    validarCampos
],usuariosPost)
router.put('/:id',[
    check('id','No es un id valido').isMongoId(),
    check('id').custom(existeUsuarioPorId),
    check('rol').custom(esRolValido),
    validarCampos
],usuariosPut)



module.exports = router