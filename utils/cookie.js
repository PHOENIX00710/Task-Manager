import jwt from "jsonwebtoken";

export const setCookie = (res, user, message) => {
    const token = jwt.sign({ _id: user._id }, process.env.JWT_STRING);
    res
    .status(201)
    .cookie("token", token, {
        httpOnly: true,
        maxAge: 15 * 60 * 1000,
    })
    .json({
        success: true,
        message,
    });
};