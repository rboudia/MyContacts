import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export async function registerUserService({ firstName, email, password }) {
    if (!firstName || !email || !password) {
        throw new Error("Tous les champs sont requis");
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
        throw new Error("Utilisateur déjà existant");
    }

    const saltRounds = 10;
    const hash = await bcrypt.hash(password, saltRounds);

    const newUser = new User({
        firstName,
        email,
        password: hash
    });
    await newUser.save();
    return { firstName, email };
}

export async function loginUserService({ email, password }) {
    const user = await User.findOne({ email });
    if (!user) {
        throw new Error("Utilisateur inexistant");
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
        throw new Error("Mot de passe incorrect");
    }

    const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, {
        expiresIn: '1h',
    });

    return token;
}