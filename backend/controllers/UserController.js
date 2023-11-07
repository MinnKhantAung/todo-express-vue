import asyncHandler from 'express-async-handler';
import { User } from '../models/UserModel.js';
import bcrypt, { hash } from 'bcrypt';
import jwt from 'jsonwebtoken';


const Register = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        res.status(400);
        throw new Error("All Fields are Mendatory!");
    }
    const avaliableUser = await User.findOne({ email });
    if (avaliableUser) {
        res.status(401);
        throw new Error("The Email is already Registered");
    }

    const hashpassword = await bcrypt.hash(password, 10);

    const user = await User.create({
        name,
        email,
        password: hashpassword
    })
    if (user) {
        console.log(`User is Created`);
        res.status(201).json(user)
    }
    else {
        res.status(400);
        throw new Error('User is not Valid!')
    }
})

const Login = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        res.status(400);
        throw new Error("Email and Password is Required");
    }

    const user = await User.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
        const accessToken = jwt.sign(
            {
                user: {
                    name: user.name,
                    email: user.email,
                    id: user.id
                }
            },
            process.env.SECRECT_KEY,
            { expiresIn: "10m" }
        )

        res.status(201).json({ accessToken })
    } else {
        res.status(400);
        throw new Error('Email or Password is Invalid!')
    }
})

const CurrentUser = asyncHandler(async (req, res) => {
    res.json(req.user)
})

export { Register, Login, CurrentUser };