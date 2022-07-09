const User = require('../models/Users');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.register = async (req, res, next) => {
    try {
        let user = await User.findOne({ username: req.body.username });

        if (user) {
            return res.status(400).json({
                message: 'That user already exists',
            });
        }

        const salt = await bcrypt.genSalt(15);

        userPassword = await bcrypt.hash(req.body.password, salt);

        user = await User.create({
            username: req.body.username,
            email: req.body.email,
            password: userPassword,
        });

        res.status(201).json({
            status: 'success',
            data: user,
        });
    } catch (err) {
        return next(err);
    }
};

exports.login = async (req, res, next) => {
    try {
        const { username, password } = req.body;

        const user = await User.findOne({ username: username });

        if (!user) {
            return res.send('There is no user exists !');
        }

        const comparePassword = await bcrypt.compare(password, user.password);

        if (!comparePassword) {
            return res.status(400).send('Password are invalid !!');
        }

        const accessToken = jwt.sign(
            { id: user._id },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: process.env.JWT_EXPIRES }
        );

        res.cookie('jwt_token', accessToken, {
            expires: new Date(process.env.JWT_EXPIRES * 60 * 1000),
            httpOnly: true,
        });

        return res.status(200).json({
            status: 'success',
            users: user,
            token: accessToken,
        });
    } catch (err) {
        return res.send(err);
    }
};

exports.logout = async (req, res, next) => {
    try {
        res.cookie('jwt_token', 0, {
            expires: new Date(Date.now() + 10 * 1000),
            httpOnly: true,
        });

        res.status(200).json({
            status: 'Logout success',
        });
    } catch (err) {
        return res.send(err);
    }
};
