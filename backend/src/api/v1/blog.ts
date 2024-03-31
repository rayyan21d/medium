import { Hono } from "hono";
import { verify } from "hono/jwt";

const blogHandler = new Hono<{
    Bindings:{
        DATABASE_URL: string,
        JWT_SECRET: string
    }
    Variables : {
		userId: string
	}
}>();

blogHandler.post("/", (c)=>{
    return c.json({message: "Inside BloGs"})
})

blogHandler.post("/*", async (c, next)=>{

    const jwt  = c.req.header("Authorization");

    if(!jwt){
        c.status(401);
        return c.json({message: 'No Token Provided'})
    }

    const payload = await verify(jwt, c.env.JWT_SECRET);
    if (!payload){
        c.status(401);
        return c.json({message: 'Invalid Token'});
    }

    c.set('userId', payload.id);
	await next()
        
    

    const params = await c.req.query();

    console.log(params);


})


blogHandler.post('/', (c)=>{
    return c.json({message: 'post'})
})

blogHandler.get('/:id', (c)=>{
    return c.json({message: 'create'})
})

blogHandler.get('/bulk', (c)=>{
    return c.json({message: 'get'})
})


export default blogHandler