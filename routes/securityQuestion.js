const { Router } = require('express');
const { check } = require('express-validator');
const { 
    getSecurityQuestions, 
    getSecurityQuestionById, 
    createSecurityQuestion, 
    updateSecurityQuestion, 
    deleteSecurityQuestion 
} = require('../controllers/securityQuestion');
const { validateFields, validateJWT, isAdminRole } = require('../middlewares');

const router = Router();

/**
 * {{url}}/api/security-questions
 */

// Obtener todas las preguntas de seguridad
router.get('/', [
    validateJWT,
    isAdminRole,  // Solo los administradores pueden ver todas las preguntas
], getSecurityQuestions);

// Obtener una pregunta de seguridad por ID
router.get('/:id', [
    validateJWT,
    check('id', 'No es un ID válido.').isMongoId(),
    validateFields
], getSecurityQuestionById);

// Crear una nueva pregunta de seguridad
router.post('/', [
    validateJWT,
    isAdminRole,
    check('questionText', 'La pregunta de seguridad es obligatoria.').not().isEmpty(),
    validateFields
], createSecurityQuestion);

// Actualizar una pregunta de seguridad por ID
router.put('/:id', [
    validateJWT,
    isAdminRole,
    check('id', 'No es un ID válido.').isMongoId(),
    validateFields,
    check('questionText', 'La pregunta de seguridad es obligatoria.').optional().not().isEmpty(),
    validateFields
], updateSecurityQuestion);

// Eliminar una pregunta de seguridad por ID
router.delete('/:id', [
    validateJWT,
    isAdminRole,
    check('id', 'No es un ID válido.').isMongoId(),
    validateFields
], deleteSecurityQuestion);

module.exports = router;
