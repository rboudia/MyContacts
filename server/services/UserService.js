import User from "../models/User.js";

export async function getAllUsersService() {
    return User.find().select('-password');
}