import User from "../models/user.model.js";
import bcryptjs from 'bcryptjs';
import { errorHandler } from "../utils/error.js";
import jwt from 'jsonwebtoken';

export const signup = async (req, res, next) => {
    try {
        const {username, email, password} = req.body;

        const hashedPassword = await bcryptjs.hash(password, 10);

        const newUser = new User({username, email, password: hashedPassword});
        await newUser.save();
        res.status(201).json('User created successfully');
    } catch(error) {
        next(error);
    }
}

export const signin = async (req, res, next) => {
    try {
        const {email, password} = req.body;
        const user = await User.findOne({email});
        if(!user) return next(errorHandler(404, 'No such user exists'));
        const validPassword = await bcryptjs.compare(password, user.password);
        if(!validPassword) return next(errorHandler(404, 'Password is incorrect'));
        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET);
        const {password: pass, ...userInfo} = user._doc;
        res.cookie('access_token', token, {httpOnly: true}).status(200).json(userInfo);
    } catch (error) {
        next(error);
    }
}