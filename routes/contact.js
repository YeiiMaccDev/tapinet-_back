const { Router } = require('express');
const { check } = require('express-validator');
const { 
    getContacts, 
    getContactById, 
    getUserContacts, 
    getUserContactById, 
    createContact, 
    updateContact, 
    deleteContact 
} = require('../controllers/contact');
const { validateFields, validateJWT, isAdminRole } = require('../middlewares');

const router = Router();

/**
 * {{url}}/api/contacts
 */

// Ruta para crear un mensaje de contacto (para usuarios autenticados)
router.post('/', [
    validateJWT,
    check('title', 'El título es obligatorio.').not().isEmpty(),
    check('message', 'El mensaje es obligatorio.').not().isEmpty(),
    validateFields
], createContact);

// Ruta para que los usuarios autenticados obtengan todos sus mensajes
router.get('/user', [
    validateJWT
], getUserContacts);

// Ruta para que los usuarios autenticados vean el detalle de un mensaje específico
router.get('/user/:id', [
    validateJWT,
    check('id', 'No es un ID válido.').isMongoId(),
    validateFields
], getUserContactById);

// Ruta para que el administrador obtenga todos los mensajes
router.get('/', [
    validateJWT,
    isAdminRole,
], getContacts);

// Ruta para que el administrador obtenga el detalle de un mensaje específico por ID
router.get('/:id', [
    validateJWT,
    isAdminRole,
    check('id', 'No es un ID válido.').isMongoId(),
    validateFields
], getContactById);

// Ruta para que el administrador responda a un mensaje y actualice el estado
router.put('/:id', [
    validateJWT,
    isAdminRole,
    check('id', 'No es un ID válido.').isMongoId(),
    check('response', 'La respuesta es obligatoria.').not().isEmpty(),
    validateFields
], updateContact);

// Ruta para que el administrador elimine un mensaje
router.delete('/:id', [
    validateJWT,
    isAdminRole,
    check('id', 'No es un ID válido.').isMongoId(),
    validateFields
], deleteContact);

module.exports = router;
