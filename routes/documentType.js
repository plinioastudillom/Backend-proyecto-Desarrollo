const { Router } = require('express');
const { check } = require('express-validator');

const { isAdminRole, validateJWT, validateField } = require('../middlewares');

const { documentTypePost,
    getDocumentType
} = require('../controllers/typeDocument');



const router = Router();

//get countrys
router.get('/', getDocumentType);

//post country
router.post('/', [
    validateJWT,
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    validateField
], documentTypePost );

module.exports = router;