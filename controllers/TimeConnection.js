const TimeConnection = require('../models/timeConnection');
const User = require('../models/user');

// Crear un nuevo tiempo de conexión
const createTimeConnection = async (req, res) => {
    const { temporaryTime, plasticCaps = 0 } = req.body;
    const { _id } = req.authenticatedUser;

    try {
        // Crear y guardar el tiempo de conexión
        const timeConnection = new TimeConnection({
            userId: _id,
            temporaryTime,
            plasticCaps
        });
        await timeConnection.save();

        res.status(201).json({
            msg: 'Tiempo de conexión creado exitosamente',
            timeConnection
        });
    } catch (error) {
        res.status(500).json({
            msg: 'Error al crear el tiempo de conexión',
            error
        });
    }
};

// Actualizar un tiempo de conexión existente
const updateTimeConnection = async (req, res) => {
    const { id } = req.params;
    const { temporaryTime, status, plasticCaps } = req.body;

    try {
        const timeConnection = await TimeConnection.findByIdAndUpdate(
            id,
            { temporaryTime, status, plasticCaps },
            { new: true }
        );

        if (!timeConnection) {
            return res.status(404).json({
                msg: 'El tiempo de conexión no existe'
            });
        }

        res.json({
            msg: 'Tiempo de conexión actualizado exitosamente',
            timeConnection
        });
    } catch (error) {
        res.status(500).json({
            msg: 'Error al actualizar el tiempo de conexión',
            error
        });
    }
};

// Eliminar un tiempo de conexión existente (opcional)
const deleteTimeConnection = async (req, res) => {
    const { id } = req.params;

    try {
        const timeConnection = await TimeConnection.findByIdAndDelete(id);

        if (!timeConnection) {
            return res.status(404).json({
                msg: 'El tiempo de conexión no existe'
            });
        }

        res.json({
            msg: 'Tiempo de conexión eliminado exitosamente',
            timeConnection
        });
    } catch (error) {
        res.status(500).json({
            msg: 'Error al eliminar el tiempo de conexión',
            error
        });
    }
};

// Obtener todas las conexiones (solo para administradores)
const getAllTimeConnections = async (req, res) => {
    try {
        const timeConnections = await TimeConnection.find()
            .populate('userId', 'name email') // Incluye información básica del usuario
            .select('-__v') // Excluye campos innecesarios
            .sort({ createdAt: -1 });

        res.json({
            msg: 'Lista de todas las conexiones',
            timeConnections
        });
    } catch (error) {
        res.status(500).json({
            msg: 'Error al obtener la lista de conexiones',
            error
        });
    }
};

// Obtener conexiones de un usuario específico
const getUserTimeConnections = async (req, res) => {
    const { userId } = req.params;

    try {
        const userConnections = await TimeConnection.find({ userId })
            .populate('userId', 'name email') // Incluye información básica del usuario
            .select('-__v');

        if (!userConnections.length) {
            return res.status(404).json({
                msg: 'No se encontraron conexiones para este usuario'
            });
        }

        res.json({
            msg: 'Conexiones del usuario',
            userConnections
        });
    } catch (error) {
        res.status(500).json({
            msg: 'Error al obtener las conexiones del usuario',
            error
        });
    }
};

module.exports = {
    createTimeConnection,
    updateTimeConnection,
    deleteTimeConnection,
    getAllTimeConnections,
    getUserTimeConnections
};
