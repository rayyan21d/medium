import { Hono } from "hono";
import { verify } from "hono/jwt";
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import {z} from 'zod';

const blogHandler = new Hono<{
    Bindings:{
        DATABASE_URL: string,
        JWT_SECRET: string
    }
    Variables : {
		userId: string
	}
}>();

// blogHandler.post("/", (c)=>{
//     return c.json({message: "Inside BloGs"})
// })

blogHandler.all("/", async (c, next)=>{

    const authHeader  = c.req.header("Authorization") || "";

    if(!authHeader){
        c.status(401);
        return c.json({message: 'No Token Provided'})
    }

    const payload = await verify(authHeader, c.env.JWT_SECRET);
    if (payload){

        c.set('userId', payload.id);
        console.log("Authorized!");
	    await next()

    }else{
        
        c.status(403);
        return c.json({message: 'Invalid Token'});
    }
    
    // This also runs after the next() routes have finished executing!
    // const params = await c.req.query();
    // console.log("Oh Damn");

})


const postSchema = z.object({
    title: z.string().min(5),
    content: z.string().min(10)
})

blogHandler.post('/', async (c)=>{

    const {title, content} = await c.req.json();
    // Validate Zod Schema
    try{
        postSchema.safeParse({title, content})
    }catch(e){
        return c.json({message: 'Invalid title or content'})
    }

    const id = c.get("userId");
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    try{
        const blog = await prisma.post.create({
            data:{
                title,
                content,
                authorId: id
            }
        })
        return c.json({message: 'Blog created successfully', blog})
    }catch(e){
        return c.json({message: 'Error creating blog'})
    }finally{
        await prisma.$disconnect();
    
    }
})


blogHandler.put('/', async (c)=>{

    const {title, content} = await c.req.json();
    // Validate Zod Schema
    try{
        postSchema.safeParse({title, content})
    }catch(e){
        return c.json({message: 'Invalid title or content'})
    }

    const userId = c.get("userId");
    const {postId} = await c.req.json();
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    try{
        const blog = await prisma.post.update({
            where:{
                authorId: userId,
                id: postId
            },
            data:{
                title,
                content,
            }
            
        });

        return c.json({message: 'Blog Updated successfully', blog})
    }catch(e){
        return c.json({message: 'Error Updating blog'})
    }finally{
        await prisma.$disconnect();
    
    }
})

blogHandler.delete('/', async (c)=>{

    const userId = c.get("userId");
    const {postId} = await c.req.json();
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    try{
        const blog = await prisma.post.delete({
            where:{
                authorId: userId,
                id: postId
            }
        });

        return c.json({message: 'Blog Deleted successfully', blog})
    }catch(e){
        return c.json({message: 'Error creating blog'})
    }finally{
        await prisma.$disconnect();
    
    }
})

blogHandler.get('/bulk', async (c)=>{
    
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    console.log(c.req.param());

    try{
        const blog = await prisma.post.findMany();

        if(!blog){
            return c.json({message: 'Blogs not found'})}
        else{
            return c.json({message: 'Blog found', blog})
        }
    }catch(e){
        return c.json({message: 'Error finding blog'})
    }finally{
        await prisma.$disconnect();
    
    }
})


blogHandler.get('/:id', async (c)=>{
    
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    console.log(c.req.param());

    try{
        const blog = await prisma.post.findFirst({
            where:{
                id: c.req.param().id
            }
        })
        if(!blog){
            return c.json({message: 'Blog not found'})}
        else{
            return c.json({message: 'Blog found', blog})
        }
    }catch(e){
        return c.json({message: 'Error finding blog'})
    }finally{
        await prisma.$disconnect();
    
    }
})





export default blogHandler