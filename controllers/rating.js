const Rating = require('../models/rating');
const Park = require('../models/park');

// Crear calificación y comentario
const createRating = async (req, res) => {
    const { score, comment, parkId } = req.body;
    const { _id: userId } = req.authenticatedUser;

    try {
        const newRating = new Rating({ userId, parkId, score, comment });
        await newRating.save();

        // Recalcular el rating promedio del parque
        await updateParkRating(parkId);
        
        res.json({ msg: "Calificación y comentario registrados", newRating });
    } catch (error) {
        res.status(500).json({ msg: "Error al crear la calificación", error });
    }
};

// Actualizar calificación o comentario del usuario
const updateRating = async (req, res) => {
    const { id } = req.params;
    const { score, comment } = req.body;
    const { _id: userId } = req.authenticatedUser;

    try {
        const rating = await Rating.findOneAndUpdate(
            { _id: id, userId },
            { score, comment },
            { new: true }
        );

        if (!rating) return res.status(404).json({ msg: "Calificación no encontrada" });

        // Recalcular el rating promedio del parque
        await updateParkRating(rating.parkId);
        
        res.json({ msg: "Calificación actualizada", rating });
    } catch (error) {
        res.status(500).json({ msg: "Error al actualizar la calificación", error });
    }
};

// Eliminar calificación y comentario del usuario
const deleteRating = async (req, res) => {
    const { id } = req.params;
    const { _id: userId } = req.authenticatedUser;

    try {
        const rating = await Rating.findOneAndUpdate(
            { _id: id, userId },
            { status: false },
            { new: true }
        );

        if (!rating) return res.status(404).json({ msg: "Calificación no encontrada" });

        // Recalcular el rating promedio del parque
        await updateParkRating(rating.parkId);
        
        res.json({ msg: "Calificación eliminada", rating });
    } catch (error) {
        res.status(500).json({ msg: "Error al eliminar la calificación", error });
    }
};

// Listar todas las calificaciones de un parque (visible para todos)
const getParkRatings = async (req, res) => {
    const { parkId } = req.params;

    try {
        const ratings = await Rating.find({ parkId, commentStatus: true, status: true })
            .populate('userId', 'name')
            .select('score comment createdAt');

        res.json({ msg: "Calificaciones del parque", ratings });
    } catch (error) {
        res.status(500).json({ msg: "Error al obtener calificaciones", error });
    }
};

// Moderar calificación (solo administrador)
const moderateRating = async (req, res) => {
    const { id } = req.params;
    const { commentStatus, userStatus } = req.body;

    try {
        const rating = await Rating.findByIdAndUpdate(id, { commentStatus, userStatus }, { new: true });

        if (!rating) return res.status(404).json({ msg: "Calificación no encontrada" });

        res.json({ msg: "Moderación aplicada", rating });
    } catch (error) {
        res.status(500).json({ msg: "Error en moderación", error });
    }
};

// Calcular y actualizar rating promedio del parque
const updateParkRating = async (parkId) => {
    const ratings = await Rating.find({ parkId, status: true });
    const averageRating = ratings.reduce((acc, r) => acc + r.score, 0) / ratings.length || 0;

    await Park.findByIdAndUpdate(parkId, { rating: averageRating.toFixed(1) });
};

module.exports = {
    createRating,
    updateRating,
    deleteRating,
    getParkRatings,
    moderateRating
};
