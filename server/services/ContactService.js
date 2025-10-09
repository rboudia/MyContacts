import Contact from "../models/Contact.js";

export async function getAllContactsService(userId) {
    return Contact.find({ user: userId });
}

export async function createContactService({ firstName, lastName, phone, userId }) {
    if (!firstName || !lastName || !phone) {
        throw new Error("Tous les champs sont requis");
    }

    if (phone.length < 10 || phone.length > 20) {
        throw new Error("Le numéro doit contenir entre 10 et 20 caractères");
    }

    const existingContact = await Contact.findOne({ phone, user: userId });
    if (existingContact) {
        throw new Error("Ce numéro est déjà utilisé pour un autre contact.");
    }

    const newContact = new Contact({ firstName, lastName, phone, user: userId });
    await newContact.save();

    return newContact;
}

export async function patchContactService({ id, update, userId }) {
    if (update.phone.length < 10 ||update.phone.length > 20) {
        throw new Error("Le numéro doit contenir entre 10 et 20 caractères");
    }

    const existingContact = await Contact.findOne({ phone: update.phone, user: userId, _id: { $ne: id } });
    if (existingContact) {
        throw new Error("Ce numéro est déjà utilisé pour un autre contact.");
    }

    const contact = await Contact.findOneAndUpdate(
        { _id: id, user: userId },
        update,
        { new: true }
    );

    if (!contact) {
        throw new Error("Contact non trouvé.");
    }

    return contact;
}

export async function deleteContactService({ id, userId }) {
    const contact = await Contact.findOneAndDelete({ _id: id, user: userId });
    if (!contact) {
        throw new Error("Contact non trouvé.");
    }

    return contact;
}