const validateJWT = require('../middlewares/validate-jwt');
const validateField = require('../middlewares/validate-field')
const validateRoles = require('../middlewares/validate-role');
const validarArchivo = require('../middlewares/validar-archivo');

module.exports = {
    ...validateJWT,
    ...validateField,
    ...validateRoles,
    ...validarArchivo
}