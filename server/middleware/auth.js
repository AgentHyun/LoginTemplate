const { User } = require('../models/Models/User');

let auth = async (req, res, next) => {
    try {
        // Get the token from the client's cookie
        let token = req.cookies.x_auth;

        // Decode the token and find the user
        const user = await User.findByToken(token);

        if (!user) {
            return res.json({ isAuth: false, error: true });
        }

        // Assign the token and user to the request object
        req.token = token;
        req.user = user;

        // Continue to the next middleware
        next();
    } catch (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
};

module.exports = { auth };
