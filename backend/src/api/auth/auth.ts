import {decode, sign, verify} from 'hono/jwt';

const authMiddleWare = (c)=>{

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
}

export default authMiddleWare