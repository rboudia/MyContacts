import { getAllUsersService } from "../services/UserService.js";

export const getAllUsers = async (req, res) => {
    try {
        const users = await getAllUsersService();
        res.status(200).json(users);
    } catch (err) {
        res.status(500).json({ error: 'Erreur serveur' });
    }
};