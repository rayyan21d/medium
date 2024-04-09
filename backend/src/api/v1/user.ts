import { Hono } from "hono";
import {decode, sign, verify} from 'hono/jwt';

import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'


import { signupInput, loginInput } from "@rayyan21d/medium-common";

const userHandler = new Hono<{
    Bindings:{
        DATABASE_URL: string,
        JWT_SECRET: string
    }
}>()


userHandler.post("/", (c)=>{
    return c.json({message: "Inside USers"})
})

userHandler.post('/signup', async (c)=>{


    const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())


    const {email, password, username} = await c.req.json();
    // validation
    try{
        signupInput.parse({email:email, password: password, username:username})
    }catch(e){
        c.status(402);
        return c.json({message: 'invalid email or password'})
    }

    // check if user is already created
    const userExists = await prisma.user.findFirst({
        where:{
            email
        }
    })

    if(userExists){
        c.status(409);
        return c.json({message: 'user already exists'})
    }else{

        // hash password

        try{
            const user = await prisma.user.create({
            data:{
                email,
                password,
                name: username
                }   
            })

            // generate token
            const payload = { id: user.id }
            console.log(user)

            const token = await sign(payload, c.env.JWT_SECRET , 'HS256' )

            c.status(200)
            return c.json({message: 'user created', token: token})

        } catch(e){
            console.log(e);
            c.status(500);
            return c.json({message: 'error creating user'})
       }

    }

    

});

userHandler.post('/signin', async (c)=>{

   const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    const {email, password} = await c.req.json();
    //zod validation
    console.log(email, password)

    try{
        loginInput.parse({email, password})
    }catch(e){
        c.status(402);
        return c.json({message: 'invalid email or password'})
    }

    try{
        const user = await prisma.user.findFirst({
            where:{
                email: email
            }
        })

        if(!user){
            c.status(404);
            return c.json({message: 'user not found'})
        }

        if(user.password !== password){
            c.status(401);
            return c.json({message: 'invalid password'})
        }else{

            const payload = { id: user.id }
            const token = await sign(payload, c.env.JWT_SECRET , 'HS256' )
            c.status(200)
            return c.json({message: 'signin successful!', token: token})
        }


    }catch(e){
        console.log(e)
        c.status(500);
        return c.json({message: 'signin failed'})
    }



})

export default userHandler