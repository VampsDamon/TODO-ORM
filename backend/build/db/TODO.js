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
exports.deleteTodo = exports.getTodoByUserId = exports.updateTodo = exports.createTodo = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const createTodo = (_a, userId_1) => __awaiter(void 0, [_a, userId_1], void 0, function* ({ title, description }, userId) {
    return yield prisma.todos.create({
        data: {
            userId,
            title,
            description
        }
    });
});
exports.createTodo = createTodo;
const updateTodo = (todoId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma.todos.update({
        where: {
            id: todoId,
        },
        data: {
            done: true
        }
    });
});
exports.updateTodo = updateTodo;
const getTodoByUserId = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma.todos.findMany({
        where: {
            userId
        }
    });
});
exports.getTodoByUserId = getTodoByUserId;
const deleteTodo = (todoId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma.todos.delete({
        where: {
            id: todoId,
        }
    });
});
exports.deleteTodo = deleteTodo;
