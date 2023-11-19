const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const dotenv = require("dotenv");
dotenv.config();

const AddToWatchList = () => {};

const GetWatchList = () => {};

module.exports = {
    AddToWatchList,
    GetWatchList,
};