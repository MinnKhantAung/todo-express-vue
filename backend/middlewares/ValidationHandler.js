import asyncHandler from 'express-async-handler';
import jwt from 'jsonwebtoken';

export const ValidToken = asyncHandler(async (req, res, next) => {
    let token;
    let authHeader = req.headers.authorization || req.headers.Authorization;

    if (authHeader && authHeader.startsWith('Bearer')) {
        token = authHeader.split(" ")[1];
        console.log(token);
        console.log(authHeader);
        if (token) {
            jwt.verify(token, process.env.SECRECT_KEY, (err, decoded) => {
                if (err) {
                    console.log(err);
                    res.status(401);
                    throw new Error("User is not Authorized")
                }
                req.user = decoded.user;
                next();
            })
        } else {
            res.status(401);
            throw new Error("Token is Invalid")
        }
    }
})