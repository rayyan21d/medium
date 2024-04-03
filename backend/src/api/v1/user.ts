import { Hono } from "hono";
import {decode, sign, verify} from 'hono/jwt';

import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import {z} from 'zod';


const userHandler = new Hono<{
    Bindings:{
        DATABASE_URL: string,
        JWT_SECRET: string
    }
}>()


const emailSchema = z.string().email();
const passwordSchema = z.string().min(6);

userHandler.post("/", (c)=>{
    return c.json({message: "Inside USers"})
})

userHandler.post('/signup', async (c)=>{


    const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())


    const {email, password} = await c.req.json();
    // validation
    try{
        emailSchema.parse(email)
        passwordSchema.parse(password)
    }catch(e){
        return c.json({message: 'invalid email or password'})
    }

    // check if user is already created
    const userExists = await prisma.user.findFirst({
        where:{
            email
        }
    })

    if(userExists){
        return c.json({message: 'user already exists'})
    }else{

        // hash password

        try{
            const user = await prisma.user.create({
            data:{
                email,
                password
                }   
            })

            // generate token
            const payload = { id: user.id }
            console.log(user)

            const token = await sign(payload, c.env.JWT_SECRET , 'HS256' )

            return c.json({message: 'user created', token: token})

        } catch(e){
            console.log(e);
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
        emailSchema.parse(email)
        passwordSchema.parse(password)
    }catch(e){
        return c.json({message: 'invalid email or password'})
    }

    try{
        const user = await prisma.user.findFirst({
            where:{
                email: email
            }
        })

        if(!user){
            return c.json({message: 'user not found'})
        }

        if(user.password !== password){
            return c.json({message: 'invalid password'})
        }else{

            const payload = { id: user.id }
            const token = await sign(payload, c.env.JWT_SECRET , 'HS256' )

            return c.json({message: 'signin successful!', token: token})
        }


    }catch(e){
        console.log(e)
        return c.json({message: 'signin failed'})
    }



})

export default userHandler