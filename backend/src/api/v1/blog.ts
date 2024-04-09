import { Hono } from "hono";
import { verify } from "hono/jwt";
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import {z} from 'zod';
import { createBlogInput, updateBlogInput } from "@rayyan21d/medium-common";

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



blogHandler.post('/', async (c)=>{

    const {title, content} = await c.req.json();
    // Validate Zod Schema
    try{
        createBlogInput.parse({title, content})
    }catch(e){
        c.status(402);
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

        c.status(201);
        return c.json({message: 'Blog created successfully', blog})
    }catch(e){
        c.status(500);
        return c.json({message: 'Error creating blog'})
    }finally{
        await prisma.$disconnect();
    
    }
})


blogHandler.put('/', async (c)=>{

    const {title, content, postId} = await c.req.json();
    // Validate Zod Schema
    try{
        updateBlogInput.parse({title, content, postId})
    }catch(e){
        return c.json({message: 'Invalid title or content'})
    }

    const userId = c.get("userId");
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

        c.status(204);
        return c.json({message: 'Blog Updated successfully', blog:blog})
    }catch(e){
        c.status(500);
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

        c.status(200);
        return c.json({message: 'Blog Deleted successfully', blog: blog})
    }catch(e){
        c.status(500);
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
        const blog = await prisma.post.findMany({
            select:{
                content:true,
                title:true,
                id:true,
                createdAt:true,
                updatedAt:true,
                authorId:true,
                author:{
                    select:{
                        name:true
                    }
                
                }
            }
        });

        if(!blog){
            c.status(404);
            return c.json({message: 'Blogs not found'})}
        else{
            c.status(200);
            return c.json({message: 'Blog found', blogs: blog})
        }
    }catch(e){
        c.status(500);
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
            },
            select:{
                content:true,
                title:true,
                id:true,
                createdAt:true,
                updatedAt:true,
                authorId:true,
                author:{
                    select:{
                        name:true,
                        id: true
                    }
                }
            }
        })
        if(!blog){
            c.status(404);
            return c.json({message: 'Blog not found'})}
        else{
            c.status(200);
            return c.json({message: 'Blog found', blog: blog})
        }
    }catch(e){
        c.status(500);
        return c.json({message: 'Error finding blog'})
    }finally{
        await prisma.$disconnect();
    
    }
})





export default blogHandler