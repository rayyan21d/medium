import {z} from "zod";

export const signupInput = z.object({
    email: z.string().email(),
    password: z.string().min(8),
    username: z.string().min(4)
})

export const loginInput = z.object({
    email: z.string().email(),
    password: z.string().min(8),
   
})

export const createBlogInput = z.object({
    title: z.string().min(8),
    content: z.string()
})

export const updateBlogInput = z.object({
    title: z.string().min(8).optional(),
    content: z.string().optional(),
    postId: z.string()

});

export type SignupInput = z.infer<typeof signupInput>
export type LoginInput = z.infer<typeof loginInput>
export type CreateBlogInput = z.infer<typeof createBlogInput>
export type UpdateBlogInput = z.infer<typeof updateBlogInput>