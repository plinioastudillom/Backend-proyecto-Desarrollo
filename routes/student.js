const { Router } = require('express');
const { check } = require('express-validator');

const {
    validateJWT,
    validateField,
    hasRole,
    isAdminRole
} = require('../middlewares');

const {studentPost, studentsGet, studentDelete, getStudent, studentPut } = require('../controllers/student');

const router = Router();

router.get('/', [validateJWT], studentsGet );

router.post('/', [
    validateJWT,
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('lastname', 'El apellido es requerido').not().isEmpty(),
    
    //check('img', 'imagen es obligatoria').not().isEmpty(),
    validateField
], studentPost );

router.put('/:id', [
    validateJWT,
    check('id', 'No es un ID valido').isMongoId(),
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('lastname', 'El apellido es requerido').not().isEmpty(),
    validateField
], studentPut );

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