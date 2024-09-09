const { Router } = require('express');
const { usuariosGet, usuariosPost, usuariosPut, usuariosPatch, usuariosDelete } = require('../controllers/usuarios');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { esRolValido, emailExiste, idUsuarioExiste } = require('../helpers.js/db-validators');

const router = Router();

router.get('/', usuariosGet);

router.put('/:id', [
    check('id', 'No es un id válido').isMongoId(),
    check('id').custom( idUsuarioExiste ),
    check('rol').custom( esRolValido ),
    validarCampos
], usuariosPut);

router.post('/', [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    // check('correo', 'El correo no es válido').isEmail(),
    check('correo').custom( emailExiste ),
    check('password', 'El password es obligatorio y de más de 6 letras').isLength({min: 6}),
    //check('rol', 'No es una rol permitido').isIn(['ADMIN_ROLE', 'USER_ROLE']),
    check('rol').custom( esRolValido ),
    validarCampos
], usuariosPost);

router.patch('/', usuariosPatch);

router.delete('/:id', [
    check('id', 'No es un id válido').isMongoId(),
    check('id').custom( idUsuarioExiste ),
    validarCampos
], usuariosDelete);


module.exports = router;