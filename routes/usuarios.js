
const { Router } = require('express');
const { check } = require('express-validator');

const {
    validateJWT,
    validateField,
    hasRole,
    isAdminRole
} = require('../middlewares')

const { isValidateRol, emailExist, userIdExist } = require('../helpers/db-validators')

const { usuariosGet,
        usuariosPut,
        usuariosPost,
        usuariosDelete,
        usuariosPatch } = require('../controllers/usuarios');


const router = Router();


router.get('/', usuariosGet );

router.put('/:id', [
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom( userIdExist ),
    check('rol').custom( isValidateRol ),
    validateField
], usuariosPut );

router.post('/', [
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'El password deber de ser mas de 6 caracteres').isLength({min :6}),
    check('email', 'El correo no es valido').isEmail(),
    check('email').custom( emailExist ),
    check('rol').custom( isValidateRol ),
    validateField
], usuariosPost );

router.delete('/:id', [
    validateJWT,
    //isAdminRole,
    hasRole('ROLE_ADMIN', 'SALES_ROLE'),
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom( userIdExist ),
    validateField   
], usuariosDelete );

router.patch('/', usuariosPatch );

module.exports = router;