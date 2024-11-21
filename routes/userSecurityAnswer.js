const { Router } = require('express');
const { check } = require('express-validator');
const { 
    getUserSecurityAnswer, 
    createUserSecurityAnswer, 
    updateUserSecurityAnswer, 
    deleteUserSecurityAnswer 
} = require('../controllers/userSecurityAnswer');
const { validateFields, validateJWT, isSameUserOrAdminRole } = require('../middlewares');
const { existsSecurityQuestionById, existsUserById } = require('../helpers/db-validators');

const router = Router();

/**
 * {{url}}/api/user-security-answers
 */

// Obtener la respuesta de seguridad de un usuario
router.get('/:userId', [
    validateJWT,
    isSameUserOrAdminRole,
    check('userId', 'No es un ID válido.').isMongoId(),
    validateFields
], getUserSecurityAnswer);

// Crear una nueva respuesta de seguridad para el usuario
router.post('/', [
    validateJWT,
    check('securityQuestionId', 'El ID de la pregunta de seguridad es obligatorio.').isMongoId(),
    check('securityQuestionId').custom(existsSecurityQuestionById),
    check('answer', 'La respuesta es obligatoria.').not().isEmpty(),
    validateFields
], createUserSecurityAnswer);

// Actualizar la respuesta de seguridad de un usuario
router.put('/:userId', [
    validateJWT,
    isSameUserOrAdminRole,
    validateFields,
    check('securityQuestionId').optional().isMongoId(),
    check('answer', 'La respuesta es obligatoria.').optional().not().isEmpty(),
    validateFields
], updateUserSecurityAnswer);

// Eliminar la respuesta de seguridad de un usuario
router.delete('/:userId', [
    validateJWT,
    isSameUserOrAdminRole,
    check('userId', 'No es un ID válido.').isMongoId(),
    validateFields
], deleteUserSecurityAnswer);

module.exports = router;
