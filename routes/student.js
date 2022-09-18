const { Router } = require('express');
const { check } = require('express-validator');

const {
    validateJWT,
    validateField,
    hasRole,
    isAdminRole
} = require('../middlewares');

const {studentPost } = require('../controllers/student');

const router = Router();

router.post('/', [
    //validateJWT,
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('lastname', 'El password deber de ser mas de 6 caracteres').not().isEmpty(),
    check('schoolGrade', 'El correo no es valido').not().isEmpty(),
    check('img', 'imagen es obligatoria').not().isEmpty(),
    validateField
], studentPost );

module.exports = router;