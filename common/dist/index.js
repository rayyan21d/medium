"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateBlogInput = exports.createBlogInput = exports.loginInput = exports.signupInput = void 0;
const zod_1 = require("zod");
exports.signupInput = zod_1.z.object({
    email: zod_1.z.string().email(),
    password: zod_1.z.string().min(8),
    username: zod_1.z.string().min(4)
});
exports.loginInput = zod_1.z.object({
    email: zod_1.z.string().email(),
    password: zod_1.z.string().min(8),
});
exports.createBlogInput = zod_1.z.object({
    title: zod_1.z.string().min(8),
    content: zod_1.z.string()
});
exports.updateBlogInput = zod_1.z.object({
    title: zod_1.z.string().min(8).optional(),
    content: zod_1.z.string().optional(),
    postId: zod_1.z.string()
});
