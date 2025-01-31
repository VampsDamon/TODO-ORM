"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserById = exports.getAllUsers = exports.createUser = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const createUser = (_a) => __awaiter(void 0, [_a], void 0, function* ({ username, password, email }) {
    return yield prisma.users.create({
        data: {
            username,
            email,
            password,
        },
        select: {
            id: true,
            username: true,
            email: true
        },
    });
});
exports.createUser = createUser;
const getAllUsers = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma.users.findMany({
        select: {
            id: true,
            username: true,
            email: true,
        }
    });
});
exports.getAllUsers = getAllUsers;
const getUserById = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma.users.findUnique({
        where: {
            id: userId
        },
        select: {
            id: true,
            username: true,
            email: true
        }
    });
});
exports.getUserById = getUserById;
