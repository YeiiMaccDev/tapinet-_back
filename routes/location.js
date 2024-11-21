const { Router } = require('express');
const { check } = require('express-validator');
const {
    getLocations,
    getLocationById,
    createLocation,
    updateLocation,
    deleteLocation
} = require('../controllers/location');
const { validateFields, validateJWT, isAdminRole } = require('../middlewares');

const router = Router();

/**
 * {{url}}/api/locations
 */

// Obtener todas las localidades
router.get('/', getLocations);

// Obtener una localidad por ID
router.get('/:id', [
    check('id', 'No es un ID válido.').isMongoId(),
    validateFields
], getLocationById);

// Crear una nueva localidad
router.post('/', [
    validateJWT,
    isAdminRole,
    check('name', 'El nombre de la localidad es obligatorio.').not().isEmpty(),
    validateFields
], createLocation);

// Actualizar una localidad por ID
router.put('/:id', [
    validateJWT,
    isAdminRole,
    check('id', 'No es un ID válido.').isMongoId(),
    validateFields,
    check('name', 'El nombre de la localidad es obligatorio.').optional().not().isEmpty(),
    validateFields
], updateLocation);

// Eliminar una localidad por ID (cambiar el status a false)
router.delete('/:id', [
    validateJWT,
    isAdminRole,
    check('id', 'No es un ID válido.').isMongoId(),
    validateFields
], deleteLocation);

module.exports = router;
