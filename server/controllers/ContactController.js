import Contact from "../models/Contact.js";

export const getAllContacts = async (req, res) => {
    try {
        const contacts = await Contact.find({ user: req.user.id });
        res.status(200).json(contacts);
    } catch (err) {
        res.status(500).json({ error: 'Erreur serveur' });
    }
};

export const createContact = async (req, res) => {
    try {
        const {firstName, lastName, phone} = req.body;

        if (!firstName || !lastName || !phone) {
            return res.status(400).json({ error: "Tous les champs sont requis" });
        }

        const actualUserId = req.user.id;
        const newContact = new Contact({ 
            firstName, 
            lastName, 
            phone, 
            user: actualUserId
        });

        await newContact.save();
        res.status(201).json({message : 'Contact crée avec succes', contact: { firstName, lastName, phone } });
    }
    catch(error) {
        res.status(501).json({error: 'Erreur'});
    }
};

export const patchContact = async (req, res) => {
    try {
        const { id } = req.params;

        const update = req.body;

        const contact = await Contact.findOneAndUpdate(
            { _id: id, user: req.userId },
        update,
            { new: true }
        );

        if (!contact) {
            return res.status(404).json({ message: 'Contact non trouvé.' });
        }
        res.status(201).json({message: 'Contact modifé avec succès', contact});
    }
    catch(error) {
        res.status(501).json({error: 'Erreur'});
    }
};

export const deleteConctact = async(req, res) => {
    try {
        const { id } = req.params;
        const contact = await Contact.findOneAndDelete({ _id: id, user: req.userId });
        if (!contact) {
            return res.status(404).json({ message: 'Contact non trouvé.' });
        }

        res.status(201).json({ message: 'Contact supprimé.' });
    } 
    catch (error) {
        res.status(500).json({ message: 'Erreur serveur.' });
  }
};