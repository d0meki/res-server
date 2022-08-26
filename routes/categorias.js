
const { Router } = require('express')
const { check } = require('express-validator')
const { crearCategoria } = require('../controllers/categorias')
const { validarJWT } = require('../middlewares')
const { validarCampos } = require('../middlewares/validar-campos')

const router = Router()


//obtener todas las categorias  - publico
router.get('/', (req,res)=>{
    res.json('get');
})

//una categoria espesifica - publico
router.get('/:id', (req,res)=>{
    res.json('get - id');
})


//crear una nueva categoria - privado - cualquier persona con un token valido
router.post('/',[
    validarJWT,
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    validarCampos
], crearCategoria)


//para actualizar por id  - privado - cualquier persona con un token valido

router.put('/:id', (req,res)=>{
    res.json('post');
})

//borrar una categoria   - Admin  --  solo cambiar estado
router.delete('/:id', (req,res)=>{
    res.json('delete');
})


module.exports = router