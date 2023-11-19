const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
dotenv.config();

const Register = (params) => {
    return new Promise(async (resolve, reject) => {
        try {

            const userExists = await prisma.user.findUnique({
                where: {
                    email: params.email,
                },
            });

            if (userExists) {
                reject("User already exists");
            }

            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(params.password, salt);

            const user = await prisma.user.create({
                data: {
                    first_name: params.first_name,
                    email: params.email,
                    password: hashedPassword,
                },
            });

            const token = jwt.sign(
                {
                    id: user.id,
                    email: user.email,
                },
                process.env.JWT_SECRET,
                {
                    expiresIn: "1h",
                }
            );

            return resolve({ message: "User account created", token: token });
        } catch (error) {
            return reject(error);
        }
    });
};

const Login = (params) => {
    return new Promise(async (resolve, reject) => {

        try {
            const user = await prisma.user.findUnique({
                where: {
                    email: params.email,
                },
            });

            if (!user) {
                return reject("User not found");
            }

            const validPassword = await bcrypt.compare(
                params.password,
                user.password
            );

            if (!validPassword) {
                return reject("Invalid password");
            }

            const token = jwt.sign(
                {
                    id: user.id,
                    email: user.email,
                },
                process.env.JWT_SECRET,
                {
                    expiresIn: "1h",
                }
            );

            return resolve({ message: "User has been logged in", token: token });
        } catch (error) {
            return reject(error);
        }
    });
};

const ForgotPassword = (params) => {
    return new Promise(async (resolve, reject) => {

        try {
            const user = await prisma.user.findUnique({
                where: {
                    email: params.email,
                },
            });

            if (!user) {
                return reject("User not found");
            }

            const token = jwt.sign(
                {
                    id: user.id,
                    email: user.email,
                },
                process.env.JWT_SECRET,
                {
                    expiresIn: "1h",
                }
            );

            const resetLink = `${process.env.CLIENT_URL}/reset-password/${token}`;

            const transporter = nodemailer.createTransport({
                service: "gmail",
                host: "smtp.gmail.com",
                port: 587,
                auth: {
                    user: process.env.EMAIL,
                    pass: process.env.PASSWORD,
                },
            });

            let mailOptions = {
                from: process.env.EMAIL,
                to: user.email,
                subject: "Password Reset",
                html: `<h1>Please click on the following link to reset your password</h1><p>${resetLink}</p>`,
            };

            transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                    return reject(error);
                } else {
                    console.log("Email Sent");
                    console.log(info);
                    return resolve({
                        message: `Email has been sent to ${user.email}. Follow the instructions to reset your password.`,
                    });
                }
            });

            return resolve({ message: 'Password reset email sent successfully' });
        } catch (error) {
            return reject(error);
        }
    });
};

const ResetPassword = (params) => {
    return new Promise(async (resolve, reject) => {

        try {

            const decoded = jwt.verify(params.token, process.env.JWT_SECRET);

            if (!decoded) {
                return reject("Token is invalid");
            }
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(params.password, salt);

            await prisma.user.update({
                where: {
                    email: decoded.email,
                },
                data: {
                    password: hashedPassword,
                },
            });

            return resolve({ message: "Password has been reset" });
        } catch (error) {
            return reject(error);
        }
    });
};

const Logout = (params) => {
    return new Promise(async (resolve, reject) => {

        try {
            const decoded = jwt.verify(params.token, process.env.JWT_SECRET);

            if (!decoded) {
                return reject("Token is invalid");
            }

            return resolve({ message: "User has been logged out" });
        } catch (error) {
            return reject(error);
        }
    });
};

module.exports = {
    Register,
    Login,
    ForgotPassword,
    ResetPassword,
    Logout,
};