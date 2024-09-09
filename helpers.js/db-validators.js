const Role = require('../models/role');
const Usuario = require('../models/usuario');

const esRolValido = async(rol = '') => {
    const existeRol = await Role.findOne({rol});
    if (!existeRol){
        throw new Error(`El rol ${rol} no está registrado en la base de datos`);
    }
}

const emailExiste = async(correo = '') => {
    // verificar si correo existe
    const existeEmail = await Usuario.findOne({correo});
    if (existeEmail){
        throw new Error(`El correo: ${correo} ya está registrado en la base de datos`);
    }
}

const idUsuarioExiste = async(id) => {
    // verificar si un usuario existe por su id
    const existeUsuario = await Usuario.findById(id);
    if (!existeUsuario){
        throw new Error(`No existe usuario con el id: ${id} en la base de datos`);
    }
}

module.exports = {
    esRolValido,
    emailExiste,
    idUsuarioExiste
}