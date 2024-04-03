import {z} from "zod";

export const signupInput = z.object({
    email: z.string().email(),
    password: z.string().min(8),
})


export type SignupInput = z.infer<typeof signupInput>


export const createBlogInput = z.object({
    title: z.string().min(8),
    content: z.string()
})