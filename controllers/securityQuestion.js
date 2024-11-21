const { request, response } = require('express');
const SecurityQuestion = require('../models/securityQuestion');

// Obtener todas las preguntas de seguridad
const getSecurityQuestions = async (req = request, res = response) => {
    const { offset = 0, limit = 10 } = req.query;
    try {
        const [totalQuestions, questions] = await Promise.all([
            SecurityQuestion.countDocuments(),
            SecurityQuestion.find()
                .skip(Number(offset))
                .limit(Number(limit))
                .sort({ createdAt: -1 })
        ]);

        res.json({
            ok: true,
            totalQuestions,
            questions
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error de servidor'
        });
    }
};

// Obtener una pregunta de seguridad por ID
const getSecurityQuestionById = async (req = request, res = response) => {
    const { id } = req.params;

    try {
        const question = await SecurityQuestion.findById(id);

        res.json({
            ok: true,
            question
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error de servidor'
        });
    }
};

// Crear una nueva pregunta de seguridad
const createSecurityQuestion = async (req = request, res = response) => {
    const { role, questionText, language = 'es', isActive = true } = req.body;

    try {
        const question = new SecurityQuestion({ role, questionText, language, isActive });
        await question.save();

        res.json({
            ok: true,
            question
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error de servidor'
        });
    }
};

// Actualizar una pregunta de seguridad por ID
const updateSecurityQuestion = async (req = request, res = response) => {
    const { id } = req.params;
    const { _id, ...data } = req.body;

    try {
        const question = await SecurityQuestion.findByIdAndUpdate(id, data, { new: true });

        res.json({
            ok: true,
            question
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error de servidor'
        });
    }
};

// Eliminar una pregunta de seguridad por ID
const deleteSecurityQuestion = async (req = request, res = response) => {
    const { id } = req.params;

    try {
        const question = await SecurityQuestion.findByIdAndDelete(id);

        res.json({
            ok: true,
            question
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
    getSecurityQuestions,
    getSecurityQuestionById,
    createSecurityQuestion,
    updateSecurityQuestion,
    deleteSecurityQuestion
};
