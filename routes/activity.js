const { Router } = require('express');
const { check } = require('express-validator');
const { 
    getActivities, 
    getActivityById, 
    createActivity, 
    updateActivity, 
    deleteActivity 
} = require('../controllers/activity');
const { validateFields, validateJWT, isAdminRole } = require('../middlewares');

const router = Router();

/**
 * {{url}}/api/activities
 */

// Obtener todas las actividades (público)
router.get('/', getActivities);

// Obtener una actividad por ID (público)
router.get('/:id', [
    check('id', 'No es un ID válido.').isMongoId(),
    validateFields
], getActivityById);

// Crear una nueva actividad (solo administrador)
router.post('/', [
    validateJWT,
    isAdminRole,
    check('name', 'El nombre de la actividad es obligatorio.').not().isEmpty(),
    check('description', 'La descripción de la actividad es obligatoria.').not().isEmpty(),
    validateFields
], createActivity);

// Actualizar una actividad por ID (solo administrador)
router.put('/:id', [
    validateJWT,
    isAdminRole,
    check('id', 'No es un ID válido.').isMongoId(),
    validateFields,
    check('name', 'El nombre de la actividad es obligatorio.').optional().not().isEmpty(),
    check('description', 'La descripción de la actividad es obligatoria.').optional().not().isEmpty(),
    validateFields
], updateActivity);

// Eliminar una actividad por ID (solo administrador)
router.delete('/:id', [
    validateJWT,
    isAdminRole,
    check('id', 'No es un ID válido.').isMongoId(),
    validateFields
], deleteActivity);

module.exports = router;
