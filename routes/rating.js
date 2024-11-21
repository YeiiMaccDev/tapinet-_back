const { Router } = require('express');
const { check } = require('express-validator');
const {
    createRating,
    updateRating,
    deleteRating,
    getParkRatings,
    moderateRating
} = require('../controllers/rating');
const { validateFields, validateJWT, isAdminRole } = require('../middlewares');

const router = Router();

// Crear calificación
router.post('/', [
    validateJWT,
    check('parkId', 'El ID del parque es obligatorio.').isMongoId(),
    check('score', 'La puntuación debe ser entre 0 y 5.').isFloat({ min: 0, max: 5 }),
    check('comment', 'El comentario es obligatorio.').not().isEmpty(),
    validateFields
], createRating);

// Actualizar calificación o comentario
router.put('/:id', [
    validateJWT,
    check('id', 'No es un ID válido').isMongoId(),
    check('score', 'La puntuación debe ser entre 0 y 5.').optional().isFloat({ min: 0, max: 5 }),
    validateFields
], updateRating);

// Eliminar calificación y comentario
router.delete('/:id', [
    validateJWT,
    check('id', 'No es un ID válido').isMongoId(),
    validateFields
], deleteRating);

// Obtener calificaciones de un parque
router.get('/park/:parkId', [
    check('parkId', 'El ID del parque es obligatorio.').isMongoId(),
    validateFields
], getParkRatings);

// Moderar calificación (solo administrador)
router.put('/moderate/:id', [
    validateJWT,
    isAdminRole,
    check('id', 'No es un ID válido').isMongoId(),
    check('commentStatus', 'Estado de comentario inválido').isBoolean(),
    check('userStatus', 'Estado de usuario inválido').isBoolean(),
    validateFields
], moderateRating);

module.exports = router;
