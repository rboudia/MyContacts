import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const registerUser = async (req, res) => {
    try {
        const {firstName, email, password} = req.body;

        if (!firstName || !email || !password) {
            return res.status(400).json({ error: "Tous les champs sont requis" });
        }

        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({ error: "Utilisateur déjà existant" });
        }

        const saltRounds = 10;
        const hash = bcrypt.hashSync(password, saltRounds);

        const newUser = new User({
            firstName,
            email,
            password: hash
        });
        await newUser.save();
        res.status(200).json({message : 'User crée avec succes', user: { firstName, email } });
    }
    catch(error) {
        res.status(501).json({error: 'Erreur'});
    }
};

export const loginUser = async (req, res) => {
    try {
        const {email, password} = req.body;

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ error: 'Utilisateur inexistant' });
        }

        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            return res.status(401).json({ error: 'Mot de passe incorrect' });
        }

        const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, {
            expiresIn: '1h',
        });

        res.status(200).json({ token });
 
    }
    catch(error) {
        res.status(501).json({error: 'Erreur'});
    }
};
