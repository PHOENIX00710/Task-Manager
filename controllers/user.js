import { setCookie } from "../utils/cookie.js";
import { User } from "../models/user.js";
import bcrypt from "bcrypt";

export const newUser = async (req, res) => {
    const { name, email, password } = req.body;
    let user = await User.findOne({ email });
    if (user) {
        return res.status(400).json({
            success: false,
            message: "User Already Exists",
        })
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    user = await User.create({
        name,
        email,
        password: hashedPassword,
    });
    setCookie(res, user, "Registered Successfully !!");
};

export const onLoading = (req, res) => {
    res.send("<h1>Server is Working !!!</h1>");
}

export const login = async (req, res) => {
    const { email, password } = req.body;
    let user = await User.findOne({ email });
    if (!user) {
        return res.status(404).json({
            success: false,
            message: "User Doesn't Exist!",
        })
    }
    let userExists = bcrypt.compare(password, user.password);
    if (!userExists) {
        return res.status(404).json({
            success: false,
            message: "Invalid Username or Password!!"
        })
    }
    setCookie(res, user, "Logged In SuccessFully");
}

export const getDetails = async (req, res) => {
    res.json({
        success: true,
        user: req.user,
    })
}

export const logout = (req, res) => {
    return res
        .status(201)
        .cookie("token", "", {
            httpOnly: true,
            expire: new Date(Date.now()),
        })
        .json({
            success: true,
            message: "Logged Out Successfully",
        })
}