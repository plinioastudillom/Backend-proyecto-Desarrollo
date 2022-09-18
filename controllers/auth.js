const { response } = require('express');
const bcryptjs = require('bcryptjs');
const User = require('../models/user');
const { generateJWT } = require('../helpers/generate-jwt');

const login = async (req, res = response) => {
    const { email, password } = req.body;
    try {
        //verify email  exist
        const user = await User.findOne({ email });
        if(!user){
            return res.status(400).json({
                msg: 'Usuario / Password incorrectos - correo '
            })
        }

        //verify  if user is active 
        if(!user.status){
            return res.status(400).json({
                msg: 'Usuario / Password incorrectos - estado: false '
            })
        }
        //verify password
        const validPassword = bcryptjs.compareSync( password, user.password );
        if( !validPassword ){
            return res.status(400).json({
                msg: 'Usuario / Password incorrectos - contraseña '
            })
        }

        //generate JWT
        const token = await generateJWT( user.id );

        res.json({
            user,
            token
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: 'Contacte con el administrador'
        })
    }
    
}

const validateTokenUser = async (req, res = response ) => {

    // Generar el JWT
    const token = await generateJWT( req.user._id );
    
    res.json({
        user: req.user,
        token: token,
    })

}

module.exports = {
    login, 
    validateTokenUser
}