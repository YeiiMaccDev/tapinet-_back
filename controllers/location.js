// controllers/location.js
const { request, response } = require('express');
const Location = require('../models/location');

// Obtener todas las localidades (público)
const getLocations = async (req = request, res = response) => {
    const { offset = 0, limit = 10 } = req.query;
    const queryStatus = { status: true };

    try {
        const [totalLocations, locations] = await Promise.all([
            Location.countDocuments(queryStatus),
            Location.find(queryStatus)
                .skip(Number(offset))
                .limit(Number(limit))
                .sort({ createdAt: -1 })
        ]);

        res.json({
            ok: true,
            totalLocations,
            locations
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error de servidor'
        });
    }
};

// Obtener una localidad por ID (público)
const getLocationById = async (req = request, res = response) => {
    const { id } = req.params;

    try {
        const location = await Location.findById(id);

        res.json({
            ok: true,
            location
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error de servidor'
        });
    }
};

// Crear una nueva localidad (solo administradores)
const createLocation = async (req = request, res = response) => {
    const { name } = req.body;

    try {
        const location = new Location({ name });
        await location.save();

        res.json({
            ok: true,
            location
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error de servidor'
        });
    }
};

// Actualizar una localidad por ID (solo administradores)
const updateLocation = async (req = request, res = response) => {
    const { id } = req.params;
    const { _id, ...data } = req.body;

    try {
        const location = await Location.findByIdAndUpdate(id, data, { new: true });

        res.json({
            ok: true,
            location
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error de servidor'
        });
    }
};

// Eliminar una localidad por ID (solo administradores, cambia el status a false)
const deleteLocation = async (req = request, res = response) => {
    const { id } = req.params;

    try {
        const location = await Location.findByIdAndUpdate(id, { status: false }, { new: true });

        res.json({
            ok: true,
            location
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
    getLocations,
    getLocationById,
    createLocation,
    updateLocation,
    deleteLocation
};
