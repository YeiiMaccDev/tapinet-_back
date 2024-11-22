const { Router } = require('express');
const { check } = require('express-validator');
const {
    createTimeConnection,
    updateTimeConnection,
    getUserTimeConnections,
    getAllTimeConnections
} = require('../controllers/TimeConnection');
const { validateFields, validateJWT, isAdminRole } = require('../middlewares');
const { existsUserById, existsTimeConnectionById } = require('../helpers/db-validators');

const router = Router();

/**
 * {{url}}/api/time-connections
 */

// Crear un nuevo tiempo de conexión (accesible por cualquier usuario autenticado)
router.post('/', [
    validateJWT, // Verifica que el usuario esté autenticado
    check('temporaryTime', 'El tiempo de conexión es obligatorio y debe ser un número mayor a 0.')
        .isInt({ min: 1 }),
    check('plasticCaps', 'La cantidad de tapitas debe ser un número mayor o igual a 0.')
        .optional()
        .isInt({ min: 0 }),
    validateFields
], createTimeConnection);

// Editar un tiempo de conexión existente (solo para administrador)
router.put('/:id', [
    validateJWT,
    isAdminRole, // Solo un administrador puede modificar tiempos de conexión
    check('id', 'No es un ID válido para el tiempo de conexión.').isMongoId(),
    check('id').custom(existsTimeConnectionById),
    check('temporaryTime', 'El tiempo de conexión debe ser un número mayor a 0.')
        .optional().isInt({ min: 1 }),
    check('status', 'El estado debe ser uno de los valores permitidos: ACTIVE, EXPIRED, PAUSED.')
        .optional().isIn(['ACTIVE', 'EXPIRED', 'PAUSED']),
    check('plasticCaps', 'La cantidad de tapitas debe ser un número mayor o igual a 0.')
        .optional()
        .isInt({ min: 0 }),
    validateFields
], updateTimeConnection);

// Obtener todas las conexiones (solo para administrador)
router.get('/', [
    validateJWT,
    isAdminRole, // Solo administradores pueden acceder a esta lista
    validateFields
], getAllTimeConnections);

// Obtener tiempos de conexión de un usuario específico
router.get('/user', [
    validateJWT, // Verifica que el usuario esté autenticado
    validateFields
], getUserTimeConnections);

module.exports = router;

