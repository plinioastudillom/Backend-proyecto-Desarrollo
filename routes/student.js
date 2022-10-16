const { Router } = require('express');
const { check } = require('express-validator');

const {
    validateJWT,
    validateField,
    hasRole,
    isAdminRole
} = require('../middlewares');

const {studentPost, studentsGet, studentDelete, getStudent } = require('../controllers/student');

const router = Router();

router.get('/', [validateJWT], studentsGet );

router.post('/', [
    validateJWT,
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('lastname', 'El password deber de ser mas de 6 caracteres').not().isEmpty(),
    check('schoolGrade', 'El correo no es valido').not().isEmpty(),
    //check('img', 'imagen es obligatoria').not().isEmpty(),
    validateField
], studentPost );

router.get('/:id', [
    validateJWT,
    //isAdminRole,
    check('id', 'No es un ID valido').isMongoId(),
    validateField   
], getStudent )

router.delete('/:id', [
    validateJWT,
    //isAdminRole,
    check('id', 'No es un ID valido').isMongoId(),
    validateField   
], studentDelete )

module.exports = router;