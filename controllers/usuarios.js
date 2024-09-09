const { response } = require('express');
const bcrypt = require('bcryptjs');
const Usuario = require('../models/usuario');

const usuariosGet = async (req, res = response) => {
    const { limite = 5, desde = 0 } = req.query
    const query = {estado:true};

    const [ total, usuarios ] = await Promise.all([
        Usuario.countDocuments(query),
        Usuario.find(query)
        .limit(limite)
        .skip(desde)
    ]);

    res.json({total, usuarios});
};

const usuariosPost = async(req, res = response) => {
    const {nombre, correo, password, rol} = req.body;
    const usuario = new Usuario({nombre, correo,  password, rol});

    // hash de la contraseña
    const salt = bcrypt.genSaltSync(10);
    usuario.password = bcrypt.hashSync(password, salt);

    // guardar en base de datos
    await usuario.save();

    res.status(201).json({
        msg: 'post API - controlador',
        usuario
    });
};

const usuariosPut = async (req, res = response) => {
    const id = req.params.id;
    const {_id, password, google, correo, ...resto } = req.body;

    // TODO: validar contra base de datos
    if (password){
        const salt = bcrypt.genSaltSync(10);
        resto.password = bcrypt.hashSync(password, salt);    
    }
    const usuario = await Usuario.findByIdAndUpdate(id, resto);

    res.json(
        usuario
    );
};

const usuariosPatch = (req, res = response) => {
    res.json({
        msg: 'patch API - controlador'
    });
};

const usuariosDelete = async (req, res = response) => {
    const { id } = req.params;
    // borrado físico
    // const usuario = await Usuario.findByIdAndDelete(id);
    const usuario = await Usuario.findByIdAndUpdate(id, {estado: false})
    res.json({
        usuario
    });
};

module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosPatch,
    usuariosDelete
}