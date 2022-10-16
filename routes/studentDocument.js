const { Router } = require('express');
const { check } = require('express-validator');

const { isAdminRole, validateJWT, validateField } = require('../middlewares');

const { studentDocumentPost,
    getStudentDocument
} = require('../controllers/studentDocument');



const router = Router();

//get countrys
router.get('/', getStudentDocument);

//post country
router.post('/', [
    validateJWT,
    check('documentName', 'El nombre es obligatorio').not().isEmpty(),
    validateField
], studentDocumentPost );

module.exports = router;