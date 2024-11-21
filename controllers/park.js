const { request, response } = require('express');
const Park = require('../models/park');

// Obtener todos los parques
const getParks = async (req = request, res = response) => {
    try {
        const parks = await Park.find({ status: true })
            .populate('locality', 'name')
            .populate('activities', 'name');

        res.json({
            ok: true,
            parks
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error de servidor'
        });
    }
};

// Obtener parque por ID
const getParkById = async (req = request, res = response) => {
    const { id } = req.params;

    try {
        const park = await Park.findById(id)
            .populate('locality', 'name')
            .populate('activities', 'name');

        if (!park || !park.status) {
            return res.status(404).json({
                ok: false,
                msg: 'Parque no encontrado'
            });
        }

        res.json({
            ok: true,
            park
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error de servidor'
        });
    }
};

// Crear un nuevo parque
const createPark = async (req = request, res = response) => {
    const { name, description, address, latitude, longitude, locality, activities, images = [] } = req.body;

    try {
        const park = new Park({ name, description, address, latitude, longitude, locality, activities, images });
        await park.save();

        res.json({
            ok: true,
            park
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error de servidor'
        });
    }
};

// Actualizar parque por ID
const updatePark = async (req = request, res = response) => {
    const { id } = req.params;
    const { status, ...data } = req.body;

    try {
        const park = await Park.findByIdAndUpdate(id, data, { new: true });

        res.json({
            ok: true,
            park
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error de servidor'
        });
    }
};

// Eliminar parque por ID
const deletePark = async (req = request, res = response) => {
    const { id } = req.params;

    try {
        const park = await Park.findByIdAndUpdate(id, { status: false }, { new: true });

        res.json({
            ok: true,
            park
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
    getParks,
    getParkById,
    createPark,
    updatePark,
    deletePark
};
