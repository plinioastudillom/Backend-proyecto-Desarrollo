

const dbValidators = require('./db-validators');
const generateJWT   = require('./generate-jwt');
const subirArchivo = require('./subir-archivo');


module.exports = {
    ...dbValidators,
    ...generateJWT,
    ...subirArchivo,
}