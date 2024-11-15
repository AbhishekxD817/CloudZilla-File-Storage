import AppError from "../utils/ErrorHandlers/AppError.js";
import oauth2client from "../utils/GoogleConfig/googleConfig.js";
import axios from 'axios'
import User from '../models/userModel.js'
import bcrypt from 'bcrypt'


const cookieOptions = {
    maxAge: 1000 * 60 * 60 * 24 * 7,
    expires: 1000 * 60 * 60 * 24 * 7,
    sameSite: process.env.NODE_ENV == 'production' ? 'none' : 'Lax',
    secure: process.env.NODE_ENV,
    httpOnly: process.env.NODE_ENV
}


export const authWithGoogle = async (req, res, next) => {
    try {
        const { code } = req.query;
        const googleRes = await oauth2client.getToken(code);
        oauth2client.setCredentials(googleRes.tokens)

        const userRes = await axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${googleRes.tokens.access_token}`)

        const { email, name } = userRes.data;
        let user = await User.findOne({ email });

        if (user) {
            // login that user
            // setCookie
            let token = await user.genCookieToken(user._id);
            res.cookie('token', token, cookieOptions);

            return res.json({
                message: "Login Successfull",
                user: {
                    email: user.email,
                    name: user.name,
                    _id: user._id
                }
            })
        } else {
            // create new User
            let newUser = await new User({
                name,
                email,
                authType: "google"
            })

            await newUser.save();

            // set cookies
            let token = await newUser.genCookieToken(newUser._id);
            res.cookie('token', token, cookieOptions);

            return res.json({
                message: "Signup successfull",
                user: {
                    name: newUser.name,
                    email: newUser.email,
                    _id: newUser._id
                }
            })

        }
    } catch (error) {
        return;
    }
}
export const signupUser = async (req, res, next) => {
    let { name, email, password } = req.body;

    // if already user exists
    let userExists = await User.findOne({ email });
    if (userExists) {
        return next(new AppError(403, "User Already Exists With That Email"));
    }

    // create new user
    const newUser = await new User({
        name, email, password, authType: "local"
    })

    await newUser.save();

    // generate cookie token
    const token = await newUser.genCookieToken(newUser._id);
    res.cookie('token', token, cookieOptions);

    return res.json({
        message: "Signup successfull",
        user: {
            name: newUser.name,
            email: newUser.email,
            _id: newUser._id
        }
    })
}
export const loginUser = async (req, res, next) => {
    let { email, password } = req.body;

    // if user not exists
    let user = await User.findOne({ email });
    if (!user) {
        return next(new AppError(400, "No User Exists With That Email"));
    }
    if (user && user.authType != 'local') {
        return next(new AppError(400, "User Already Exists! Please Login with google"))
    }

    // if exists
    // compare passwords
    const validatePassword = await bcrypt.compare(password, user.password);
    if (!validatePassword) {
        return next(new AppError(403, "Invalid Credentials"));
    }

    // if password check is complete
    // let user login
    // generate cookie token
    const token = await user.genCookieToken(user._id);
    res.cookie('token', token, cookieOptions);

    return res.json({
        message: "Login successfull",
        user: {
            name: user.name,
            email: user.email,
            _id: user._id
        }
    })
}
export const logoutUser = async (req, res, next) => {
    res.clearCookie('token');
    return res.json({
        message: "Logout Successfull"
    })
}