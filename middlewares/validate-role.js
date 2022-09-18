const { response } = require("express");


const isAdminRole = ( req, res = response, next ) => {
   if( !req.user ) {
        return res.status(500).json({
            msg: 'No se valido el token, no se puede validar el rol'
        });
   }

   const { rol, name } = req.user;

   if( rol !== 'ADMIN_ROLE' ){
    return res.status(401).json({
        msg: `${ name } no es un administrador `
    });
   }

   next();
}

const hasRole = ( ...roles) =>{

    return (req, res = response, next) => {

        //validate exist user
        if( !req.user ) {
            return res.status(500).json({
                msg: 'No se valido el token, no se puede validar el rol'
            });
       }

       //validate rol
       if( !roles.includes( req.user.rol ) ){
            return res.status(401).json({
                msg: 'El servicio requiere de un rol con permisos'
            });
       }
       
       next();

    } 
}

module.exports = {
    isAdminRole,
    hasRole
}