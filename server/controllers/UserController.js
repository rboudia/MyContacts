import User from "../models/User.js";

export const getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(201).json(users);
    } catch (err) {
        res.status(500).json({ error: 'Erreur serveur' });
    }
};