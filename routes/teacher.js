const { Router } = require('express');
const { check } = require('express-validator');

const {
    validateJWT,
    validateField,
    } = require('../middlewares');

const { usuariosGet,
    teacherGet,
    teacherPost,
    teacherPut,
    teacherDelete } = require('../controllers/teacher');

const router = Router();

router.get('/', teacherGet );

router.put('/:id', [
    check('id', 'No es un ID valido').isMongoId(),
    validateField
], teacherPut );

router.post('/', [
    validateJWT,
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('assignedSchoolGrade', 'El grado al que esta asignado es obligatorio').not().isEmpty(),
    check('birth', 'Fecha de nacimiento obligatoria').not().isEmpty(),
    validateField
], teacherPost );

router.delete('/:id', [
    validateJWT,
    check('id', 'No es un ID valido').isMongoId(),
    validateField   
], teacherDelete );

module.exports = router;