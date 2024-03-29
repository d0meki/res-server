
const { Router } = require('express')
const { check } = require('express-validator')
const { crearCategoria, obtenerCategorias, obtenerCategoria, actualizarCategoria, borrarCategoria } = require('../controllers/categorias')
const { existeCategoriaPorId } = require('../helpers/db-validators')
const { validarJWT, esAdminRole } = require('../middlewares')
const { validarCampos } = require('../middlewares/validar-campos')

const router = Router()


//obtener todas las categorias  - publico
router.get('/' ,obtenerCategorias)

//una categoria espesifica - publico
router.get('/:id',[
    check('id','No es un id valido').isMongoId(),
    check('id').custom( existeCategoriaPorId ),
    validarCampos
], obtenerCategoria)


//crear una nueva categoria - privado - cualquier persona con un token valido
router.post('/',[
    validarJWT,
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    validarCampos
], crearCategoria)


//para actualizar por id  - privado - cualquier persona con un token valido

router.put('/:id',[
    validarJWT,
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    check('id').custom( existeCategoriaPorId ),
    validarCampos
], actualizarCategoria)

//borrar una categoria   - Admin  --  solo cambiar estado
router.delete('/:id',[
    validarJWT,
    esAdminRole,
    check('id','No es un id valido').isMongoId(),
    check('id').custom( existeCategoriaPorId ),
    validarCampos
], borrarCategoria)


module.exports = router