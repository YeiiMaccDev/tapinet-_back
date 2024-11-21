const { Router } = require('express');
const { check } = require('express-validator');

const { login, googleSignIn, revalidateToken, resetPassword } = require('../controllers/auth');
const { existsEmail } = require('../helpers/db-validators');
const { validateFields } = require('../middlewares/validate-fields');
const { validateJWT } = require('../middlewares');

const router = Router();


router.post('/login', [
    check('email', 'El email es obligatorio.').not().isEmpty(),
    check('email', 'El email no es válido.').isEmail(),
    check('password', 'La contraseña es obligatoria.').not().isEmpty(),
    validateFields
], login);


// router.post('/google',[
//     check('id_token', 'El token de google es obligatorio.').not().isEmpty(),
//     validateFields
// ],  googleSignIn);


router.get('/renew', validateJWT, revalidateToken);

router.post('/reset-password', [
    check('email', 'El email es obligatorio').isEmail(),
    check('answer', 'La respuesta de seguridad es obligatoria').not().isEmpty(),
    check('newPassword', 'La nueva contraseña es obligatoria').isLength({ min: 5 }),
    validateFields
], resetPassword);

module.exports = router;