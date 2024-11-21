const { request, response } = require('express');
const UserSecurityAnswer = require('../models/userSecurityAnswer');

// Obtener la respuesta de seguridad de un usuario
const getUserSecurityAnswer = async (req = request, res = response) => {
    const { userId } = req.params;

    try {
        const answer = await UserSecurityAnswer.findOne({ userId });

        res.json({
            ok: true,
            answer
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error de servidor'
        });
    }
};

// Crear una nueva respuesta de seguridad para el usuario
const createUserSecurityAnswer = async (req = request, res = response) => {
    const { userId, securityQuestionId, answer } = req.body;

    try {
        const { role, name, _id } = req.authenticatedUser;

        const userAnswer = new UserSecurityAnswer({ userId: _id, securityQuestionId, answer });
        await userAnswer.save();

        res.json({
            ok: true,
            userAnswer
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error de servidor'
        });
    }
};

// Actualizar la respuesta de seguridad de un usuario
const updateUserSecurityAnswer = async (req = request, res = response) => {
    const { userId } = req.params;
    const { answer, securityQuestionId } = req.body;

    try {
        const updatedAnswer = await UserSecurityAnswer.findOneAndUpdate(
            { userId },
            { answer, securityQuestionId },
            { new: true }
        );

        res.json({
            ok: true,
            updatedAnswer
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error de servidor'
        });
    }
};

// Eliminar la respuesta de seguridad de un usuario
const deleteUserSecurityAnswer = async (req = request, res = response) => {
    const { userId } = req.params;

    try {
        const deletedAnswer = await UserSecurityAnswer.findOneAndDelete({ userId });

        res.json({
            ok: true,
            deletedAnswer
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
    getUserSecurityAnswer,
    createUserSecurityAnswer,
    updateUserSecurityAnswer,
    deleteUserSecurityAnswer
};
