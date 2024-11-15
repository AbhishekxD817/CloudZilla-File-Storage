
import { Schema, model } from "mongoose";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import 'dotenv/config'

const userSchema = Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: function () {
            return this.authType === "google" ? false : true
        }
    },
    files: [
        {
            type: Schema.Types.ObjectId,
            ref: "File"
        }
    ],
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: "user"
    },
    authType: {
        type: String,
        enum: ['local', 'google'],
        default: 'local',
    }
}, {
    timestamps: true
})

userSchema.pre("save", async function (next) {
    if (this.authType == 'google') return next();

    if (!this.isModified('password')) return next();

    let salt = await bcrypt.genSalt(11);
    let hash = await bcrypt.hash(this.password, salt);
    this.password = hash;
    return next();
})
userSchema.methods.genCookieToken = async (_id) => {
    const token = await jwt.sign({ _id }, process.env.JWT_SECRET_KEY);
    return token;
}

const User = model('User', userSchema);

export default User;