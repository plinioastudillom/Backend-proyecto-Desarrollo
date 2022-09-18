const { response, request } = require('express');
const jwt = require('jsonwebtoken');

const User = require('../models/user');

const validateJWT = async (req = request, res = response, next) => {

    const token = req.header('x-token');
    
    if( !token ) {
        return res.status(401).json({
            msg: 'No existe token en la petición'
        });
    }

    try {
        const { uid } = jwt.verify( token, process.env.SECRETKEY);

        const user = await User.findById(uid);

        if( !user ){
            res.status(401).json({
                msg: 'usuario no existe'
            });
        }
        //verify status true
        if( !user.status ){
            res.status(401).json({
                msg: 'usuario inactivo'
            });
        }

        req.user = user; 
        next();
        
    } catch (error) {

        res.status(401).json({
            msg: 'Token no válido'
        });
    }

    
}

module.exports = {
    validateJWT
}