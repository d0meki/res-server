
const { Router } = require('express')
const { check } = require('express-validator')
const { obtenerProducto, crearProducto, actualizarProducto, borrarProducto, obtenerProductos } = require('../controllers/productos')
const { existeCategoriaPorId, existeProductoPorId } = require('../helpers/db-validators')
const { validarJWT, esAdminRole } = require('../middlewares')
const { validarCampos } = require('../middlewares/validar-campos')

const router = Router()


//obtener todas las categorias  - publico
router.get('/',obtenerProductos)

//una categoria espesifica - publico
router.get('/:id',[
    check('id','No es un id valido').isMongoId(),
    check('id').custom( existeProductoPorId ),
    validarCampos
], obtenerProducto)


//crear una nueva categoria - privado - cualquier persona con un token valido
router.post('/',[
    validarJWT,
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    check('categoria','No es un id valido').isMongoId(),
    check('categoria').custom( existeCategoriaPorId ),
    validarCampos
], crearProducto)


//para actualizar por id  - privado - cualquier persona con un token valido

router.put('/:id',[
    validarJWT,
    //check('categoria','No es un id valido').isMongoId(),
    check('id').custom( existeProductoPorId ),
    validarCampos
], actualizarProducto)

//borrar una categoria   - Admin  --  solo cambiar estado
router.delete('/:id',[
    validarJWT,
    esAdminRole,
    check('id','No es un id valido').isMongoId(),
    check('id').custom( existeProductoPorId ),
    validarCampos
], borrarProducto)


module.exports = router