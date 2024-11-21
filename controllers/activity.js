const { request, response } = require('express');
const Activity = require('../models/activity');

// Obtener todas las actividades
const getActivities = async (req = request, res = response) => {
    const { offset = 0, limit = 10 } = req.query;
    try {
        const [totalActivities, activities] = await Promise.all([
            Activity.countDocuments(),
            Activity.find()
                .skip(Number(offset))
                .limit(Number(limit))
                .sort({ createdAt: -1 })
        ]);

        res.json({
            ok: true,
            totalActivities,
            activities
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error de servidor'
        });
    }
};

// Obtener una actividad por ID
const getActivityById = async (req = request, res = response) => {
    const { id } = req.params;

    try {
        const activity = await Activity.findById(id);

        res.json({
            ok: true,
            activity
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error de servidor'
        });
    }
};

// Crear una nueva actividad
const createActivity = async (req = request, res = response) => {
    const { name, description, status = true } = req.body;

    try {
        const activity = new Activity({ name, description, status });
        await activity.save();

        res.json({
            ok: true,
            activity
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error de servidor'
        });
    }
};

// Actualizar una actividad por ID
const updateActivity = async (req = request, res = response) => {
    const { id } = req.params;
    const { _id, ...data } = req.body;

    try {
        const activity = await Activity.findByIdAndUpdate(id, data, { new: true });

        res.json({
            ok: true,
            activity
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error de servidor'
        });
    }
};

// Eliminar una actividad por ID
const deleteActivity = async (req = request, res = response) => {
    const { id } = req.params;

    try {
        const activity = await Activity.findByIdAndDelete(id);

        res.json({
            ok: true,
            activity
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error de servidor'
        });
    }
};

module.exports = {
    getActivities,
    getActivityById,
    createActivity,
    updateActivity,
    deleteActivity
};
