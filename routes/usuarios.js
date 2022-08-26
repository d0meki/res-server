
const { Router } = require('express')
const { check } = require('express-validator')
const { usuariosGet, usuariosPost, usuariosPut ,usuariosDelete } = require('../controllers/usuarios')
const { esRolValido, esteEmailExiste, existeUsuarioPorId } = require('../helpers/db-validators')

// const { validarCampos } = require('../middlewares/validar-campos')
// const { validarJWT } = require('../middlewares/validar-jswt')
// const { esAdminRole, tieneRole } = require('../middlewares/validar-roles')

const {
    validarCampos,
    validarJWT,
    esAdminRole,
    tieneRole
} = require('../middlewares')

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

router.delete('/:id',[
    validarJWT,
   // esAdminRole, //este middware me dice q a fuerza tiene q ser Admin
    tieneRole('ADMIN_ROLE','VENTAS_ROLE'), //este q puede ser admin o ventas role
    check('id','No es un id valido').isMongoId(),
    check('id').custom(existeUsuarioPorId),
    validarCampos
],usuariosDelete)


module.exports = router