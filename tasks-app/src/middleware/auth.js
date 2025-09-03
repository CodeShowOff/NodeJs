import jwt from 'jsonwebtoken';
import User from '../models/user.js'

// Authentication middleware
const auth = async (req, res, next) => {
    try {
        // Extract token from the Authorization header ("Bearer <token>")
        const token = req.header('Authorization').replace('Bearer ', '');

        // Verify token signature & decode payload (checks if it was signed with our secret)
        const decoded = jwt.verify(token, 'tasks-app-user@CodeShowOff');

        // Find user with matching ID AND make sure this exact token still exists in their tokens array
        // Why? So we can support logout/revoking tokens. If the token was removed from DB, it’s invalid.
        const user = await User.findOne({ _id: decoded._id, 'tokens.token': token }); // refer to 'note.md' and 'note2.md' to know why we are doing it this way

        if (!user)
            throw new Error();


        // Store the authenticated user on the request object so that route handlers can easily access it without querying the database again.
        req.user = user;

        req.token = token;

        // Proceed to the next middleware or route handler
        next();
    } catch (err) {
        // If anything fails (missing/invalid token, user not found, etc.), block the request
        res.status(401).send({ error: 'Please authenticate.' });
    }
}

export default auth;
