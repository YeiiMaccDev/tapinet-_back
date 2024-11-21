const { Router } = require('express');
const { check } = require('express-validator');
const { 
    getParks, 
    getParkById, 
    createPark, 
    updatePark, 
    deletePark 
} = require('../controllers/park');
const { validateFields, validateJWT, isAdminRole } = require('../middlewares');
const { existsLocalityById, existsActivityById } = require('../helpers/db-validators');

const router = Router();

// Obtener todos los parques (Público)
router.get('/', getParks);

// Obtener parque por ID (Público)
router.get('/:id', [
    check('id', 'No es un ID válido.').isMongoId(),
    validateFields
], getParkById);

// Crear un nuevo parque (Administrador)
router.post('/', [
    validateJWT,
    isAdminRole,
    check('name', 'El nombre del parque es obligatorio.').not().isEmpty(),
    check('description', 'La descripción es obligatoria.').not().isEmpty(),
    check('address', 'La dirección es obligatoria.').not().isEmpty(),
    check('latitude', 'La latitud es obligatoria y debe ser un número.').isFloat(),
    check('longitude', 'La longitud es obligatoria y debe ser un número.').isFloat(),
    check('locality', 'La localidad es obligatoria.').isMongoId(),
    check('locality').custom(existsLocalityById),
    check('activities').isArray().withMessage('Las actividades deben ser un arreglo de IDs.'),
    check('activities.*').isMongoId().withMessage('ID de actividad no válido.'),
    check('activities').custom(async (activities) => {
        for (let activity of activities) {
            await existsActivityById(activity);
        }
    }),
    validateFields
], createPark);

// Actualizar parque por ID (Administrador)
router.put('/:id', [
    validateJWT,
    isAdminRole,
    check('id', 'No es un ID válido.').isMongoId(),
    validateFields,
    check('name', 'El nombre del parque es obligatorio.').optional().not().isEmpty(),
    check('latitude', 'La latitud debe ser un número.').optional().isFloat(),
    check('longitude', 'La longitud debe ser un número.').optional().isFloat(),
    check('locality').optional().isMongoId(),
    check('locality').optional().custom(existsLocalityById),
    check('activities').optional().isArray(),
    check('activities.*').optional().isMongoId(),
    validateFields
], updatePark);

// Eliminar parque por ID (Administrador)
router.delete('/:id', [
    validateJWT,
    isAdminRole,
    check('id', 'No es un ID válido.').isMongoId(),
    validateFields
], deletePark);

module.exports = router;

