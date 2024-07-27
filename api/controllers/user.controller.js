import User from "../models/user.model.js";
import { errorHandler } from "../utils/error.js";
import bcryptjs from 'bcryptjs';

export const test = (req, res) => {
    res.send({
        message: "Api route is working"
    });
}

export const updateUser = async (req, res, next) => {
    try {
        if(req.user.id !== req.params.id) return next(errorHandler(401, 'You can only update your own account'));
        if(req.body.password) {
            req.body.password = await bcryptjs.hash(req.body.password, 10);
        }
        const updatedUser = await User.findByIdAndUpdate(req.params.id, {
            $set: {
                username: req.body.username,
                email: req.body.email,
                password: req.body.password,
                avatar: req.body.avatar
            }
        }, {new: true});

        const {password: pass, ...userInfo} = updatedUser._doc;
        res.status(200).json(userInfo);
    } catch (error) {
        next(error);
    }
}