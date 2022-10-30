const { Router } = require('express');
const { check } = require('express-validator');

const { isAdminRole, validateJWT, validateField } = require('../middlewares');

const { studentDocumentPost,
    getStudentDocuments,
    getStudentDocument
} = require('../controllers/studentDocument');



const router = Router();

//get documents
router.get('/', getStudentDocuments);

router.get('/:id', [
    validateJWT,
    //isAdminRole,
    check('id', 'No es un ID valido').isMongoId(),
    validateField   
], getStudentDocument )

//post country
router.post('/', [
    validateJWT,
    check('documentName', 'El nombre es obligatorio').not().isEmpty(),
    validateField
], studentDocumentPost );

module.exports = router;