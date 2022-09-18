const { Router } = require('express');
const { check } = require('express-validator');
const { login, validateTokenUser } = require('../controllers/auth');
const { validateJWT } = require('../middlewares');
const { validateField } = require('../middlewares/validate-field');

const router = Router();

router.post('/login', [
    check('email', 'El correo es obligatorio').isEmail(),
    check('password', 'La contraseña es obligatoria').not().isEmpty(),
    validateField
],login );

router.get('/',[
    validateJWT
], validateTokenUser );

module.exports = router;