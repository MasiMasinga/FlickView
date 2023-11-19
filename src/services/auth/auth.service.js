const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");
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

            resolve({ token: token });
        } catch (error) {
            reject(error);
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
                reject("User not found");
            }

            const validPassword = await bcrypt.compare(
                params.password,
                user.password
            );

            if (!validPassword) {
                reject("Invalid password");
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

            resolve({ token: token });
        } catch (error) {
            reject(error);
        }
    });
};

const ForgotPassword = (params) => {};

const ResetPassword = (params) => { };

const Logout = () => { };

module.exports = {
    Register,
    Login,
    ForgotPassword,
    ResetPassword,
    Logout,
};