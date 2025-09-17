import User from "../model/User.js";

exports.registerUser = async (req, res) => {
    try {
        const {name} = req.body;
        const newUser = new User({name});
        await newUser.save();
        res.status(200).json({message : 'crée avec succes'});
    }
    catch(error) {
        res.status(501).json({error:'Erreur '})
    }
}
