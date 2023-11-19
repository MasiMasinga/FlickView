const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const dotenv = require("dotenv");
dotenv.config();

const AddToWatchlist = () => {};

const DeleteFromWatchlist = () => {};

module.exports = {
    AddToWatchlist,
    DeleteFromWatchlist,
};