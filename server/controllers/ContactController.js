import { getAllContactsService, 
    createContactService, 
    patchContactService, 
    deleteContactService } from "../services/ContactService.js";


export const getAllContacts = async (req, res) => {
    try {
        const contacts = await getAllContactsService(req.user.id);
        res.status(200).json(contacts);
    } catch (err) {
        res.status(500).json({ error: 'Erreur serveur' });
    }
};

export const createContact = async (req, res) => {
    try {
        const { firstName, lastName, phone } = req.body;

        const contact = await createContactService({ firstName, lastName, phone, userId: req.user.id });
        res.status(201).json({ message: 'Contact créé avec succès', contact });
    } catch (error) {
        if (error.message === "Tous les champs sont requis" 
            || error.message === "Le numéro doit contenir entre 10 et 20 caractères"
            || error.message === "Ce numéro est déjà utilisé pour un autre contact.") {
            res.status(400).json({ error: error.message });
        } else {
            res.status(500).json({ error: 'Erreur serveur' });
        }
    }
};

export const patchContact = async (req, res) => {
    try {
        const { id } = req.params;
        const update = req.body;

        const contact = await patchContactService({ id, update, userId: req.user.id });
        res.status(200).json({ message: 'Contact modifié avec succès', contact });
    } catch (error) {
        if (error.message === "Contact non trouvé.") {
            res.status(404).json({ message: error.message });
        } else if (
            error.message === "Le numéro doit contenir entre 10 et 20 caractères" ||
            error.message === "Ce numéro est déjà utilisé pour un autre contact."
        ) {
            res.status(400).json({ message: error.message });
        } else {
            console.error(error);
            res.status(500).json({ error: 'Erreur serveur' });
        }
    }
};

export const deleteContact = async (req, res) => {
    try {
        const { id } = req.params;

        await deleteContactService({ id, userId: req.user.id });
        res.status(200).json({ message: 'Contact supprimé.' });
    } catch (error) {
        if (error.message === "Contact non trouvé.") {
            res.status(404).json({ message: error.message });
        } else {
            res.status(500).json({ message: 'Erreur serveur.' });
        }
    }
};