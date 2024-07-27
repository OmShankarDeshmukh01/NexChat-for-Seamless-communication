import User from '../models/UserModel.js';
import jsonwebtoken from 'jsonwebtoken';

const maxAge = 3 * 24 * 60 * 60; // Token expiration in seconds

const createToken = (email, userId) => {
    return jsonwebtoken.sign({ email, userId }, process.env.JWT_KEY, { expiresIn: maxAge });
};

export const signup = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).send("Email and password are required");
        }

        // Create user
        const user = await User.create({ email, password });

        // Create token
        const token = createToken(email, user._id);

        // Set cookie
        res.cookie('jwt', token, {
            maxAge: maxAge * 1000, // Convert to milliseconds
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production', // Set secure flag in production
            sameSite: 'None'
        });

        // Send response
        return res.status(201).json({
            user: {
                id: user._id,
                email: user.email,
                profileSetup: user.profileSetup
            }
        });

    } catch (err) {
        console.error('Signup error:', err);
        return res.status(500).send("Internal Server Error");
    }
};
