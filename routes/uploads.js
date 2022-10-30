const { Router } = require('express');
const { check } = require('express-validator');

const { validateField, validarArchivoSubir } = require('../middlewares');
const { cargarArchivo, actualizarImagen, mostrarImagen, eliminarImagen } = require('../controllers/uploads');
const { coleccionesPermitidas } = require('../helpers');


const router = Router();


router.post( '/', validarArchivoSubir, cargarArchivo );

// router.put('/:coleccion/:id', [
//     validarArchivoSubir,
//     check('id','El id debe de ser de mongo').isMongoId(),
//     check('coleccion').custom( c => coleccionesPermitidas( c, ['usuarios','productos'] ) ),
//     validateField
// ], actualizarImagenCloudinary )
// ], actualizarImagen )

router.get('/:coleccion/:id', [
    // check('id','El id debe de ser de mongo').isMongoId(),
    check('coleccion').custom( c => coleccionesPermitidas( c, ['students'] ) ),
    validateField
], mostrarImagen  );

router.delete('/:coleccion/:id/:imageName', [
    // check('id','El id debe de ser de mongo').isMongoId(),
    check('coleccion').custom( c => coleccionesPermitidas( c, ['students'] ) ),
    validateField
], eliminarImagen  )



module.exports = router;