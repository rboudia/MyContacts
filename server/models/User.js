import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        require: true
    }/*,
    lastName: {
        type: String,
        require: true
    }*/,
    email: {
        type: String,
        require: true,
        unique: true
    }/*,
    phone: {
        type: String,
        require: true,
        unique: true
    }*/,
    password: {
        type: String,
        require: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }  
})

const User = mongoose.model("User", userSchema);

export default User;