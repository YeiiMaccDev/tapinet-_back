const { request, response } = require('express');
const Contact = require('../models/contact');

// Crear un mensaje de contacto (para usuarios autenticados)
const createContact = async (req = request, res = response) => {
    const { title, message } = req.body;
    const { _id: userId, name } = req.authenticatedUser;

    try {
        const contact = new Contact({ userId, title, message });
        await contact.save();

        res.status(201).json({
            ok: true,
            msg: `Mensaje de ${name} enviado correctamente.`,
            contact
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error de servidor.'
        });
    }
};

// Obtener todos los mensajes de un usuario autenticado
const getUserContacts = async (req = request, res = response) => {
    const { _id: userId } = req.authenticatedUser;

    try {
        const contacts = await Contact.find({ userId });
        res.json({
            ok: true,
            contacts
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error de servidor.'
        });
    }
};

// Obtener el detalle de un mensaje específico de un usuario autenticado
const getUserContactById = async (req = request, res = response) => {
    const { id } = req.params;
    const { _id: userId } = req.authenticatedUser;

    try {
        const contact = await Contact.findOne({ _id: id, userId });
        if (!contact) {
            return res.status(404).json({
                ok: false,
                msg: 'Mensaje no encontrado o no pertenece al usuario.'
            });
        }
        res.json({
            ok: true,
            contact
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error de servidor.'
        });
    }
};

// Obtener todos los mensajes (para administrador)
const getContacts = async (req = request, res = response) => {
    try {
        const contacts = await Contact.find().populate('userId', 'name');
        res.json({
            ok: true,
            contacts
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error de servidor.'
        });
    }
};

// Obtener el detalle de un mensaje específico por ID (para administrador)
const getContactById = async (req = request, res = response) => {
    const { id } = req.params;

    try {
        const contact = await Contact.findById(id).populate('userId', 'name');
        if (!contact) {
            return res.status(404).json({
                ok: false,
                msg: 'Mensaje no encontrado.'
            });
        }
        res.json({
            ok: true,
            contact
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error de servidor.'
        });
    }
};

// Actualizar mensaje con respuesta del administrador y cambiar estado de respuesta
const updateContact = async (req = request, res = response) => {
    const { id } = req.params;
    const { response } = req.body;

    try {
        const contact = await Contact.findById(id);
        if (!contact) {
            return res.status(404).json({
                ok: false,
                msg: 'Mensaje no encontrado.'
            });
        }

        // Actualizar respuesta y estado
        contact.response = response;
        contact.responseStatus = 'respondido';
        await contact.save();

        res.json({
            ok: true,
            msg: 'Respuesta enviada correctamente.',
            contact
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error de servidor.'
        });
    }
};

// Eliminar un mensaje de contacto (para administrador)
const deleteContact = async (req = request, res = response) => {
    const { id } = req.params;

    try {
        const contact = await Contact.findByIdAndUpdate(id, { status: false }, { new: true });
        if (!contact) {
            return res.status(404).json({
                ok: false,
                msg: 'Mensaje no encontrado.'
            });
        }
        res.json({
            ok: true,
            msg: 'Mensaje eliminado correctamente.',
            contact
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error de servidor.'
        });
    }
};

module.exports = {
    createContact,
    getUserContacts,
    getUserContactById,
    getContacts,
    getContactById,
    updateContact,
    deleteContact
};
