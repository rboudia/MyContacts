import { registerUserService, loginUserService } from "../services/AuthService.js";

export const registerUser = async (req, res) => {
    try {
        const {firstName, email, password} = req.body;

        const user = await registerUserService({ firstName, email, password });
        res.status(201).json({ message: "Utilisateur créé avec succès", user });
    } catch (error) {
        if (error.message === "Tous les champs sont requis" || error.message === "Utilisateur déjà existant") {
            res.status(400).json({ error: error.message });
        } else {
            res.status(500).json({ error: "Erreur serveur" });
        }
    }
};

export const loginUser = async (req, res) => {
    try {
        const {email, password} = req.body;

        const token = await loginUserService({ email, password });
        res.status(200).json({ token });
    } catch (error) {
        if (error.message === "Utilisateur inexistant") {
            res.status(400).json({ error: error.message });
        } else if (error.message === "Mot de passe incorrect") {
            res.status(401).json({ error: error.message });
        } else {
            res.status(500).json({ error: "Erreur serveur" });
        }
    }
};
