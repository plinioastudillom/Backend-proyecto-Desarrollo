const { response, request } = require('express');
const User = require('../models/user');
const bcrypt = require('bcryptjs');

const usuariosGet = async (req = request, res = response) => {
    const { limit = 5, from } = req.query;
    const query = { status: true };
    
    const [total, users ] = await Promise.all([
        User.countDocuments(query),
        User.find(query)
            .skip(Number(from))
            //.limit(Number(limit))
    ]);
    res.json({
        total,
        users
    });
}

const usuariosPost = async (req, res = response) => {
    const { name, email, password, rol } = req.body;
    const user = new User({ name, email, password, rol });

    //encrypt password
    const salt = bcrypt.genSaltSync();
    user.password = bcrypt.hashSync(password, salt);

    //save BD
    await user.save();
    res.json({
        user
    });
}

const usuariosPut = async (req, res = response) => {

    const { id } = req.params;
    const { _id, password, google, email, ...rest } = req.body;
    if (password) {
        const salt = bcrypt.genSaltSync();
        rest.password = bcrypt.hashSync(password, salt);
    }

    const user = await User.findByIdAndUpdate( id, rest );

    res.json({
        user
    });
}

const usuariosPatch = (req, res = response) => {
    res.json({
        msg: 'patch API - usuariosPatch'
    });
}

const usuariosDelete = async (req, res = response) => {
    const { id } = req.params;
    
    //delete user ID
    //const user = await User.findByIdAndDelete( id );
    const user = await User.findByIdAndUpdate(id, { status: false });
    const userAuth = req.user;
    res.json({
        user, 
        userAuth
    });
}




module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosPatch,
    usuariosDelete,
}