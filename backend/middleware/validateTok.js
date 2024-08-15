const asynchandler = require("express-async-handler");
const jwt = require("jsonwebtoken");

const validatetoken = asynchandler(async (req, res, next) => {
    let token;
    let authHeader = req.headers.Authorization || req.headers.authorization; // here authorization is a variable present inside req.headers. Its name can be changed.
     // authheader has actual token
    if (authHeader && authHeader.startsWith('Bearer ')) { // Check if the authorization header exists and starts with 'Bearer '.
        token = authHeader.split(" ")[1]; // Extract the token by splitting the string and taking the second part (the actual token) means the payload or data part.

        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => { // Verify the token using the secret key.
            if (err) { // If there is an error during verification (e.g., token is invalid or expired).
                res.status(401); // Set the response status to 401 (Unauthorized).
                throw new Error("user not defined"); // Throw an error indicating the user is not defined.
            }
            
            req.user = decoded.user; // If verification is successful, assign the decoded user information to req.user.
            // The decoded user object could look like:
            // user: {
            //     user_name: user_for_token.user_name,
            //     email: user_for_token.email,
            //     id: user_for_token.id
            // }

            next(); // Call the next middleware function.
        });
    }

    if (!token) { // If the token was not found in the authorization header.
        res.status(401); // Set the response status to 401 (Unauthorized).
        throw new Error("user not authorized or Token not found"); // Throw an error indicating the user is not authorized or the token was not found.
    }
});

module.exports = validatetoken;
